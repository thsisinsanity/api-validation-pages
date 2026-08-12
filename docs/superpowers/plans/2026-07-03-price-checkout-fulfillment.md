# Price Raise + PayPal Checkout Flow + Fulfillment Automation Implementation Plan (REV 2 — PayPal, not Stripe)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **REV 2 (2026-07-03):** Adam does not want a Stripe business account at current volume. The payment rail stays his EXISTING PayPal payment link. Stripe was removed (commit `27648c3`). The intake-before-payment flow and fulfillment automation remain.

**Goal:** Raise the price from $14.99 to $25 (DONE), put an intake form BEFORE payment so contractor details are never lost, record every order in the existing Google Apps Script order sheet, and automate fulfillment via a Claude skill that stages reports for Adam's review.

**Architecture:** `/order` collects contractor details and POSTs to `/api/order`, which appends the order (status `NEW`) to the Apps Script order sheet and returns the PayPal payment link; the browser then redirects to PayPal. Adam confirms payments against his PayPal notification emails (fulfillment skill prompts him), rows move `NEW → PAID → READY → SENT`. `/thanks` is the post-payment confirmation page (Adam sets it as the PayPal return URL) and fires a GA4 purchase event.

**Tech Stack:** Next.js 16 App Router (existing), existing PayPal payment link, Google Apps Script web app (existing pattern), GA4 gtag (already in `app/layout.tsx`).

**Working directory:** `/Users/Adam/Documents/Claude/Projects/Check Licensed/api-validation-pages` (space in path — always quote). Git repo with pre-existing uncommitted changes — stage ONLY the exact paths each task lists; never `git add -A` / `git add .`.

**Env vars (server-side; Adam supplies values — Task 8):**
- `ORDER_SHEET_WEBAPP_URL` — Apps Script /exec URL (new deployment from Task 7)
- `ORDER_SHEET_TOKEN` — shared secret string (same value set inside the Apps Script)

**Status ledger:**
- ✅ Task 1 — `lib/pricing.ts` (commit `a994b59`)
- ✅ Task 2 — $14.99 → $25 sweep, 631 files (commit `7ea009f`)
- ✅ Task 3 — ~~Stripe SDK~~ REMOVED in REV 2 (install `6b02b39`, revert `27648c3`). No action.
- ✅ Task 4 — `/order` page committed (`853bcf7`) but Stripe-flavored; **Task 4b below fixes it for PayPal.**
- ⬜ Task 4b, 5, 6, 7, 8, 9 — below.

---

### Task 4b: Convert `/order` page to the PayPal flow

**Files:**
- Modify: `lib/pricing.ts`
- Modify: `app/order/page.tsx`

- [ ] **Step 1: Add the PayPal link to the pricing constants**

Append to `lib/pricing.ts`:

```typescript
// Existing PayPal payment link (amount is configured in PayPal's dashboard —
// it MUST match PRICE_DOLLARS; see ADAM-GO-LIVE-CHECKLIST.md).
export const PAYPAL_CHECKOUT_URL = "https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW";
```

- [ ] **Step 2: Edit `app/order/page.tsx` — three changes, leave everything else untouched**

(a) In `handleSubmit`, change the fetch target from `"/api/checkout"` to `"/api/order"`.

(b) Replace the comment `// Stripe-hosted checkout` with `// PayPal-hosted payment page`.

(c) Replace the trust line at the bottom of the form:
```tsx
          <p className="text-xs text-slate-500 text-center">
            Secure payment via Stripe. We never see your card details.
          </p>
```
with:
```tsx
          <p className="text-xs text-slate-500 text-center">
            Secure payment via PayPal. We never see your card details.
          </p>
```
And change the submit button's busy label from `"Starting secure checkout…"` to `"Saving your order…"`.

- [ ] **Step 3: Build check**

