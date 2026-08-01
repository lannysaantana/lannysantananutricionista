import { createClient } from "@/lib/supabase/client";
import type { ChallengeSignup, ChallengeAnamnese } from "@/types/challenge";

const SIGNUPS_TABLE = "challenge_signups";
const ANAMNESE_TABLE = "challenge_anamnese";

// Signup/anamnese creation for the public challenge flow goes through
// app/api/challenge/* (service role) — anon has no SELECT policy on either
// table, so a client-side insert().select() fails RLS on the read-back half
// of INSERT ... RETURNING even though the insert itself is allowed.

export async function listChallengeSignups(): Promise<ChallengeSignup[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(SIGNUPS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Falha ao carregar inscrições: ${error.message}`);
  return (data ?? []) as ChallengeSignup[];
}

export async function listChallengeAnamneseGrouped(): Promise<Record<string, ChallengeAnamnese>> {
  const supabase = createClient();
  const { data, error } = await supabase.from(ANAMNESE_TABLE).select("*");
  if (error) throw new Error(`Falha ao carregar anamneses: ${error.message}`);

  const grouped: Record<string, ChallengeAnamnese> = {};
  for (const form of (data ?? []) as ChallengeAnamnese[]) {
    grouped[form.signup_id] = form;
  }
  return grouped;
}

export async function updateChallengeSignup(
  id: string,
  changes: Partial<ChallengeSignup>
): Promise<ChallengeSignup> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(SIGNUPS_TABLE)
    .update(changes)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(`Falha ao atualizar inscrição: ${error.message}`);
  return data as ChallengeSignup;
}
