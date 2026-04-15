"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const MAX_FILES = 3;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES =
  "application/pdf,image/jpeg,image/png,image/webp,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain";
const ACCEPTED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".docx", ".txt"];

function getSource(): string {
  if (typeof window === "undefined") return "unknown";
  const params = new URLSearchParams(window.location.search);
  if (params.get("gclid")) return "google_ads";
  if (params.get("ref")) return params.get("ref")!;
  if (params.get("utm_source")) return params.get("utm_source")!;
  return "direct";
}

function isAcceptable(file: File): boolean {
  if (file.size > MAX_FILE_BYTES) return false;
  const lower = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export default function BidUploadForm() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [pastedText, setPastedText] = useState("");
  const [showPaste, setShowPaste] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      const accepted: File[] = [];
      for (const f of list) {
        if (!isAcceptable(f)) {
          setError(
            `${f.name} can't be used. Use PDF, JPG, PNG, DOCX, or TXT under 10 MB.`,
          );
          continue;
        }
        accepted.push(f);
      }
      const combined = [...files, ...accepted].slice(0, MAX_FILES);
      setFiles(combined);
      if (accepted.length > 0) setError("");
    },
    [files],
  );

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (files.length === 0 && pastedText.trim().length < 50) {
      setError("Upload at least one bid (PDF, image, DOCX) or paste bid text.");
      return;
    }

    setSubmitting(true);

    // Capture email to Google Sheets in parallel — don't block the analysis on it
    const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
    if (sheetUrl && email) {
      fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          niche: "compare-bids",
          nicheName: "Compare Contractor Bids",
          source: getSource(),
          fileCount: files.length,
          hasPastedText: pastedText.trim().length > 0,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Silently swallow — analytics shouldn't break the user flow
      });
    }

    const formData = new FormData();
    files.forEach((f) => formData.append("bids", f));
    if (pastedText.trim().length > 50) {
      formData.append("pastedText", pastedText.trim());
    }

    try {
      const res = await fetch("/api/analyze-bids", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `Analysis failed (HTTP ${res.status})`);
      }
      const data = await res.json();
      // Stash result + push to results page. sessionStorage avoids needing a DB.
      sessionStorage.setItem("compareBidsResult", JSON.stringify(data));
      router.push("/compare-bids/results");
    } catch (err) {
      setError((err as Error).message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragging
            ? "border-emerald-500 bg-emerald-50"
            : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_TYPES}
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p className="text-base font-semibold text-gray-900">
          Drop your bids here or click to browse
        </p>
        <p className="text-sm text-gray-500 mt-1">
          PDF, JPG, PNG, DOCX, or TXT · up to {MAX_FILES} files · 10 MB each
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-gray-400 hover:text-red-500 text-sm font-medium"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Paste text fallback */}
      <div>
        <button
          type="button"
          onClick={() => setShowPaste((s) => !s)}
          className="text-sm text-emerald-700 hover:text-emerald-800 font-medium"
        >
          {showPaste ? "Hide paste option" : "Or paste bid text instead"}
        </button>
        {showPaste && (
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            rows={6}
            placeholder="Paste the contents of your contractor bid here..."
            className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
          />
        )}
      </div>

      {/* Email gate */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          Your email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
        />
        <p className="mt-1.5 text-xs text-gray-500">
          So we can follow up if you have questions. We never sell or share it.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gray-900 text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Analyzing your bids…" : "Analyze my bids free →"}
      </button>

      <p className="text-center text-xs text-gray-400">
        We don&apos;t save your bid PDFs. Analysis runs in-memory and is deleted when you close this tab.
      </p>
    </form>
  );
}
