export interface PricingTier {
  name: string;
  price: string;
  per: string;
  volume: string;
  tagline: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export interface NicheContent {
  slug: string;
  name: string;
  headline: string;
  subheadline: string;
  badge: string;
  benefits: { icon: string; title: string; description: string }[];
  mockRequest: string;
  mockResponse: string;
  pricing: PricingTier[];
  useCases: { industry: string; description: string; icon: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const niches: Record<string, NicheContent> = {
  license: {
    slug: "license",
    name: "Contractor License Verification API",
    badge: "Launching Q2 2026",
    headline: "Verify contractor licenses across every US state. One API call.",
    subheadline:
      "Real-time license status for electricians, plumbers, HVAC, roofers, and general contractors. Launching with 5 states, scaling to 50.",
    benefits: [
      {
        icon: "zap",
        title: "Every state, one endpoint",
        description:
          "No more logging into individual state portals. Get normalized license data in a single API call with a consistent schema across jurisdictions.",
      },
      {
        icon: "dollar",
        title: "Checkr: $12/check. Us: $0.25.",
        description:
          "We do one thing well: license verification. No bundled background checks, no $20K enterprise contracts. Direct API access starting at $0.25 with a free tier.",
      },
      {
        icon: "clock",
        title: "Real-time, verified data",
        description:
          "License status pulled directly from state licensing boards. No stale databases, no monthly bulk imports. Know a license is active right now.",
      },
    ],
    mockRequest:
      'GET /v1/licenses/verify?state=CA&license_number=1077911',
    mockResponse: JSON.stringify(
      {
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
        last_verified: "2026-03-28T14:22:00Z",
        source: "California CSLB",
      },
      null,
      2
    ),
    pricing: [
      { name: "Free", price: "$0", per: "25 lookups/mo", volume: "Try it free", tagline: "Perfect for testing", features: ["25 verifications/month", "All supported states", "Community support"], cta: "Get started free" },
      { name: "Starter", price: "$0.25", per: "per verification", volume: "Pay as you go", tagline: "For small teams getting started", features: ["Unlimited verifications", "Batch API access", "Email support"], cta: "Join the waitlist", highlight: true },
      { name: "Growth", price: "$0.18", per: "per verification", volume: "2,000+/mo", tagline: "For teams with regular needs", features: ["Everything in Starter", "Volume pricing", "Priority support + webhooks"], cta: "Join the waitlist" },
      { name: "Scale", price: "$0.12", per: "per verification", volume: "10,000+/mo", tagline: "For high-volume integrations", features: ["Everything in Growth", "Dedicated support", "Custom SLA"], cta: "Join the waitlist" },
    ],
    useCases: [
      { industry: "Insurance Underwriting", description: "Verify contractor licenses before issuing policies", icon: "shield" },
      { industry: "Home Services Marketplaces", description: "Screen contractors automatically on signup", icon: "building" },
      { industry: "Property Management", description: "Confirm license status before approving vendors", icon: "map" },
      { industry: "AI & Automation", description: "Tool-calling agents that verify licenses programmatically via REST or MCP", icon: "zap" },
      { industry: "Construction Companies", description: "Verify subcontractor compliance at scale", icon: "puzzle" },
      { industry: "Lending & Finance", description: "Assess contractor legitimacy before extending credit", icon: "dollar" },
    ],
    metaTitle: "Contractor License Verification API | Multi-State | $0.25/check",
    metaDescription:
      "Verify electrician, plumber, HVAC, roofing, and general contractor licenses across US states. One API call. Developer-friendly pricing starting at $0.25/verification.",
  },

  business: {
    slug: "business",
    name: "Business Verification API",
    badge: "Launching Q2 2026",
    headline: "Verify any US business in seconds. Secretary of State data, one API.",
    subheadline:
      "Real-time business registration status, filing history, and registered agent data from state SOS portals. Launching with top states, scaling nationwide.",
    benefits: [
      {
        icon: "zap",
        title: "Every state, one API call",
        description:
          "Secretary of State databases unified into a single endpoint. Consistent schema, normalized entity types, real-time status checks.",
      },
      {
        icon: "dollar",
        title: "Self-serve from $0.15/lookup",
        description:
          "No sales calls, no $8K minimums, no annual contracts. Sign up, get an API key, and start verifying businesses in minutes. Free tier included.",
      },
      {
        icon: "clock",
        title: "Real-time, not cached",
        description:
          "Data pulled directly from state SOS portals — not a database that updates weekly. Get the current registration status, not last month's snapshot.",
      },
    ],
    mockRequest:
      'GET /v1/business/verify?state=CA&entity_name=Acme+Corp',
    mockResponse: JSON.stringify(
      {
        verified: true,
        entity_name: "ACME CORP",
        state: "CA",
        entity_number: "C4185721",
        entity_type: "CORPORATION",
        status: "active",
        formation_date: "2018-06-12",
        jurisdiction: "CALIFORNIA",
        registered_agent: "JOHN DOE",
        agent_address: "123 Main St, Los Angeles, CA 90001",
        last_filing: "2025-12-15",
        last_verified: "2026-03-28T14:22:00Z",
        source: "California Secretary of State",
      },
      null,
      2
    ),
    pricing: [
      { name: "Free", price: "$0", per: "25 lookups/mo", volume: "Try it free", tagline: "Perfect for testing", features: ["25 verifications/month", "All supported states", "Community support"], cta: "Get started free" },
      { name: "Starter", price: "$0.15", per: "per verification", volume: "Pay as you go", tagline: "For small teams getting started", features: ["Unlimited verifications", "Batch API access", "Email support"], cta: "Join the waitlist", highlight: true },
      { name: "Growth", price: "$0.10", per: "per verification", volume: "2,000+/mo", tagline: "For teams with regular needs", features: ["Volume pricing", "Priority support", "Webhook notifications"], cta: "Join the waitlist" },
      { name: "Scale", price: "$0.07", per: "per verification", volume: "10,000+/mo", tagline: "For high-volume integrations", features: ["Lowest per-check price", "Dedicated support", "Custom SLA"], cta: "Join the waitlist" },
    ],
    useCases: [
      { industry: "KYB Compliance", description: "Verify business registration during onboarding", icon: "shield" },
      { industry: "Lending", description: "Confirm entity status before approving credit", icon: "dollar" },
      { industry: "Insurance", description: "Validate business legitimacy before issuing policies", icon: "building" },
      { industry: "AI & Automation", description: "LLM agents that verify businesses programmatically via API", icon: "zap" },
      { industry: "Due Diligence", description: "Screen acquisition targets and partners", icon: "search" },
      { industry: "Fintech Onboarding", description: "KYB checks integrated into your signup flow", icon: "puzzle" },
    ],
    metaTitle: "Business Verification API | Secretary of State Data | Multi-State",
    metaDescription:
      "Verify US business registration, status, and filings across states via one API. Real-time Secretary of State data. Developer-friendly pricing from $0.15/lookup.",
  },

  permits: {
    slug: "permits",
    name: "Permits & Zoning API",
    badge: "Launching Q2 2026",
    headline: "Building permits and zoning data. Every jurisdiction, one API.",
    subheadline:
      "Permit history, zoning classifications, building violations, and code enforcement data for any US property. Structured, searchable, affordable.",
    benefits: [
      {
        icon: "map",
        title: "Every jurisdiction, one API",
        description:
          "Thousands of municipal permit systems unified into a single endpoint. Search by address and get permits, zoning, and violations instantly.",
      },
      {
        icon: "dollar",
        title: "Developer pricing, not enterprise",
        description:
          "ATTOM charges enterprise rates with long sales cycles. Our API starts at $0.30/lookup with self-serve signup and a free tier to evaluate.",
      },
      {
        icon: "zap",
        title: "Structured, searchable data",
        description:
          "Raw municipal data normalized into a clean schema. Permit types, statuses, contractor info, and violation history — all structured and ready for your workflow.",
      },
    ],
    mockRequest:
      'GET /v1/permits/search?address=123+Main+St&city=Austin&state=TX',
    mockResponse: JSON.stringify(
      {
        property: "123 Main St, Austin, TX 78701",
        zoning: "SF-3 (Single Family)",
        permits: [
          {
            permit_number: "BP-2025-041822",
            type: "Building - Residential Remodel",
            status: "finaled",
            issued: "2025-03-10",
            completed: "2025-09-22",
            contractor: "ABC Construction LLC",
            value: 85000,
          },
          {
            permit_number: "EP-2024-018293",
            type: "Electrical",
            status: "active",
            issued: "2024-11-05",
            completed: null,
            contractor: "Spark Electric Inc",
            value: 12000,
          },
        ],
        violations: [],
        last_verified: "2026-03-28T14:22:00Z",
      },
      null,
      2
    ),
    pricing: [
      { name: "Free", price: "$0", per: "10 lookups/mo", volume: "Try it free", tagline: "Perfect for testing", features: ["10 lookups/month", "All supported jurisdictions", "Community support"], cta: "Get started free" },
      { name: "Starter", price: "$0.30", per: "per lookup", volume: "Pay as you go", tagline: "For small teams getting started", features: ["Unlimited lookups", "Batch API access", "Email support"], cta: "Join the waitlist", highlight: true },
      { name: "Growth", price: "$0.20", per: "per lookup", volume: "2,000+/mo", tagline: "For teams with regular needs", features: ["Volume pricing", "Priority support", "Webhook notifications"], cta: "Join the waitlist" },
      { name: "Scale", price: "$0.12", per: "per lookup", volume: "10,000+/mo", tagline: "For high-volume integrations", features: ["Lowest per-lookup price", "Dedicated support", "Custom SLA"], cta: "Join the waitlist" },
    ],
    useCases: [
      { industry: "Real Estate", description: "Check permit history and zoning before buying", icon: "building" },
      { industry: "Construction", description: "See what permits a project needs before breaking ground", icon: "puzzle" },
      { industry: "Insurance Underwriting", description: "Flag unpermitted work and open violations", icon: "shield" },
      { industry: "Property Management", description: "Monitor code enforcement across your portfolio", icon: "map" },
      { industry: "AI & Automation", description: "Automated property analysis for investment agent workflows", icon: "zap" },
      { industry: "Lending", description: "Verify property compliance before issuing mortgages", icon: "dollar" },
    ],
    metaTitle: "Building Permits & Zoning API | Every US Jurisdiction",
    metaDescription:
      "Access building permit history, zoning data, and code violations for any US property via one API. Developer-friendly pricing from $0.30/lookup.",
  },

  courts: {
    slug: "courts",
    name: "Court Records API",
    badge: "Launching Q2 2026",
    headline: "Litigation history and court records. Affordable. Developer-friendly.",
    subheadline:
      "Search federal and state court records for active lawsuits, judgments, bankruptcies, and liens. One API, all jurisdictions.",
    benefits: [
      {
        icon: "shield",
        title: "Federal + state courts, one search",
        description:
          "Search PACER federal records and state court systems through a single API. No account setup, no per-page fees, no learning 50 different court portals.",
      },
      {
        icon: "dollar",
        title: "From $0.50/search, not $20K/year",
        description:
          "LexisNexis and Westlaw are built for law firms at law firm prices. This API brings litigation data to developers, startups, and automated workflows at 100x lower cost.",
      },
      {
        icon: "zap",
        title: "Structured case data, instantly",
        description:
          "Case numbers, parties, filing dates, status, and case type — normalized into a clean JSON schema. Ready for due diligence, compliance, and risk screening workflows.",
      },
    ],
    mockRequest:
      'GET /v1/courts/search?entity=Acme+Corp&state=CA',
    mockResponse: JSON.stringify(
      {
        entity: "Acme Corp",
        jurisdiction: "CA",
        total_cases: 2,
        cases: [
          {
            case_number: "2:24-cv-08821",
            court: "US District Court, Central District of California",
            type: "civil",
            status: "closed",
            filed: "2024-10-15",
            closed: "2025-06-30",
            parties: ["Acme Corp (defendant)", "Smith LLC (plaintiff)"],
            summary: "Breach of contract",
          },
          {
            case_number: "BC-2025-14392",
            court: "Los Angeles County Superior Court",
            type: "civil",
            status: "active",
            filed: "2025-08-22",
            closed: null,
            parties: ["Acme Corp (plaintiff)", "Beta Industries (defendant)"],
            summary: "Collections - commercial",
          },
        ],
        last_verified: "2026-03-28T14:22:00Z",
      },
      null,
      2
    ),
    pricing: [
      { name: "Free", price: "$0", per: "10 lookups/mo", volume: "Try it free", tagline: "Perfect for testing", features: ["10 searches/month", "Federal + state courts", "Community support"], cta: "Get started free" },
      { name: "Starter", price: "$0.50", per: "per search", volume: "Pay as you go", tagline: "For small teams getting started", features: ["Unlimited searches", "Batch API access", "Email support"], cta: "Join the waitlist", highlight: true },
      { name: "Growth", price: "$0.35", per: "per search", volume: "2,000+/mo", tagline: "For teams with regular needs", features: ["Volume pricing", "Priority support", "Webhook notifications"], cta: "Join the waitlist" },
      { name: "Scale", price: "$0.20", per: "per search", volume: "10,000+/mo", tagline: "For high-volume integrations", features: ["Lowest per-search price", "Dedicated support", "Custom SLA"], cta: "Join the waitlist" },
    ],
    useCases: [
      { industry: "Due Diligence", description: "Screen vendors, partners, or acquisition targets", icon: "search" },
      { industry: "Lending", description: "Check for active judgments before credit decisions", icon: "dollar" },
      { industry: "Insurance Underwriting", description: "Assess litigation risk before issuing policies", icon: "shield" },
      { industry: "Compliance", description: "Monitor counterparty legal exposure continuously", icon: "building" },
      { industry: "AI & Automation", description: "Automated litigation checks in agent onboarding pipelines", icon: "zap" },
      { industry: "Legal Teams", description: "Quick litigation checks without LexisNexis contracts", icon: "puzzle" },
    ],
    metaTitle: "Court Records & Litigation API | Federal + State Courts",
    metaDescription:
      "Search court records, active lawsuits, judgments, and bankruptcies across federal and state courts. Developer-friendly API from $0.50/search.",
  },
};

export const nicheKeys = Object.keys(niches) as (keyof typeof niches)[];

export const roles = [
  "Developer / Engineer",
  "Insurance / Underwriting",
  "Property Management",
  "Construction / Contracting",
  "Real Estate",
  "Legal / Compliance",
  "Finance / Lending",
  "Other",
];

export const volumes = [
  "Less than 100/month",
  "100 - 1,000/month",
  "1,000 - 10,000/month",
  "10,000+/month",
];
