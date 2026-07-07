import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import type { OrderStatus } from "@/types/order";

type OrderPaymentStatus = "pending" | "paid" | "failed" | "refunded";

/**
 * Mercado Pago sends a notification whenever a payment changes state. We
 * never trust the notification body for the amount/status — we re-fetch the
 * payment from Mercado Pago's API using our own access token before writing
 * anything to the database.
 */
async function handleNotification(request: Request) {
  const url = new URL(request.url);

  let body: { type?: string; data?: { id?: string } } | null = null;
  try {
    body = await request.json();
  } catch {
    // Legacy IPN notifications arrive as query params only, no JSON body.
  }

  const type = body?.type ?? url.searchParams.get("type");
  const paymentId = body?.data?.id ?? url.searchParams.get("data.id") ?? url.searchParams.get("id");

  if (type !== "payment" || !paymentId) {
    return NextResponse.json({ received: true });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json({ received: true });
  }

  const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!paymentRes.ok) {
    return NextResponse.json({ received: true });
  }

  const payment = await paymentRes.json();
  const orderId: string | undefined = payment.external_reference;
  if (!orderId) return NextResponse.json({ received: true });

  const paymentStatus: OrderPaymentStatus =
    payment.status === "approved"
      ? "paid"
      : payment.status === "refunded" || payment.status === "charged_back"
        ? "refunded"
        : payment.status === "rejected" || payment.status === "cancelled"
          ? "failed"
          : "pending";

  const changes: { payment_status: OrderPaymentStatus; status?: OrderStatus } = {
    payment_status: paymentStatus,
  };
  if (paymentStatus === "paid") changes.status = "confirmed";

  const supabase = createAdminClient();
  await supabase.from("orders").update(changes).eq("id", orderId);

  return NextResponse.json({ received: true });
}

export async function POST(request: Request) {
  return handleNotification(request);
}

export async function GET(request: Request) {
  return handleNotification(request);
}
