import { createClient } from "@/lib/supabase/client";
import type {
  Order,
  OrderInsert,
  OrderSession,
  OrderSessionInsert,
  PreConsultationForm,
  PreConsultationFormInsert,
} from "@/types/order";

const ORDERS_TABLE = "orders";
const SESSIONS_TABLE = "order_sessions";
const PRE_CONSULTATION_TABLE = "pre_consultation_forms";

export async function createOrder(input: OrderInsert): Promise<Order> {
  const supabase = createClient();
  const { data, error } = await supabase.from(ORDERS_TABLE).insert(input).select().single();
  if (error) throw new Error(`Falha ao criar pedido: ${error.message}`);
  return data as Order;
}

export async function createOrderSessions(
  sessions: OrderSessionInsert[]
): Promise<OrderSession[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from(SESSIONS_TABLE).insert(sessions).select();
  if (error) throw new Error(`Falha ao agendar sessões: ${error.message}`);
  return (data ?? []) as OrderSession[];
}

export async function listOrders(): Promise<Order[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(ORDERS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Falha ao carregar pedidos: ${error.message}`);
  return (data ?? []) as Order[];
}

export async function listOrderSessions(orderId: string): Promise<OrderSession[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(SESSIONS_TABLE)
    .select("*")
    .eq("order_id", orderId)
    .order("sequence", { ascending: true });
  if (error) throw new Error(`Falha ao carregar sessões: ${error.message}`);
  return (data ?? []) as OrderSession[];
}

export async function listAllSessionsGrouped(): Promise<Record<string, OrderSession[]>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(SESSIONS_TABLE)
    .select("*")
    .order("sequence", { ascending: true });
  if (error) throw new Error(`Falha ao carregar sessões: ${error.message}`);

  const grouped: Record<string, OrderSession[]> = {};
  for (const session of (data ?? []) as OrderSession[]) {
    grouped[session.order_id] ??= [];
    grouped[session.order_id]!.push(session);
  }
  return grouped;
}

export async function updateOrder(id: string, changes: Partial<Order>): Promise<Order> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(ORDERS_TABLE)
    .update(changes)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`Falha ao atualizar pedido: ${error.message}`);
  return data as Order;
}

export async function cancelOrder(id: string): Promise<Order> {
  return updateOrder(id, { status: "cancelled" });
}

export async function confirmOrderPayment(id: string): Promise<Order> {
  return updateOrder(id, { status: "confirmed", payment_status: "paid" });
}

export async function updateOrderSession(
  id: string,
  changes: Partial<OrderSession>
): Promise<OrderSession> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(SESSIONS_TABLE)
    .update(changes)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`Falha ao atualizar sessão: ${error.message}`);
  return data as OrderSession;
}

/** Reschedules a session — each session may only be rescheduled once. */
export async function rescheduleOrderSession(
  session: OrderSession,
  newDate: string,
  newTime: string
): Promise<OrderSession> {
  if (session.reschedule_count >= 1) {
    throw new Error("Esta sessão já utilizou seu reagendamento disponível.");
  }
  return updateOrderSession(session.id, {
    session_date: newDate,
    session_time: newTime,
    reschedule_count: session.reschedule_count + 1,
  });
}

export async function getBookedSessionTimes(date: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_booked_session_slots", { target_date: date });
  if (error) throw new Error(`Falha ao verificar horários ocupados: ${error.message}`);
  return (data ?? []).map((row) => row.session_time);
}

export async function submitPreConsultationForm(
  input: PreConsultationFormInsert
): Promise<PreConsultationForm> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(PRE_CONSULTATION_TABLE)
    .insert(input)
    .select()
    .single();
  if (error) throw new Error(`Falha ao enviar Pré-Consulta: ${error.message}`);
  return data as PreConsultationForm;
}

export async function getPreConsultationForm(
  orderId: string
): Promise<PreConsultationForm | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(PRE_CONSULTATION_TABLE)
    .select("*")
    .eq("order_id", orderId)
    .maybeSingle();
  if (error) throw new Error(`Falha ao carregar Pré-Consulta: ${error.message}`);
  return data as PreConsultationForm | null;
}
