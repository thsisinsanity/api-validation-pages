import { NextRequest } from "next/server";
import mammoth from "mammoth";
import {
  extractBid,
  generateNarrative,
  type BidSource,
  type ExtractedBid,
} from "@/lib/bid-analyzer";
import { detectRedFlags, summarizeFlagsForPrompt, type RedFlag } from "@/lib/red-flag-rules";
import { compareBids, type ComparisonResult } from "@/lib/comparison";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILES = 3;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_PDF = ["application/pdf"];
const ALLOWED_IMAGES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_DOCX = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_TEXT = ["text/plain"];

export interface AnalyzeBidsResponse {
  bids: ExtractedBid[];
  comparison: ComparisonResult;
  redFlags: RedFlag[][];
  narrative: string;
  generatedAt: string;
}

async function fileToSource(file: File): Promise<BidSource> {
  const buf = Buffer.from(await file.arrayBuffer());

  if (ALLOWED_PDF.includes(file.type) || ALLOWED_IMAGES.includes(file.type)) {
    return {
      kind: "inline",
      mimeType: file.type,
      data: buf.toString("base64"),
      filename: file.name,
    };
  }

  if (ALLOWED_DOCX.includes(file.type) || file.name.toLowerCase().endsWith(".docx")) {
    const result = await mammoth.extractRawText({ buffer: buf });
    return { kind: "text", text: result.value, filename: file.name };
  }

  if (ALLOWED_TEXT.includes(file.type) || file.name.toLowerCase().endsWith(".txt")) {
    return { kind: "text", text: buf.toString("utf8"), filename: file.name };
  }

  throw new Error(
    `Unsupported file type for ${file.name}: ${file.type}. Use PDF, JPG, PNG, DOCX, or TXT.`,
  );
}

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonError("Invalid multipart form data.", 400);
  }

  const files = formData.getAll("bids").filter((v): v is File => v instanceof File);
  const pastedText = formData.get("pastedText");

  // Build the source list — files first, then optional pasted text as a synthetic bid
  const sources: BidSource[] = [];

  if (files.length > MAX_FILES) {
    return jsonError(`Maximum of ${MAX_FILES} bids per analysis.`, 400);
  }

  for (const file of files) {
    if (file.size === 0) continue;
    if (file.size > MAX_FILE_BYTES) {
      return jsonError(`${file.name} is larger than 10 MB.`, 400);
    }
    try {
      sources.push(await fileToSource(file));
    } catch (err) {
      return jsonError((err as Error).message, 400);
    }
  }

  if (typeof pastedText === "string" && pastedText.trim().length > 50) {
    if (sources.length >= MAX_FILES) {
      return jsonError(`Maximum of ${MAX_FILES} bids per analysis.`, 400);
    }
    sources.push({ kind: "text", text: pastedText.trim(), filename: "Pasted bid" });
  }

  if (sources.length === 0) {
    return jsonError("Upload at least one contractor bid.", 400);
  }

  let bids: ExtractedBid[];
  try {
    bids = await Promise.all(sources.map(extractBid));
  } catch (err) {
    return jsonError(`Extraction failed: ${(err as Error).message}`, 502);
  }

  const redFlags = bids.map(detectRedFlags);
  const comparison = compareBids(bids);

  let narrative = "";
  try {
    narrative = await generateNarrative(bids, summarizeFlagsForPrompt(redFlags));
  } catch (err) {
    narrative = `(Narrative summary unavailable: ${(err as Error).message})`;
  }

  const payload: AnalyzeBidsResponse = {
    bids,
    comparison,
    redFlags,
    narrative,
    generatedAt: new Date().toISOString(),
  };

  return Response.json(payload);
}