Run: `npx next build 2>&1 | tail -5`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add lib/pricing.ts app/order/page.tsx
git commit -m "feat: /order submits to /api/order and hands off to PayPal"
```

---

### Task 5: `/api/order` — record order, return PayPal URL

**Files:**
- Create: `app/api/order/route.ts`

- [ ] **Step 1: Create the route**

```typescript
// app/api/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PRICE_DOLLARS, PAYPAL_CHECKOUT_URL } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const customerEmail = (body.customerEmail || "").trim().slice(0, 200);
  const contractorName = (body.contractorName || "").trim().slice(0, 200);
  const state = (body.state || "").trim().slice(0, 60);
  if (!customerEmail || !contractorName || !state) {
    return NextResponse.json(
      { error: "customerEmail, contractorName, and state are required" },
      { status: 400 }
    );
  }

  const sheetUrl = process.env.ORDER_SHEET_WEBAPP_URL;
  const token = process.env.ORDER_SHEET_TOKEN;
  const orderId = `CL-${Date.now().toString(36).toUpperCase()}`;

  if (sheetUrl && token) {
    const order = {
      kind: "order",
      token,
      orderId,
      timestamp: new Date().toISOString(),
      status: "NEW",
      amount: PRICE_DOLLARS.toFixed(2),
      customerEmail,
      contractorName,
      companyName: (body.companyName || "").trim().slice(0, 200),
      state,
      trade: (body.trade || "").trim().slice(0, 100),
      licenseNumber: (body.licenseNumber || "").trim().slice(0, 100),
      notes: (body.notes || "").trim().slice(0, 450),
      utm_source: (body.utm_source || "").slice(0, 100),
      utm_medium: (body.utm_medium || "").slice(0, 100),
      utm_content: (body.utm_content || "").slice(0, 100),
    };
    // Best-effort: never block the customer's path to payment on a sheet
    // hiccup — the order details also arrive via PayPal's payment email.
    await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      redirect: "follow",
    }).catch(() => {});
  }

  return NextResponse.json({ url: PAYPAL_CHECKOUT_URL, orderId });
}
```

- [ ] **Step 2: Build check**

Run: `npx next build 2>&1 | tail -8`
Expected: succeeds; `/api/order` in route list.

- [ ] **Step 3: Runtime smoke test**

Start `npx next dev -p 3456` in the background, wait ~5s, then:

`curl -s -X POST http://localhost:3456/api/order -H 'Content-Type: application/json' -d '{}'`
Expected: `{"error":"customerEmail, contractorName, and state are required"}`

`curl -s -X POST http://localhost:3456/api/order -H 'Content-Type: application/json' -d '{"customerEmail":"t@t.com","contractorName":"Test","state":"Ohio"}'`
Expected: `{"url":"https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW","orderId":"CL-..."}`

Kill the dev server afterwards.

- [ ] **Step 4: Commit**

```bash
git add app/api/order/route.ts
git commit -m "feat: add /api/order — records intake to order sheet, returns PayPal link"
```

---

### Task 6: Point every CTA at `/order`; update `/thanks`

**Files:**
- Modify: `app/page.tsx` (6 PayPal hrefs), `app/pro/page.tsx`, `app/compare-bids/page.tsx`, `app/blog/[slug]/page.tsx` (2 hrefs), `components/DueDiligenceCard.tsx`
- Modify: `app/thanks/page.tsx`

- [ ] **Step 1: Replace the raw PayPal URL with `/order` in all hrefs**

```bash
cd "/Users/Adam/Documents/Claude/Projects/Check Licensed/api-validation-pages"
grep -rl 'https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW' app components | while IFS= read -r f; do
  sed -i '' 's|https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW|/order|g' "$f"
done
```

- [ ] **Step 2: Fix DueDiligenceCard (builds a URL with UTM params from a base constant)**

Open `components/DueDiligenceCard.tsx`. After the sed, line ~12 reads `const PAYPAL_BASE = "/order";`. Rename for clarity:

