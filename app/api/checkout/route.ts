import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/config";

/**
 * Creates a Mercado Pago Checkout Pro preference for an existing order and
 * returns the hosted checkout URL. Runs server-side only — MERCADOPAGO_ACCESS_TOKEN
 * must never reach the browser bundle.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const orderId = body?.orderId;

  if (!orderId || typeof orderId !== "string") {
    return NextResponse.json({ error: "orderId é obrigatório" }, { status: 400 });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "Pagamento não configurado. Defina MERCADOPAGO_ACCESS_TOKEN." },
      { status: 500 }
    );
  }

  const supabase = createAdminClient();
  const { data: order, error } = await supabase
    .from("orders")
    .select("id, amount_cents, service_plan_key")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
  }

  const { data: plan } = await supabase
    .from("service_plans")
    .select("name")
    .eq("key", order.service_plan_key)
    .maybeSingle();

  const planName = plan?.name ?? "Atendimento";

  const isPublicSite = SITE_URL.startsWith("https://");

  const preference = {
    items: [
      {
        title: planName,
        quantity: 1,
        unit_price: Number((order.amount_cents / 100).toFixed(2)),
        currency_id: "BRL",
      },
    ],
    external_reference: order.id,
    back_urls: {
      success: `${SITE_URL}/pagamento/sucesso?order_id=${order.id}`,
      failure: `${SITE_URL}/pagamento/erro?order_id=${order.id}`,
      pending: `${SITE_URL}/pagamento/pendente?order_id=${order.id}`,
    },
    ...(isPublicSite ? { auto_return: "approved" as const } : {}),
    notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
  };

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(preference),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[checkout] Mercado Pago preference error:", detail);
    return NextResponse.json({ error: "Falha ao criar checkout" }, { status: 502 });
  }

  const data = await response.json();
  const url = data.init_point ?? data.sandbox_init_point;

  if (!url) {
    return NextResponse.json({ error: "Checkout sem URL de retorno" }, { status: 502 });
  }

  return NextResponse.json({ url });
}
