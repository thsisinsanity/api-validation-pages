// lib/pricing.ts
// Single source of truth for the report price.
// Display copy across app/ and content/ is kept in sync by grep checks in CI-less
// verification steps — if you change the price here, sweep for the old literal.

export const PRICE_DOLLARS = 25;
export const PRICE_CENTS = 2500; // price in cents
export const PRICE_DISPLAY = "$25";
export const PRODUCT_NAME = "CheckLicensed Contractor Verification Report";

// Existing PayPal payment link (amount is configured in PayPal's dashboard —
// it MUST match PRICE_DOLLARS; see ADAM-GO-LIVE-CHECKLIST.md).
export const PAYPAL_CHECKOUT_URL = "https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW";
