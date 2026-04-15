import type { ExtractedBid } from "./bid-analyzer";

export interface CategoryRow {
  category: string;
  // amounts[i] === total for bid i in this category, or null if not present
  amounts: (number | null)[];
  // Items grouped by bid for the modal/expandable detail
  items: { description: string; amount: number | null; isAllowance: boolean }[][];
}

export interface ComparisonResult {
  categories: CategoryRow[];
  totals: (number | null)[];
  scopeMismatches: string[]; // categories present in some bids but missing from others
}

const CATEGORY_ORDER = [
  "demo",
  "framing",
  "plumbing",
  "electrical",
  "hvac",
  "drywall",
  "flooring",
  "cabinets",
  "countertops",
  "appliances",
  "paint",
  "fixtures",
  "permits",
  "dumpster",
  "cleanup",
  "contingency",
  "overhead",
  "profit",
  "other",
];

function normalizeCategory(raw: string): string {
  const c = raw.toLowerCase().trim();
  if (CATEGORY_ORDER.includes(c)) return c;
  // Loose mapping for common variants
  if (c.includes("demo") || c.includes("tear")) return "demo";
  if (c.includes("plumb")) return "plumbing";
  if (c.includes("elect")) return "electrical";
  if (c.includes("hvac") || c.includes("heat") || c.includes("air")) return "hvac";
  if (c.includes("drywall") || c.includes("sheetrock")) return "drywall";
  if (c.includes("floor") || c.includes("tile")) return "flooring";
  if (c.includes("cabinet")) return "cabinets";
  if (c.includes("counter") || c.includes("quartz") || c.includes("granite")) return "countertops";
  if (c.includes("appliance")) return "appliances";
  if (c.includes("paint")) return "paint";
  if (c.includes("fixture") || c.includes("faucet") || c.includes("light")) return "fixtures";
  if (c.includes("permit")) return "permits";
  if (c.includes("dumpster") || c.includes("disposal") || c.includes("haul")) return "dumpster";
  if (c.includes("clean")) return "cleanup";
  if (c.includes("contingen")) return "contingency";
  if (c.includes("overhead")) return "overhead";
  if (c.includes("profit")) return "profit";
  if (c.includes("frame") || c.includes("framing")) return "framing";
  return "other";
}

export function compareBids(bids: ExtractedBid[]): ComparisonResult {
  const n = bids.length;

  // Group line items by normalized category, per bid
  const grouped: Record<string, { description: string; amount: number | null; isAllowance: boolean }[][]> = {};

  for (const cat of CATEGORY_ORDER) grouped[cat] = Array.from({ length: n }, () => []);

  bids.forEach((bid, i) => {
    for (const item of bid.line_items) {
      const cat = normalizeCategory(item.category);
      if (!grouped[cat]) grouped[cat] = Array.from({ length: n }, () => []);
      grouped[cat][i].push({
        description: item.description,
        amount: item.amount,
        isAllowance: item.is_allowance,
      });
    }
  });

  const categories: CategoryRow[] = [];
  const scopeMismatches: string[] = [];

  for (const cat of CATEGORY_ORDER) {
    const items = grouped[cat];
    const present = items.map((arr) => arr.length > 0);
    if (!present.some(Boolean)) continue;

    const amounts = items.map((arr) => {
      if (arr.length === 0) return null;
      const sum = arr.reduce((acc, item) => acc + (item.amount ?? 0), 0);
      return sum > 0 ? sum : null;
    });

    categories.push({ category: cat, amounts, items });

    // Mismatch: present in some bids but not all
    if (present.some(Boolean) && !present.every(Boolean)) {
      scopeMismatches.push(cat);
    }
  }

  const totals = bids.map((b) => b.totals.total);

  return { categories, totals, scopeMismatches };
}

export function formatCategoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function slugifyContractor(name: string | null, fallback: string): string {
  if (!name) return fallback;
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || fallback;
}
