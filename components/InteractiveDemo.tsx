"use client";

import { useState, useEffect, useRef } from "react";

/* ── sample data keyed by state ── */
const SAMPLE_DATA: Record<
  string,
  { license_number: string; response: Record<string, unknown> }
> = {
  CA: {
    license_number: "1077911",
    response: {
      verified: true,
      license_number: "1077911",
      state: "CA",
      full_name: "MARTINEZ ELECTRIC INC",
      profession: "electrician",
      state_classification: "C-10 Electrical",
      status: "active",
      issue_date: "2019-03-15",
      expiration_date: "2027-03-31",
      bond_status: "active",
      workers_comp: "exempt",
      last_verified: new Date().toISOString().replace(/\.\d{3}Z/, "Z"),
      source: "California CSLB",
    },
  },
  TX: {
    license_number: "M-40821",
    response: {
      verified: true,
      license_number: "M-40821",
      state: "TX",
      full_name: "LONE STAR PLUMBING LLC",
      profession: "plumber",
      state_classification: "Master Plumber",
      status: "active",
      issue_date: "2017-08-22",
      expiration_date: "2026-08-31",
      bond_status: "active",
      workers_comp: "covered",
      last_verified: new Date().toISOString().replace(/\.\d{3}Z/, "Z"),
      source: "Texas TDLR",
    },
  },
  FL: {
    license_number: "CCC1332847",
    response: {
      verified: true,
      license_number: "CCC1332847",
      state: "FL",
      full_name: "SUNSHINE ROOFING INC",
      profession: "roofing",
      state_classification: "Certified Roofing Contractor",
      status: "active",
      issue_date: "2020-01-10",
      expiration_date: "2026-08-31",
      bond_status: "active",
      workers_comp: "covered",
      last_verified: new Date().toISOString().replace(/\.\d{3}Z/, "Z"),
      source: "Florida DBPR",
    },
  },
  MA: {
    license_number: "HC-128445",
    response: {
      verified: true,
      license_number: "HC-128445",
      state: "MA",
      full_name: "NEW ENGLAND HVAC CORP",
      profession: "hvac",
      state_classification: "Refrigeration Technician",
      status: "active",
      issue_date: "2021-05-01",
      expiration_date: "2027-04-30",
      bond_status: "not_required",
      workers_comp: "covered",
      last_verified: new Date().toISOString().replace(/\.\d{3}Z/, "Z"),
      source: "Massachusetts DPL",
    },
  },
  AZ: {
    license_number: "ROC338521",
    response: {
      verified: true,
      license_number: "ROC338521",
      state: "AZ",
      full_name: "DESERT GENERAL BUILDERS",
      profession: "general_contractor",
      state_classification: "B-1 General Commercial",
      status: "active",
      issue_date: "2018-11-20",
      expiration_date: "2026-11-30",
      bond_status: "active",
      workers_comp: "covered",
      last_verified: new Date().toISOString().replace(/\.\d{3}Z/, "Z"),
      source: "Arizona ROC",
    },
  },
};

const STATES = Object.keys(SAMPLE_DATA);

function highlightJson(json: string): string {
  return json
    .replace(
      /("(?:[^"\\]|\\.)*")\s*(:)\s*("(?:[^"\\]|\\.)*"|true|false|null|-?\d+(?:\.\d+)?)/g,
      (_, key, colon, value) => {
        let valueClass = "text-emerald-400";
        if (value === "true" || value === "false") valueClass = "text-amber-400";
        else if (value === "null") valueClass = "text-gray-500";
        else if (/^-?\d/.test(value)) valueClass = "text-purple-400";
        return `<span class="text-blue-400">${key}</span>${colon} <span class="${valueClass}">${value}</span>`;
      }
    )
    .replace(
      /("(?:[^"\\]|\\.)*")(?=\s*[,\]\}]|\s*$)/gm,
      (match) => {
        if (!match.includes(":"))
          return `<span class="text-emerald-400">${match}</span>`;
        return match;
      }
    )
    .replace(/([{}\[\]])/g, '<span class="text-gray-500">$1</span>');
}

