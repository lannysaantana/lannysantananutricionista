import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import type { OrderInsert, OrderSessionInsert } from "@/types/order";

/**
 * Creates an order + its sessions server-side. Runs with the service role
 * because anon has no SELECT policy on `orders` (patient PII stays private) —
 * a plain client-side `.insert().select()` fails RLS on the read-back half
 * of the INSERT ... RETURNING, even though the insert itself is allowed.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const order = body?.order as OrderInsert | undefined;
  const sessions = body?.sessions as Omit<OrderSessionInsert, "order_id">[] | undefined;

  if (!order || !Array.isArray(sessions)) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: createdOrder, error: orderError } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();

  if (orderError || !createdOrder) {
    console.error("[api/orders] Falha ao criar pedido:", orderError);
    return NextResponse.json({ error: "Falha ao criar pedido" }, { status: 500 });
  }

  const sessionsPayload: OrderSessionInsert[] = sessions.map((s) => ({
    ...s,
    order_id: createdOrder.id,
  }));

  const { error: sessionsError } = await supabase.from("order_sessions").insert(sessionsPayload);

  if (sessionsError) {
    console.error("[api/orders] Falha ao agendar sessões:", sessionsError);
    return NextResponse.json({ error: "Falha ao agendar as sessões" }, { status: 500 });
  }

  return NextResponse.json({ id: createdOrder.id, amount_cents: createdOrder.amount_cents });
}
