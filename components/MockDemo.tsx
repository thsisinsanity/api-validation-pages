"use client";

import { useState } from "react";

function highlightJson(json: string): string {
  return json.replace(
    /("(?:[^"\\]|\\.)*")\s*(:)\s*("(?:[^"\\]|\\.)*"|true|false|null|-?\d+(?:\.\d+)?)/g,
    (_, key, colon, value) => {
      let valueClass = "text-emerald-400"; // strings
      if (value === "true" || value === "false") valueClass = "text-amber-400";
      else if (value === "null") valueClass = "text-gray-500";
      else if (/^-?\d/.test(value)) valueClass = "text-purple-400";
      return `<span class="text-blue-400">${key}</span>${colon} <span class="${valueClass}">${value}</span>`;
    }
  ).replace(
    /("(?:[^"\\]|\\.)*")(?=\s*[,\]\}]|\s*$)/gm,
    (match) => {
      // Standalone strings in arrays
      if (!match.includes(":")) return `<span class="text-emerald-400">${match}</span>`;
      return match;
    }
  ).replace(
    /([{}\[\]])/g,
    '<span class="text-gray-500">$1</span>'
  );
}

interface MockDemoProps {
  request: string;
  response: string;
  domain?: string;
}

export default function MockDemo({ request, response, domain = "api.licensecheck.dev" }: MockDemoProps) {
  const method = request.split(" ")[0];
  const path = request.split(" ").slice(1).join(" ");
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-brand-500 uppercase mb-4">
            API Preview
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-normal leading-tight">
            See it in action
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            One request. Structured, normalized data back in milliseconds.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50">
          {/* Window chrome */}
          <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-800">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <div className="w-3 h-3 rounded-full bg-gray-700" />
              <div className="w-3 h-3 rounded-full bg-gray-700" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-800 rounded-md px-4 py-1 text-xs font-mono text-gray-400 max-w-md truncate">
                {domain}
              </div>
            </div>
          </div>

          {/* Request */}
          <div className="bg-[#0d1117] px-6 py-4 border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md tracking-wide">
                {method}
              </span>
              <code className="text-sm font-[family-name:var(--font-jetbrains)] text-gray-300 truncate">
                {path}
              </code>
            </div>
          </div>

          {/* Response */}
          <div className="bg-[#0d1117] px-6 py-5 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-emerald-400 font-medium">200 OK</span>
                </span>
                <span className="text-xs font-mono text-gray-600">application/json</span>
                <span className="text-xs font-mono text-gray-600">&middot; 187ms</span>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-800"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="text-[13px] font-[family-name:var(--font-jetbrains)] overflow-x-auto leading-[1.7]">
              <code dangerouslySetInnerHTML={{ __html: highlightJson(response) }} />
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
