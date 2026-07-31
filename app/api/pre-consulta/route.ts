import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { sendPreConsultationNotificationEmail } from "@/services/emailService";
import type { Order, PreConsultationFormInsert } from "@/types/order";

/**
 * Submits the Pré-Consulta form server-side. Same reason as
 * app/api/orders/route.ts: anon has no SELECT policy on
 * pre_consultation_forms (patient health data stays private), so a
 * client-side `.insert().select()` fails RLS on the read-back half of
 * INSERT ... RETURNING even though the insert itself is allowed.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const input = body as PreConsultationFormInsert | null;

  if (!input?.order_id || !input?.responses) {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("pre_consultation_forms")
    .insert(input)
    .select()
    .single();

  if (error || !data) {
    console.error("[api/pre-consulta] Falha ao enviar Pré-Consulta:", error);
    return NextResponse.json({ error: "Falha ao enviar Pré-Consulta" }, { status: 500 });
  }

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", input.order_id)
    .single();

  if (order) {
    await sendPreConsultationNotificationEmail(order as Order, input.responses);
  }

  return NextResponse.json(data);
}
