import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "API Documentation | Contractor License Verification API",
  description:
    "Complete API reference for the Contractor License Verification API. Verify licenses across all 50 US states with one endpoint.",
};

/* ── reusable pieces ── */

function SectionHeading({ id, title, subtitle }: { id: string; title: string; subtitle?: string }) {
  return (
    <div id={id} className="scroll-mt-24 mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-500 text-base">{subtitle}</p>}
    </div>
  );
}

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 my-6">
      {title && (
        <div className="bg-gray-900 px-4 py-2.5 border-b border-gray-800">
          <span className="text-xs font-mono text-gray-400">{title}</span>
        </div>
      )}
      <pre className="bg-[#0d1117] px-5 py-4 overflow-x-auto text-[13px] leading-relaxed font-[family-name:var(--font-jetbrains)]">
        <code className="text-gray-300">{children}</code>
      </pre>
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold tracking-wide bg-emerald-400/10 text-emerald-600 border border-emerald-200">
      {method}
    </span>
  );
}

function ParamTable({ params }: { params: { name: string; type: string; required: boolean; description: string }[] }) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 font-semibold text-gray-700">Parameter</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Required</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {params.map((p) => (
            <tr key={p.name}>
              <td className="px-4 py-3 font-mono text-sm text-brand-600">{p.name}</td>
              <td className="px-4 py-3 text-gray-500">{p.type}</td>
              <td className="px-4 py-3">
                {p.required ? (
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">Required</span>
                ) : (
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Optional</span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-600">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResponseFieldTable({
  fields,
}: {
  fields: { field: string; type: string; description: string }[];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 font-semibold text-gray-700">Field</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
            <th className="px-4 py-3 font-semibold text-gray-700">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {fields.map((f) => (
            <tr key={f.field}>
              <td className="px-4 py-3 font-mono text-sm text-brand-600">{f.field}</td>
              <td className="px-4 py-3 text-gray-500">{f.type}</td>
              <td className="px-4 py-3 text-gray-600">{f.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Divider() {
  return <hr className="my-16 border-gray-200" />;
}

/* ── sidebar nav items ── */
const NAV_ITEMS = [
  { id: "authentication", label: "Authentication" },
  { id: "base-url", label: "Base URL" },
  { id: "verify-license", label: "Verify License" },
  { id: "search-licenses", label: "Search by Name" },
  { id: "list-states", label: "List States" },
  { id: "status-codes", label: "Status Codes" },
  { id: "rate-limits", label: "Rate Limits" },
  { id: "sdks", label: "SDKs & Tools" },
  { id: "roadmap", label: "Roadmap" },
];

/* ── main page ── */

export default function DocsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar name="Contractor License Verification API" />

      {/* hero */}
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase mb-3">
            API Reference
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Documentation
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl">
            Everything you need to verify contractor licenses across the US. One endpoint, structured JSON, real-time data from state licensing boards.
          </p>
        </div>
      </div>

      {/* body: sidebar + content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24 space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block px-3 py-2 text-sm rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* content */}
          <div className="min-w-0">
            {/* ── Authentication ── */}
            <SectionHeading
              id="authentication"
              title="Authentication"
              subtitle="All API requests require a Bearer token in the Authorization header."
            />

            <p className="text-gray-600 mb-4">
              Include your API key in the <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono text-gray-800">Authorization</code> header
              of every request. You can get your API key from the dashboard after signing up.
            </p>

            <CodeBlock title="Example header">
{`Authorization: Bearer YOUR_API_KEY`}
            </CodeBlock>

            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800 my-6">
              <strong>Keep your API key secret.</strong> Do not expose it in client-side code, public repositories,
              or browser requests. Always call the API from your backend.
            </div>

            <Divider />

            {/* ── Base URL ── */}
            <SectionHeading id="base-url" title="Base URL" />

            <p className="text-gray-600 mb-4">All endpoints are relative to the following base URL:</p>

            <CodeBlock>
{`https://api.contractorapi.dev`}
            </CodeBlock>

            <Divider />

            {/* ── Endpoint: Verify License ── */}
            <SectionHeading
              id="verify-license"
              title="Verify a License"
              subtitle="Look up a specific contractor license by state and license number."
            />

            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="GET" />
              <code className="text-sm font-mono text-gray-700">/v1/licenses/verify</code>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Query Parameters</h3>
            <ParamTable
              params={[
                { name: "state", type: "string", required: true, description: "Two-letter US state code (e.g. CA, TX, FL)" },
                { name: "license_number", type: "string", required: true, description: "The contractor's license number" },
              ]}
            />

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Example Request</h3>
            <CodeBlock title="curl">
{`curl -X GET "https://api.contractorapi.dev/v1/licenses/verify?state=CA&license_number=1077911" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </CodeBlock>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Example Response</h3>
            <CodeBlock title="200 OK">
{`{
  "verified": true,
  "license_number": "1077911",
  "state": "CA",
  "full_name": "MARTINEZ ELECTRIC INC",
  "profession": "electrician",
  "state_classification": "C-10 Electrical",
  "status": "active",
  "issue_date": "2019-03-15",
  "expiration_date": "2027-03-31",
  "bond_status": "active",
  "workers_comp": "exempt",
  "last_verified": "2026-03-28T14:22:00Z",
  "source": "California CSLB"
}`}
            </CodeBlock>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Response Fields</h3>
            <ResponseFieldTable
              fields={[
                { field: "verified", type: "boolean", description: "Whether the license was found and is verifiable" },
                { field: "license_number", type: "string", description: "The license number as recorded by the state" },
                { field: "state", type: "string", description: "Two-letter state code" },
                { field: "full_name", type: "string", description: "Licensed entity or individual name" },
                { field: "profession", type: "string", description: "Normalized profession type (electrician, plumber, hvac, roofing, general_contractor)" },
                { field: "state_classification", type: "string", description: "The state's own license classification or trade code" },
                { field: "status", type: "string", description: "License status: active, expired, suspended, revoked, or inactive" },
                { field: "issue_date", type: "string", description: "Date the license was originally issued (ISO 8601)" },
                { field: "expiration_date", type: "string", description: "Date the license expires (ISO 8601)" },
                { field: "bond_status", type: "string", description: "Surety bond status: active, expired, not_required, or unknown" },
                { field: "workers_comp", type: "string", description: "Workers compensation status: covered, exempt, expired, or unknown" },
                { field: "last_verified", type: "string", description: "Timestamp of when this data was last pulled from the source (ISO 8601)" },
                { field: "source", type: "string", description: "Name of the state licensing board or data source" },
              ]}
            />

            <Divider />

            {/* ── Endpoint: Search by Name ── */}
            <SectionHeading
              id="search-licenses"
              title="Search by Name"
              subtitle="Search for contractor licenses by name within a state. Useful when you have a name but not a license number."
            />

            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="GET" />
              <code className="text-sm font-mono text-gray-700">/v1/licenses/search</code>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Query Parameters</h3>
            <ParamTable
              params={[
                { name: "state", type: "string", required: true, description: "Two-letter US state code" },
                { name: "name", type: "string", required: true, description: "Business or individual name to search for" },
                { name: "profession", type: "string", required: false, description: "Filter by profession (electrician, plumber, hvac, roofing, general_contractor)" },
              ]}
            />

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Example Request</h3>
            <CodeBlock title="curl">
{`curl -X GET "https://api.contractorapi.dev/v1/licenses/search?state=CA&name=Martinez" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </CodeBlock>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Example Response</h3>
            <CodeBlock title="200 OK">
{`{
  "state": "CA",
  "query": "Martinez",
  "total_results": 2,
  "results": [
    {
      "license_number": "1077911",
      "full_name": "MARTINEZ ELECTRIC INC",
      "profession": "electrician",
      "state_classification": "C-10 Electrical",
      "status": "active",
      "expiration_date": "2027-03-31"
    },
    {
      "license_number": "982104",
      "full_name": "MARTINEZ & SONS PLUMBING",
      "profession": "plumber",
      "state_classification": "C-36 Plumbing",
      "status": "active",
      "expiration_date": "2026-11-30"
    }
  ]
}`}
            </CodeBlock>

            <Divider />

            {/* ── Endpoint: List States ── */}
            <SectionHeading
              id="list-states"
              title="List Supported States"
              subtitle="Returns all states currently supported by the API."
            />

            <div className="flex items-center gap-3 mb-6">
              <MethodBadge method="GET" />
              <code className="text-sm font-mono text-gray-700">/v1/states</code>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-3">Example Request</h3>
            <CodeBlock title="curl">
{`curl -X GET "https://api.contractorapi.dev/v1/states" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </CodeBlock>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Example Response</h3>
            <CodeBlock title="200 OK">
{`{
  "total": 5,
  "states": [
    { "code": "AZ", "name": "Arizona", "source": "Arizona ROC", "professions": ["general_contractor", "electrician", "plumber", "hvac", "roofing"] },
    { "code": "CA", "name": "California", "source": "California CSLB", "professions": ["general_contractor", "electrician", "plumber", "hvac", "roofing"] },
    { "code": "FL", "name": "Florida", "source": "Florida DBPR", "professions": ["general_contractor", "electrician", "plumber", "hvac", "roofing"] },
    { "code": "MA", "name": "Massachusetts", "source": "Massachusetts DPL", "professions": ["electrician", "plumber", "hvac"] },
    { "code": "TX", "name": "Texas", "source": "Texas TDLR", "professions": ["electrician", "plumber", "hvac", "roofing"] }
  ]
}`}
            </CodeBlock>

            <Divider />

            {/* ── Status Codes ── */}
            <SectionHeading
              id="status-codes"
              title="Status Codes"
              subtitle="Standard HTTP status codes returned by the API."
            />

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-700">Code</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-mono text-sm">
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">200</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">OK</td>
                    <td className="px-4 py-3 text-gray-600">Request succeeded. License data returned in the response body.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sm">
                      <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-semibold">400</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">Bad Request</td>
                    <td className="px-4 py-3 text-gray-600">Missing or invalid query parameters. Check that <code className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">state</code> and <code className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">license_number</code> are provided.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sm">
                      <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded font-semibold">401</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">Unauthorized</td>
                    <td className="px-4 py-3 text-gray-600">Missing or invalid API key. Ensure the <code className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Authorization</code> header is set correctly.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sm">
                      <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-semibold">404</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">Not Found</td>
                    <td className="px-4 py-3 text-gray-600">No license found matching the provided state and license number combination.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-sm">
                      <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded font-semibold">429</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">Too Many Requests</td>
                    <td className="px-4 py-3 text-gray-600">Rate limit exceeded. Check the <code className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Retry-After</code> header for when you can retry.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-8 mb-3">Error Response Format</h3>
            <CodeBlock title="Example error (400)">
{`{
  "error": {
    "code": "invalid_request",
    "message": "Missing required parameter: license_number",
    "status": 400
  }
}`}
            </CodeBlock>

            <Divider />

            {/* ── Rate Limits ── */}
            <SectionHeading
              id="rate-limits"
              title="Rate Limits"
              subtitle="Rate limits are applied per API key based on your plan."
            />

            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-700">Plan</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Rate Limit</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">Free</td>
                    <td className="px-4 py-3 text-gray-600">25 requests / day</td>
                    <td className="px-4 py-3 text-gray-600">$0</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">Starter</td>
                    <td className="px-4 py-3 text-gray-600">1,000 requests / day</td>
                    <td className="px-4 py-3 text-gray-600">$0.25 / verification</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">Growth</td>
                    <td className="px-4 py-3 text-gray-600">5,000 requests / day</td>
                    <td className="px-4 py-3 text-gray-600">$0.18 / verification</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">Scale</td>
                    <td className="px-4 py-3 text-gray-600">Unlimited</td>
                    <td className="px-4 py-3 text-gray-600">$0.12 / verification</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-600 text-sm">
              Rate limit headers are included in every response:{" "}
              <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">X-RateLimit-Limit</code>,{" "}
              <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">X-RateLimit-Remaining</code>, and{" "}
              <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">X-RateLimit-Reset</code>.
            </p>

            <Divider />

            {/* ── SDKs & Tools ── */}
            <SectionHeading
              id="sdks"
              title="SDKs & Tools"
              subtitle="Libraries and integrations to get started faster."
            />

            <div className="grid gap-6 sm:grid-cols-2 my-6">
              {/* MCP Server */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-brand-500 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">MCP Server</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Connect AI agents and LLMs directly to the license verification API using the
                  Model Context Protocol. Works with Claude, ChatGPT, and any MCP-compatible client.
                </p>
                <code className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg block">
                  npx @contractorapi/mcp-server
                </code>
              </div>

              {/* REST API */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-brand-500 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">REST API</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Standard REST API with JSON responses. Works with any HTTP client --
                  curl, fetch, axios, httpx, or your language of choice. No SDK required.
                </p>
                <code className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg block">
                  Content-Type: application/json
                </code>
              </div>

              {/* Python */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-brand-500 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Python SDK</h3>
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Coming soon</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Official Python client with type hints, async support, and automatic retries.
                </p>
                <code className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg block">
                  pip install contractorapi
                </code>
              </div>

              {/* Node.js */}
              <div className="border border-gray-200 rounded-xl p-6 hover:border-brand-500 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Node.js SDK</h3>
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Coming soon</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Official TypeScript/JavaScript client for Node.js with full type definitions.
                </p>
                <code className="text-xs font-mono text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg block">
                  npm install @contractorapi/sdk
                </code>
              </div>
            </div>

            <Divider />

            {/* ── Roadmap ── */}
            <SectionHeading
              id="roadmap"
              title="Roadmap"
              subtitle="License verification is just the start. Here's what's coming next."
            />

            <div className="grid gap-4 sm:grid-cols-2 my-6">
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Live now</span>
                  <h3 className="font-semibold text-gray-900 text-sm">License Verification</h3>
                </div>
                <p className="text-sm text-gray-500">Real-time license status, bond info, workers&apos; comp, and state classifications across all 50 states.</p>
              </div>
              <div className="border border-dashed border-gray-300 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Q3 2026</span>
                  <h3 className="font-semibold text-gray-900 text-sm">Business Entity Checks</h3>
                </div>
                <p className="text-sm text-gray-500">Secretary of State data. Verify registration status, incorporation type, and registered agent info.</p>
              </div>
              <div className="border border-dashed border-gray-300 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Q4 2026</span>
                  <h3 className="font-semibold text-gray-900 text-sm">Litigation History</h3>
                </div>
                <p className="text-sm text-gray-500">Court records, liens, judgments, and disciplinary actions. Federal and state courts.</p>
              </div>
              <div className="border border-dashed border-gray-300 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">2027</span>
                  <h3 className="font-semibold text-gray-900 text-sm">Permits &amp; Zoning</h3>
                </div>
                <p className="text-sm text-gray-500">Building permit history, zoning data, and code violations across US jurisdictions.</p>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-2">
              The long-term vision: one API call that tells you everything about a contractor. License, entity, litigation, permits. We&apos;re building it layer by layer.
            </p>

            <Divider />

            {/* ── Quick Start ── */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to get started?</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Sign up for a free API key and start verifying contractor licenses in minutes. No credit card required.
              </p>
              <a
                href="/license#waitlist"
                className="inline-flex items-center gap-2 text-sm font-medium bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Get early access
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer name="Contractor License Verification API" />
    </main>
  );
}
