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