export default function InteractiveDemo() {
  const [selectedState, setSelectedState] = useState("CA");
  const [licenseNumber, setLicenseNumber] = useState(
    SAMPLE_DATA.CA.license_number
  );
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  /* update license number when state changes */
  useEffect(() => {
    const data = SAMPLE_DATA[selectedState];
    if (data) {
      setLicenseNumber(data.license_number);
      setResponse(null);
      setResponseTime(null);
      setHasRun(false);
    }
  }, [selectedState]);

  function handleVerify() {
    setLoading(true);
    setResponse(null);
    setHasRun(true);

    const delay = 140 + Math.random() * 220; // 140-360ms "response time"
    setTimeout(() => {
      const data = SAMPLE_DATA[selectedState];
      if (data) {
        setResponse(JSON.stringify(data.response, null, 2));
        setResponseTime(Math.round(delay));
      }
      setLoading(false);
      // scroll response into view on mobile
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }, delay);
  }

  function handleCopy() {
    if (response) {
      navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const requestPath = `/v1/licenses/verify?state=${selectedState}&license_number=${encodeURIComponent(licenseNumber)}`;

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-dark">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-brand-500 uppercase mb-4">
            Try it yourself
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-normal leading-tight">
            See what you get back
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Pick a state, hit Check, and see the full license record. Bond status, workers&apos; comp, expiration dates, state classification. All structured JSON.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50">
          {/* ── window chrome ── */}
          <div className="bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-800">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-gray-800 rounded-md px-4 py-1 text-xs font-mono text-gray-400 max-w-md truncate">
                api.contractorapi.dev
              </div>
            </div>
          </div>

          {/* ── input controls ── */}
          <div className="bg-[#0d1117] px-4 sm:px-6 py-5 border-b border-gray-800/50">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* state selector */}
              <div className="flex gap-1.5 flex-wrap">
                {STATES.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                      selectedState === st
                        ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* license input */}
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => {
                    setLicenseNumber(e.target.value);
                    setResponse(null);
                    setHasRun(false);
                  }}
                  placeholder="License number"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-1.5 text-sm font-mono text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                />
                <button
                  onClick={handleVerify}
                  disabled={loading || !licenseNumber.trim()}
                  className="px-5 py-1.5 rounded-md text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30 active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Verifying...
                    </span>
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── request line ── */}
          <div className="bg-[#0d1117] px-4 sm:px-6 py-3 border-b border-gray-800/50">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md tracking-wide shrink-0">
                GET
              </span>
              <code className="text-sm font-[family-name:var(--font-jetbrains)] text-gray-300 whitespace-nowrap">
                {requestPath}
              </code>
            </div>
          </div>

          {/* ── response area ── */}
          <div ref={responseRef} className="bg-[#0d1117] px-4 sm:px-6 py-5 relative min-h-[120px]">
            {/* empty state */}
            {!hasRun && !loading && (
              <div className="flex flex-col items-center justify-center py-8 text-gray-600">
                <svg className="w-8 h-8 mb-3 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
                <span className="text-sm font-mono">
                  Click <span className="text-emerald-500 font-semibold">Verify</span> to see the license record
                </span>
              </div>
            )}

            {/* loading */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="animate-spin h-5 w-5 text-brand-500" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm font-mono">Verifying license...</span>
                </div>
              </div>
            )}

            {/* response */}
            {response && !loading && (
              <div className="animate-[fadeIn_0.3s_ease-out]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono text-emerald-400 font-medium">
                        200 OK
                      </span>
                    </span>
                    <span className="text-xs font-mono text-gray-600">
                      application/json
                    </span>
                    <span className="text-xs font-mono text-gray-600">
                      &middot; {responseTime}ms
                    </span>
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
                  <code
                    dangerouslySetInnerHTML={{
                      __html: highlightJson(response),
                    }}
                  />
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* nudge text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Live data from state licensing boards. 5 states today, all 50 by launch.
        </p>
      </div>
    </section>
  );
}
