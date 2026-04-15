import { GoogleGenAI, Type } from "@google/genai";

// Models — Flash for v1 (cheap, fast, strong OCR). 2.5-flash has been throwing
// transient 503s under load; we keep it as primary and fall back to 2.0-flash
// (also paid tier, separate capacity pool) on UNAVAILABLE / overloaded errors.
const EXTRACTION_MODEL = "gemini-2.5-flash";
const NARRATIVE_MODEL = "gemini-2.5-flash";
const FALLBACK_MODEL = "gemini-2.0-flash";

export type Severity = "ok" | "warn" | "bad";

export interface ExtractedLineItem {
  category: string;
  description: string;
  amount: number | null;
  is_allowance: boolean;
}

export interface ExtractedPayment {
  milestone: string;
  amount: number | null;
  percent: number | null;
}

export interface ExtractedContractor {
  name: string | null;
  license_number: string | null;
  phone: string | null;
  address: string | null;
}

export interface ExtractedTotals {
  subtotal: number | null;
  tax: number | null;
  total: number | null;
}

export interface ExtractedTimeline {
  start: string | null;
  duration_weeks: number | null;
}

export type ExtractionConfidence = "high" | "medium" | "low";

export interface ExtractedBid {
  contractor: ExtractedContractor;
  totals: ExtractedTotals;
  line_items: ExtractedLineItem[];
  payment_schedule: ExtractedPayment[];
  timeline: ExtractedTimeline;
  explicitly_excluded: string[];
  explicitly_included: string[];
  extraction_confidence: ExtractionConfidence;
  extraction_notes: string;
}

// Source file metadata so the API route can pass through PDFs, images, and DOCX
// content uniformly. PDFs and images go to Gemini as inline data; DOCX/text are
// pre-extracted to plain text by the route handler.
export type BidSource =
  | { kind: "inline"; mimeType: string; data: string; filename: string } // base64
  | { kind: "text"; text: string; filename: string };

// JSON schema for structured extraction. Using responseSchema (the
// OpenAPI subset Gemini supports) keeps responses valid without parsing fragile
// JSON-in-text output.
const extractionSchema = {
  type: Type.OBJECT,
  properties: {
    contractor: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, nullable: true },
        license_number: { type: Type.STRING, nullable: true },
        phone: { type: Type.STRING, nullable: true },
        address: { type: Type.STRING, nullable: true },
      },
      required: ["name", "license_number", "phone", "address"],
    },
    totals: {
      type: Type.OBJECT,
      properties: {
        subtotal: { type: Type.NUMBER, nullable: true },
        tax: { type: Type.NUMBER, nullable: true },
        total: { type: Type.NUMBER, nullable: true },
      },
      required: ["subtotal", "tax", "total"],
    },
    line_items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          description: { type: Type.STRING },
          amount: { type: Type.NUMBER, nullable: true },
          is_allowance: { type: Type.BOOLEAN },
        },
        required: ["category", "description", "amount", "is_allowance"],
      },
    },
    payment_schedule: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          milestone: { type: Type.STRING },
          amount: { type: Type.NUMBER, nullable: true },
          percent: { type: Type.NUMBER, nullable: true },
        },
        required: ["milestone", "amount", "percent"],
      },
    },
    timeline: {
      type: Type.OBJECT,
      properties: {
        start: { type: Type.STRING, nullable: true },
        duration_weeks: { type: Type.NUMBER, nullable: true },
      },
      required: ["start", "duration_weeks"],
    },
    explicitly_excluded: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    explicitly_included: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    extraction_confidence: {
      type: Type.STRING,
      enum: ["high", "medium", "low"],
    },
    extraction_notes: { type: Type.STRING },
  },
  required: [
    "contractor",
    "totals",
    "line_items",
    "payment_schedule",
    "timeline",
    "explicitly_excluded",
    "explicitly_included",
    "extraction_confidence",
    "extraction_notes",
  ],
} as const;

const EXTRACTION_INSTRUCTIONS = `You are an expert construction estimator and contract reviewer. Extract structured data from a contractor's bid for a residential renovation (most often a kitchen remodel).

Rules:
- Output JSON conforming exactly to the provided schema. No prose.
- Use null when a field is genuinely missing — do not invent values or write "unknown".
- Numbers are dollars (no currency symbols, no commas, no string types).
- "is_allowance": true when a line item is a budgeted allowance (e.g., "$5,000 cabinet allowance") rather than a fixed-price item.
- "explicitly_excluded": items the bid says it does NOT cover (e.g., "permits not included", "demo by owner"). Direct quotes only.
- "explicitly_included": items the bid explicitly states it DOES cover (e.g., "includes haul-away", "permits included"). Direct quotes only.
- "extraction_confidence":
  - "high" = clean typed bid, all major fields readable
  - "medium" = some ambiguity, missing line item detail, or partial OCR issues
  - "low" = scan quality poor, lump-sum bid with no detail, or document is not actually a contractor bid
- "extraction_notes": brief explanation of what was confident vs ambiguous (1-3 sentences).
- Extract the contractor LICENSE NUMBER even if it's in fine print, footer, or letterhead.
- Categorize line items into broad buckets: demo, framing, plumbing, electrical, hvac, drywall, flooring, cabinets, countertops, appliances, paint, fixtures, permits, dumpster, cleanup, contingency, overhead, profit, other.
- Capture every distinct line item — do not collapse or summarize.`;

