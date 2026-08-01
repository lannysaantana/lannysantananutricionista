import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { challengeSignupSchema } from "@/utils/validators";
import { CHALLENGE_PRICE_CENTS, CHALLENGE_DIVA_COUPON_CODE, CHALLENGE_DIVA_PRICE_CENTS } from "@/lib/config";

/**
 * Creates a Desafio Fit Club signup server-side, same reasoning as
 * /api/orders: anon has no SELECT policy on `challenge_signups` (PII stays
 * private), so a plain client-side insert().select() would fail RLS on the
 * read-back half of the INSERT ... RETURNING even though the insert itself
 * is allowed. The price (and any coupon discount) is resolved here, never
 * trusted from the client.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = challengeSignupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const { couponCode, ...signupFields } = parsed.data;
  const normalizedCoupon = couponCode.trim().toUpperCase();
  const isDivaCoupon = normalizedCoupon === CHALLENGE_DIVA_COUPON_CODE;

  const supabase = createAdminClient();
  const { data: signup, error } = await supabase
    .from("challenge_signups")
    .insert({
      ...signupFields,
      amount_cents: isDivaCoupon ? CHALLENGE_DIVA_PRICE_CENTS : CHALLENGE_PRICE_CENTS,
      coupon_code: isDivaCoupon ? CHALLENGE_DIVA_COUPON_CODE : null,
    })
    .select()
    .single();

  if (error || !signup) {
    console.error("[api/challenge/signups] Falha ao criar inscrição:", error);
    return NextResponse.json({ error: "Falha ao criar inscrição" }, { status: 500 });
  }

  return NextResponse.json({ id: signup.id });
}