```typescript
const ORDER_BASE = "/order";
```
and update every usage of `PAYPAL_BASE` in the file to `ORDER_BASE`. Keep the UTM query-param building exactly as is — `/order` forwards utm params through `/api/order` into the sheet.

- [ ] **Step 3: Verify the only remaining PayPal reference is the constant**

Run: `grep -rni "paypal" app components lib --include='*.tsx' --include='*.ts'`
Expected: matches ONLY in `lib/pricing.ts` (the `PAYPAL_CHECKOUT_URL` constant and its comment) and `app/api/order/route.ts` (the import). No hrefs in app/ or components/.

- [ ] **Step 4: Replace the ENTIRE contents of `app/thanks/page.tsx`**

The old /thanks was a post-purchase intake form — intake now happens BEFORE payment on /order, so /thanks becomes a confirmation page. Adam will set the PayPal link's return URL to `https://checklicensed.com/thanks?src=paypal` (checklist). The GA4 purchase event fires only when `src=paypal` is present.

```tsx
"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRICE_DOLLARS } from "@/lib/pricing";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function ThanksContent() {
  const params = useSearchParams();
  const fromPayPal = params.get("src") === "paypal";

  useEffect(() => {
    if (fromPayPal && typeof window.gtag === "function") {
      window.gtag("event", "purchase", {
        transaction_id: `pp-${Date.now()}`,
        value: PRICE_DOLLARS,
        currency: "USD",
        items: [{ item_name: "Contractor Verification Report", price: PRICE_DOLLARS, quantity: 1 }],
      });
    }
  }, [fromPayPal]);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-lg bg-white rounded-2xl shadow-lg p-10 text-center">
        <div className="text-5xl">✅</div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Payment received — we&apos;re on it.
        </h1>
        <p className="mt-3 text-slate-600">
          Your contractor verification is in the queue. Your report will arrive
          in your inbox <strong>within 1 hour</strong> (requests after 4pm ET
          deliver next business morning).
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Didn&apos;t get it, or gave us the wrong details? Just reply to your
          PayPal receipt email and we&apos;ll sort it out. 100% money-back
          guarantee.
        </p>
        <a href="/" className="mt-6 inline-block text-emerald-700 font-semibold">
          ← Back to CheckLicensed
        </a>
      </div>
    </main>
  );
}

export default function ThanksPage() {
  return (
    <Suspense fallback={null}>
      <ThanksContent />
    </Suspense>
  );
}
```

Note: `app/thanks/layout.tsx` exists (untracked, pre-existing). Leave it alone.

- [ ] **Step 5: Build check**

Run: `npx next build 2>&1 | tail -5`
Expected: succeeds (`useSearchParams` needs the `Suspense` wrapper included above).

- [ ] **Step 6: Commit**

```bash
git add -u app components
git add app/thanks/page.tsx
git commit -m "feat: route all CTAs to /order; /thanks becomes confirmation + GA4 purchase event"
```

---

### Task 7: Apps Script v2 — orders API (code for Adam to paste)

**Files:**
- Create: `docs/superpowers/plans/apps-script-orders-v2.gs`

- [ ] **Step 1: Write the Apps Script reference file**

