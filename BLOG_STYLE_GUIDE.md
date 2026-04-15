# CheckLicensed Blog Style Guide

## Purpose
This guide defines the exact format, structure, and AI optimization requirements for all blog posts on checklicensed.com. Every post written by agents must follow this guide precisely.

---

## File Format

### Location
`/Users/Adam/Documents/Claude/Projects/API business/api-validation-pages/content/posts/{slug}.tsx`

### Template
```tsx
export default function Post() {
  return (
    <>
      <p>Intro paragraph...</p>
      <p>Second intro paragraph...</p>

      <h2>Question-based section header?</h2>
      <p>40-60 word direct answer to the question above. Lead with the bottom-line answer immediately. No preamble. AI search engines extract this as the featured answer.</p>
      <p>Detailed explanation continues here...</p>

      <h2>Next question-based header?</h2>
      <p>40-60 word direct answer...</p>
      <p>More detail...</p>
      <ul>
        <li>Bullet point</li>
        <li>Bullet point</li>
      </ul>
    </>
  );
}
```

### Critical Rules
- **NO imports** — not even React. Just `export default function Post() { return (<>...</>) }`
- **HTML entities only**: `&apos;` for `'`, `&amp;` for `&`, `&quot;` for `"`, `&mdash;` for `—`
- **No FAQ section** in the TSX file — FAQs are injected by the layout from blog.ts
- **No inline styles** — Tailwind classes only (but posts use plain HTML tags styled by the layout)
- **No imports of any components**

---

## AI Search Optimization Requirements (Mandatory on Every Post)

### 1. Question-Based H2 Headers
Every `<h2>` must be phrased as a question a real homeowner would type into Google or ask ChatGPT/Perplexity.

**Good:**
- "Does California require a contractor license?"
- "How do I check a contractor's license in Florida?"
- "What happens if I hire an unlicensed contractor?"
- "What does 'Active' mean on a CSLB license search?"

**Bad:**
- "California contractor licensing overview"
- "Step 1: Go to the website"
- "License status codes"
- "What you need to know"

### 2. Inverted Pyramid Answer Blocks
Immediately after every `<h2>`, add a `<p>` that is 40-60 words and directly answers the question. Lead with the answer — not context, not caveats.

**Good:**
```tsx
<h2>Does California require a contractor license?</h2>
<p>Yes. California requires a license from the Contractors State License Board (CSLB) for any project over $500 in combined labor and materials. The CSLB actively enforces this with sting operations and unlicensed contracting is a misdemeanor on first offense.</p>
```

**Bad:**
```tsx
<h2>Does California require a contractor license?</h2>
<p>That's a great question that many homeowners wonder about. California has a complex licensing system administered by the CSLB, which stands for Contractors State License Board. Let's explore what that means for you...</p>
```

### 3. Statistics and Citations
Include at least 1-2 specific statistics or citations per post. Use real data from licensing boards.

**Good citations:**
- "According to CSLB data, California has over 280,000 licensed contractors on file"
- "California requires a $25,000 surety bond for most contractor license classifications"
- "Florida's DBPR reports unlicensed contracting as one of the most common consumer complaints in the state"
- "According to the FTC, home improvement fraud costs consumers over $3 billion annually"
- "1 in 5 contractor complaints involve unlicensed work"

### 4. Intro Paragraph
The post should open with 1-2 engaging paragraphs (no `<h2>` yet). These should:
- Hook the reader with the core problem
- Be direct, not fluffy
- Set up why this information matters

---

## Voice and Tone

- **Direct.** No hedging, no "it's important to note that..." Just say it.
- **Practical.** Every section should give the reader something actionable.
- **Smart but not condescending.** Write for an intelligent adult who doesn't know contractor licensing rules.
- **No marketing speak.** Don't describe CheckLicensed as "leading" or "premier." Let the content speak.
- **Short paragraphs.** 2-4 sentences max. White space is good.

---

## Post Categories

| Category | Use For |
|----------|---------|
| `State Guides` | "How to Check a Contractor's License in [State]" posts |
| `City Guides` | City-specific license guides (LA, Houston, NYC, Miami, Chicago, etc.) |
| `Homeowner Guides` | General how-to, what-to-know posts for homeowners |
| `Trade Guides` | Trade-specific posts (roofers, electricians, plumbers, HVAC) — both national pillars and state+trade combos |
| `Research` | Original data/audits (e.g., Yelp audit, unlicensed rates) |
| `Industry` | Contractor licensing system analysis, industry trends |
| `Legal Guides` | Contracts, liens, small claims, dispute resolution, suing contractors |

---

## blog.ts Entry Format

Every new post MUST have an entry in `content/blog.ts`. Format:

```typescript
{
  slug: "your-post-slug-here",
  title: "Full Post Title Here",
  description: "One sentence that describes what the reader will learn. Should be specific and useful, not vague.",
  date: "2026-04-03",  // use today's date
  readTime: "6 min read",  // estimate based on word count (~200wpm)
  category: "State Guides",  // see categories above
  faqs: [
    {
      question: "Specific question the post answers?",
      answer: "Direct 1-3 sentence answer. This is injected as FAQPage schema for AI search engines.",
    },
    {
      question: "Second question?",
      answer: "Direct answer.",
    },
    {
      question: "Third question?",
      answer: "Direct answer.",
    },
  ],
},
```

**FAQ rules:**
- 3-4 FAQs per post minimum
- Questions must match what people actually search (use the post's h2s as inspiration)
- Answers must be self-contained (someone reading just the FAQ should get the full answer)
- No "see above" or "as mentioned" — each answer stands alone

---

## State Guide Post Structure

For "How to Check a Contractor's License in [State]" posts:

### Recommended H2 Structure:
1. "Does [State] require a contractor license?"
2. "What is [State]'s contractor licensing database?"
3. "How do I search for a contractor's license in [State]?"
4. "What should I check on the [State] license detail page?"
5. "What do the different license status codes mean in [State]?"
6. "What if I can't find my contractor in the [State] database?"
7. "What are the risks of hiring an unlicensed contractor in [State]?"

Not all posts need all 7. Adjust based on the state's licensing complexity.

### State-Specific Data to Include:
- Name of the licensing board/agency
- URL of the license lookup tool
- Dollar threshold that triggers licensing requirement
- Bond amount required (if applicable)
- What the license types/classifications mean
- Any unique features (complaint history, guaranty fund, etc.)

---

## City Guide Post Structure

For "How to Check a Contractor's License in [City]" posts:

### Key Difference From State Guides:
City guides must explain TWO systems: the **state licensing database** AND **any city-specific registration/permitting system**. Many major cities (NYC, Chicago, LA, Houston, Miami) have requirements ON TOP OF state licensing.

### Recommended H2 Structure:
1. "How do I check a contractor's license in [City]?"
2. "Does [City] have its own contractor licensing requirements?"
3. "Where is the [City] contractor license database?"
4. "What should I verify beyond the state license in [City]?"
5. "What does it mean if a contractor has a state license but no city registration?"
6. "What are the biggest risks of hiring an unlicensed contractor in [City]?"

### City-Specific Data to Include:
- The state licensing board URL that applies (e.g., CSLB for any CA city, DBPR for any FL city)
- The city-specific licensing/registration portal URL (if one exists)
- Dollar threshold for city registration (vs. state)
- Whether the city has a guaranty fund or complaint process separate from the state
- Any city-specific gotchas (NYC's HIC license, Chicago BACP, Houston's city permits)

---

## General / Homeowner Guide Post Structure

For non-state posts (guides, how-tos, explainers):

### Recommended approach:
- Open with the core problem (2 paragraphs)
- Use question-based h2s that mirror real search queries
- Cover the topic in 6-10 sections
- End with a practical bottom line or summary
- 800-1,400 words is the sweet spot

### Good topic patterns:
- "How to [do specific thing] before hiring a contractor"
- "What is [specific term]? (And why it matters)"
- "[Number] things to check before [action]"
- "What happens when [specific bad scenario]"
- "Does [specific trade] need a license?"

---

## Slug Format

- Lowercase, hyphens only, no special characters
- State guides: `how-to-check-contractor-license-{state-name}`
- City guides: `contractor-license-check-{city-name}`
- General guides: descriptive kebab-case, e.g. `how-to-verify-contractor-insurance`
- Trade pillar guides: `does-{trade}-need-license` (e.g. `does-roofer-need-license`)
- Trade+state combos: `licensed-{trade}-{state}` (e.g. `licensed-roofer-california`)
- Legal guides: descriptive, e.g. `can-i-sue-unlicensed-contractor`
- Keep slugs under 65 characters when possible

---

## Quality Checklist (Before Finalizing Any Post)

- [ ] All h2s are phrased as questions
- [ ] Every h2 has a 40-60 word direct answer paragraph immediately after it
- [ ] At least 1-2 statistics or citations included
- [ ] No imports in the TSX file
- [ ] All apostrophes and special chars use HTML entities
- [ ] blog.ts entry added with 3-4 FAQs
- [ ] Slug is unique (not already in blog.ts)
- [ ] Date is set to today
- [ ] Category is correct
- [ ] Post is 800+ words

---

## What NOT to Do

- ❌ Do not write generic filler ("It's important to verify your contractor")
- ❌ Do not add FAQ sections in the TSX file
- ❌ Do not use `import` statements
- ❌ Do not use straight quotes or apostrophes — always use HTML entities
- ❌ Do not write h2s as statements ("California licensing overview")
- ❌ Do not start answer blurbs with "That depends" or "It's complicated"
- ❌ Do not duplicate slugs already in blog.ts
- ❌ Do not modify any file other than the post TSX and blog.ts
