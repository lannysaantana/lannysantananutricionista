import { createClient } from "@/lib/supabase/client";
import type { ServicePlan, ServicePlanUpdate, PaymentSettings, ServicePlanKey } from "@/types/order";

export async function listServicePlans(activeOnly = false): Promise<ServicePlan[]> {
  const supabase = createClient();
  let query = supabase.from("service_plans").select("*").order("sort_order", { ascending: true });
  if (activeOnly) query = query.eq("is_active", true);

  const { data, error } = await query;
  if (error) throw new Error(`Falha ao carregar planos: ${error.message}`);
  return (data ?? []) as ServicePlan[];
}

export async function getServicePlan(key: ServicePlanKey): Promise<ServicePlan | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("service_plans")
    .select("*")
    .eq("key", key)
    .maybeSingle();
  if (error) throw new Error(`Falha ao carregar plano: ${error.message}`);
  return data as ServicePlan | null;
}

export async function updateServicePlan(row: ServicePlanUpdate): Promise<ServicePlan> {
  const supabase = createClient();
  const { key, ...changes } = row;
  const { data, error } = await supabase
    .from("service_plans")
    .update(changes)
    .eq("key", key)
    .select()
    .single();
  if (error) throw new Error(`Falha ao salvar plano: ${error.message}`);
  return data as ServicePlan;
}

export async function getPaymentSettings(): Promise<PaymentSettings> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("payment_settings")
    .select("*")
    .eq("id", true)
    .single();
  if (error) throw new Error(`Falha ao carregar configuração de pagamento: ${error.message}`);
  return data as PaymentSettings;
}

export async function updateCardSurcharge(percent: number): Promise<PaymentSettings> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("payment_settings")
    .update({ card_surcharge_percent: percent })
    .eq("id", true)
    .select()
    .single();
  if (error) throw new Error(`Falha ao salvar acréscimo do cartão: ${error.message}`);
  return data as PaymentSettings;
}

/** True if this e-mail already has a previous order — hides new-patient promos. */
export async function hasPreviousOrder(email: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("has_previous_order", { patient_email: email });
  if (error) throw new Error(`Falha ao verificar histórico do paciente: ${error.message}`);
  return Boolean(data);
}