```javascript
// docs/superpowers/plans/apps-script-orders-v2.gs
// Paste into the existing Apps Script project bound to the order sheet
// (script.google.com). Then: Deploy -> Manage deployments -> New deployment
// -> Web app -> execute as Me, access: Anyone. Copy the new /exec URL.
//
// Set TOKEN below to the same random string as the ORDER_SHEET_TOKEN env var.
//
// Statuses: NEW (intake saved, payment unconfirmed) -> PAID (Adam confirmed
// PayPal payment) -> READY (report staged) -> SENT (Adam emailed it).
// ATTENTION = fulfillment hit a problem; see the order folder.

var TOKEN = "REPLACE_WITH_RANDOM_SECRET";
var SHEET_NAME = "Orders";
var HEADERS = [
  "orderId", "timestamp", "status", "amount", "customerEmail",
  "contractorName", "companyName", "state", "trade", "licenseNumber",
  "notes", "utm_source", "utm_medium", "utm_content",
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  if (data.token !== TOKEN) {
    return ContentService.createTextOutput(JSON.stringify({ error: "unauthorized" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var sheet = getSheet_();

  if (data.kind === "order") {
    sheet.appendRow(HEADERS.map(function (h) { return data[h] || ""; }));
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (data.kind === "status") {
    // { kind:"status", token, orderId, status }
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0] === data.orderId) {
        sheet.getRange(i + 1, 3).setValue(data.status); // col 3 = status
        return ContentService.createTextOutput(JSON.stringify({ ok: true }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ error: "not found" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ error: "unknown kind" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (!e.parameter || e.parameter.token !== TOKEN) {
    return ContentService.createTextOutput(JSON.stringify({ error: "unauthorized" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var wanted = e.parameter.status || "NEW";
  var sheet = getSheet_();
  var rows = sheet.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    if (rows[i][2] === wanted) {
      var obj = {};
      for (var j = 0; j < HEADERS.length; j++) obj[HEADERS[j]] = rows[i][j];
      out.push(obj);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ orders: out }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/apps-script-orders-v2.gs
git commit -m "docs: Apps Script v2 orders API for Adam to deploy"
```

---

### Task 8: ADAM'S MANUAL CHECKLIST (humans only — the executing model must NOT attempt these)

**Files:**
- Create: `docs/superpowers/plans/ADAM-GO-LIVE-CHECKLIST.md`

- [ ] **Step 1: Write the checklist file with exactly this content**

```markdown
# Go-Live Checklist (Adam — ~20 minutes, no new accounts)

## PayPal (CRITICAL — do this first)
1. Log into PayPal -> find the payment link (MQJVDCTLLX4BW) -> **change the
   amount from $14.99 to $25.00.** The site now says $25 everywhere; until
   this is done, PayPal still charges $14.99.
2. Your link already redirects to /thanks after payment. Update that return
   URL to: https://checklicensed.com/thanks?src=paypal
   (The `src=paypal` param is what fires the GA4 purchase event on the new
   confirmation page. Without it, orders still work — you just lose the
   automatic purchase event.)

## Apps Script
3. Open script.google.com -> the existing order-sheet project. Replace the
   code with `apps-script-orders-v2.gs` from this folder. Set TOKEN to a
   random string (Terminal: `openssl rand -hex 16`). Deploy -> New deployment
   -> Web app (execute as Me, access: Anyone). Copy the new /exec URL.

## Env vars
4. Local `.env.local` — add:
   ORDER_SHEET_WEBAPP_URL=<new /exec URL>
   ORDER_SHEET_TOKEN=<same random string>
5. Vercel (dashboard -> project -> Settings -> Environment Variables,
   Production): add the same two variables.

## Deploy + end-to-end test
6. `npx vercel --prod --yes` from the project directory.
7. Visit checklicensed.com/order, submit the form with your own email and a
   made-up contractor. Confirm: a row with status NEW appears in the Orders
   tab; you land on PayPal showing $25.00. (You can cancel at PayPal, or pay
   and refund yourself for a full test.)
8. Confirm /thanks?src=paypal renders the confirmation page.

## Daily rhythm
9. When a PayPal "You've got money" email arrives, tell Claude "process new
   CheckLicensed orders" (or wait for the scheduled morning run). Claude
   matches NEW orders to your confirmed payments, asks you to confirm, runs
   the verification, and stages the PDF + draft email for you to send.
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/ADAM-GO-LIVE-CHECKLIST.md
git commit -m "docs: go-live checklist for Adam (PayPal price, Apps Script, env vars)"
```

---

### Task 9: Fulfillment skill for Claude

**Files:**
- Create: `/Users/Adam/.claude/skills/checklicensed-fulfillment/SKILL.md` (NOT in the repo)

