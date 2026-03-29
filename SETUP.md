# Setup Guide

## 1. Google Sheets Waitlist Backend

This takes about 5 minutes.

### Create the Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "API Waitlist Signups"
3. In row 1, add these headers:
   ```
   A: timestamp | B: niche | C: nicheName | D: email | E: role | F: useCase | G: volume | H: currentSolution
   ```

### Create the Apps Script
1. In your spreadsheet, go to **Extensions > Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp,
    data.niche,
    data.nicheName,
    data.email,
    data.role,
    data.useCase,
    data.volume,
    data.currentSolution
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy > New deployment**
4. Type: **Web app**
5. Execute as: **Me**
6. Who has access: **Anyone**
7. Click **Deploy** and copy the URL

### Connect to the App
1. Copy `.env.local.example` to `.env.local`:
   ```
   cp .env.local.example .env.local
   ```
2. Paste your Apps Script URL:
   ```
   NEXT_PUBLIC_GOOGLE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Restart the dev server

## 2. Deploy to Vercel

1. Push to GitHub:
   ```
   git add -A && git commit -m "initial landing pages" && git push
   ```
2. Go to [vercel.com](https://vercel.com), import the repo
3. Add the environment variable `NEXT_PUBLIC_GOOGLE_SHEET_URL` in Vercel project settings
4. Deploy

Each niche page will be at:
- yourdomain.com/license
- yourdomain.com/business
- yourdomain.com/permits
- yourdomain.com/courts

## 3. Custom Domains (for ads)

If you want separate domains per niche for cleaner ad tracking:
1. Buy domains (e.g., verifylicense.dev, verifysos.dev, etc.)
2. In Vercel, add each domain and point it to the appropriate route using [Vercel rewrites](https://vercel.com/docs/edge-network/rewrites)

Or just use subdomains: license.yourdomain.com, business.yourdomain.com, etc.

## 4. Google Ads Setup

For each niche, create a separate campaign targeting its keywords:

**License Verification:**
- contractor license verification API
- CSLB license lookup API
- verify contractor license programmatically
- contractor license check API

**Business Verification:**
- secretary of state API
- business verification API
- KYB API developer
- verify business registration API

**Permits & Zoning:**
- building permit API
- permit lookup API
- zoning data API
- building permit data developer

**Court Records:**
- court records API
- litigation search API
- PACER API alternative
- lawsuit lookup API developer

Set each campaign to $5-10/day for the test period.
