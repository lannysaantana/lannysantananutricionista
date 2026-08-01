import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/config";

/**
 * Creates a Mercado Pago Checkout Pro preference for an existing challenge
 * signup and returns the hosted checkout URL. Runs server-side only —
 * MERCADOPAGO_ACCESS_TOKEN must never reach the browser bundle.
 *
 * external_reference is prefixed with "fitclub:" so the shared webhook
 * handler (app/api/webhooks/mercadopago/route.ts) knows to update
 * `challenge_signups` instead of `orders`.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const signupId = body?.signupId;

  if (!signupId || typeof signupId !== "string") {
    return NextResponse.json({ error: "signupId é obrigatório" }, { status: 400 });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "Pagamento não configurado. Defina MERCADOPAGO_ACCESS_TOKEN." },
      { status: 500 }
    );
  }

  const supabase = createAdminClient();
  const { data: signup, error } = await supabase
    .from("challenge_signups")
    .select("id, amount_cents")
    .eq("id", signupId)
    .single();

  if (error || !signup) {
    return NextResponse.json({ error: "Inscrição não encontrada" }, { status: 404 });
  }

  const isPublicSite = SITE_URL.startsWith("https://");

  const preference = {
    items: [
      {
        title: "Desafio Fit Club — 21 Dias",
        quantity: 1,
        unit_price: Number((signup.amount_cents / 100).toFixed(2)),
        currency_id: "BRL",
      },
    ],
    external_reference: `fitclub:${signup.id}`,
    back_urls: {
      success: `${SITE_URL}/desafio-fitclub/pagamento/sucesso?signup_id=${signup.id}`,
      failure: `${SITE_URL}/desafio-fitclub/pagamento/erro?signup_id=${signup.id}`,
      pending: `${SITE_URL}/desafio-fitclub/pagamento/pendente?signup_id=${signup.id}`,
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
    console.error("[challenge/checkout] Mercado Pago preference error:", detail);
    return NextResponse.json({ error: "Falha ao criar checkout" }, { status: 502 });
  }

  const data = await response.json();
  const url = data.init_point ?? data.sandbox_init_point;

  if (!url) {
    return NextResponse.json({ error: "Checkout sem URL de retorno" }, { status: 502 });
  }

  return NextResponse.json({ url });
}