- [ ] **Step 1: Create the skill**

```markdown
---
name: checklicensed-fulfillment
description: Process paid CheckLicensed orders end-to-end. Trigger when the user says "process new orders", "check for orders", "run fulfillment", or a scheduled fulfillment task fires. Fetches orders from the order sheet, confirms payment with Adam, runs checklicensed-verification per order, stages PDF reports + draft delivery emails for Adam's review. NEVER auto-sends anything to customers.
---

# CheckLicensed Fulfillment

## Config
- Orders API: the Apps Script web app URL and token are in
  `/Users/Adam/Documents/Claude/Projects/Check Licensed/api-validation-pages/.env.local`
  as `ORDER_SHEET_WEBAPP_URL` and `ORDER_SHEET_TOKEN`. Read them from there.
- Staging directory: `/Users/Adam/Documents/Claude/Projects/Check Licensed/active/orders/`
- Statuses: NEW -> PAID -> READY -> SENT (ATTENTION = needs Adam).

## Steps
1. Fetch NEW orders:
   `curl -s "<ORDER_SHEET_WEBAPP_URL>?token=<ORDER_SHEET_TOKEN>&status=NEW"`
   and PAID orders (same call with status=PAID). If both empty, report
   "No pending orders" and stop.
2. For each NEW order, ask Adam to confirm payment: list orderId, customer
   email, contractor, amount, and timestamp, and ask which ones have a
   matching PayPal payment notification. Payment lands in Adam's PayPal;
   Claude cannot see it — Adam's confirmation is the gate. Mark confirmed
   ones PAID:
   `curl -s -X POST <ORDER_SHEET_WEBAPP_URL> -H 'Content-Type: application/json' -d '{"kind":"status","token":"<TOKEN>","orderId":"<orderId>","status":"PAID"}'`
   Leave unconfirmed NEW rows untouched (customer may not have paid yet —
   flag rows older than 24h as likely abandoned).
3. For EACH PAID order:
   a. Create `active/orders/<orderId>/`.
   b. Run the **checklicensed-verification** skill with the order's
      contractorName, companyName, state, trade, licenseNumber, and notes.
      Save the PDF report into the order folder.
   c. Write `draft-email.md` in the order folder: To: customerEmail,
      Subject: "Your contractor verification report — <contractorName>",
      short plain-English body summarizing the verdict, PDF attached.
   d. Mark READY (same status POST as above with "READY").
4. Report to Adam: one line per order — contractor, state, verdict, folder
   path. Remind him to send the emails and then say "mark orders sent"
   (which POSTs status SENT for each).

## Hard rules
- NEVER email customers directly. Everything is staged for Adam.
- NEVER mark an order PAID without Adam's explicit confirmation in chat.
- If a state lookup fails or the contractor can't be found, still create the
  folder with a `NEEDS-ATTENTION.md` explaining what's missing; POST status
  "ATTENTION" and flag it loudly in the report.
- Delivery promise is 1 hour during business hours — surface order
  timestamps so Adam can prioritize.
```

- [ ] **Step 2: Verify**

Run: `head -5 /Users/Adam/.claude/skills/checklicensed-fulfillment/SKILL.md`
Expected: shows `---` and `name: checklicensed-fulfillment`.

- [ ] **Step 3: No commit (outside repo).** Done.

---

## Verification Order for the Reviewer (main agent)

1. Task 4b/5: `/order` fetches `/api/order`; no "stripe" string anywhere: `grep -rni stripe app components lib package.json` → empty. Smoke test returns the PayPal URL.
2. Task 6: `grep -rni paypal app components lib --include='*.ts*'` → only `lib/pricing.ts` + `app/api/order/route.ts`; build passes.
3. Task 9: skill never sends email, never self-confirms payment.
4. Final: `npx next build` clean; deploy is ADAM's step (checklist), not the executor's.
