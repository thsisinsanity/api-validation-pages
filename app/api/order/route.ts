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