function getClient(): GoogleGenAI {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY (or GEMINI_API_KEY) env var is not set. Get one at https://aistudio.google.com",
    );
  }
  return new GoogleGenAI({ apiKey });
}

function isRetriable(err: unknown): boolean {
  const msg = (err as Error).message || "";
  return /\b(503|UNAVAILABLE|overloaded|high demand|500|INTERNAL)\b/i.test(msg);
}

// Gemini Flash regularly returns transient 503 (UNAVAILABLE) under load. Retry
// the primary model with exponential backoff, then fall back to a different
// model (separate capacity pool) so a single overloaded window doesn't kill a
// real user's analysis. Don't retry 4xx — those are real errors (bad input,
// auth, quota).
async function withFallback<T>(
  primaryFn: () => Promise<T>,
  fallbackFn: () => Promise<T>,
  label: string,
  attempts = 2,
): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await primaryFn();
    } catch (err) {
      lastErr = err;
      if (!isRetriable(err)) throw err;
      const delayMs = 500 * Math.pow(2, i) + Math.floor(Math.random() * 300);
      console.warn(`[${label}] primary 503, retry ${i + 1}/${attempts} in ${delayMs}ms`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  // Primary still failing — try fallback model once
  try {
    console.warn(`[${label}] primary exhausted, switching to ${FALLBACK_MODEL}`);
    return await fallbackFn();
  } catch (err) {
    if (isRetriable(err)) throw lastErr ?? err;
    throw err;
  }
}

export async function extractBid(source: BidSource): Promise<ExtractedBid> {
  const ai = getClient();

  const parts =
    source.kind === "inline"
      ? [
          {
            inlineData: {
              mimeType: source.mimeType,
              data: source.data,
            },
          },
          { text: `Filename: ${source.filename}\n\nExtract this bid into the JSON schema.` },
        ]
      : [
          {
            text: `Filename: ${source.filename}\n\nThe following is plain text extracted from a contractor bid document. Extract it into the JSON schema.\n\n---\n\n${source.text}`,
          },
        ];

  const buildCall = (model: string) => () =>
    ai.models.generateContent({
      model,
      contents: [{ role: "user", parts }],
      config: {
        systemInstruction: EXTRACTION_INSTRUCTIONS,
        responseMimeType: "application/json",
        responseSchema: extractionSchema,
        temperature: 0.1,
      },
    });

  const response = await withFallback(
    buildCall(EXTRACTION_MODEL),
    buildCall(FALLBACK_MODEL),
    `extractBid:${source.filename}`,
  );

  const raw = response.text;
  if (!raw) {
    throw new Error("Gemini returned no text in extraction response");
  }

  try {
    return JSON.parse(raw) as ExtractedBid;
  } catch (err) {
    throw new Error(
      `Failed to parse Gemini extraction JSON: ${(err as Error).message}\n\nRaw response: ${raw.slice(0, 500)}`,
    );
  }
}

export async function generateNarrative(
  bids: ExtractedBid[],
  redFlagSummary: string,
): Promise<string> {
  const ai = getClient();

  const bidSummaries = bids
    .map((b, i) => {
      const name = b.contractor.name || `Contractor ${i + 1}`;
      const total = b.totals.total != null ? `$${b.totals.total.toLocaleString()}` : "no total found";
      const itemCount = b.line_items.length;
      return `Bid ${i + 1}: ${name} — ${total}, ${itemCount} line items`;
    })
    .join("\n");

  const prompt = `You are an experienced construction project manager helping a homeowner compare ${bids.length} contractor bids for a kitchen renovation.

Bids:
${bidSummaries}

Detected red flags:
${redFlagSummary}

Full extracted data:
${JSON.stringify(bids, null, 2)}

Write a 4-6 sentence plain-English summary aimed at a homeowner with no construction experience. Cover:
1. Which bid appears most complete vs which is most likely missing scope
2. The single biggest reason the bids differ in price (scope, allowances, deposit terms — name the actual driver)
3. The most important question they should ask each contractor before signing

Be direct. Do not use marketing language. Do not say "consult a professional". Do not include any preamble or sign-off.`;

  const buildCall = (model: string) => () =>
    ai.models.generateContent({
      model,
      contents: prompt,
      config: { temperature: 0.4 },
    });

  const response = await withFallback(
    buildCall(NARRATIVE_MODEL),
    buildCall(FALLBACK_MODEL),
    "generateNarrative",
  );

  return response.text?.trim() || "Unable to generate narrative summary.";
}
