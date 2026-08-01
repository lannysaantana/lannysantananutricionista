import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { challengeAnamneseSchema } from "@/utils/validators";

/**
 * Submits the Desafio Fit Club anamnese server-side. Same reason as
 * /api/pre-consulta: anon has no SELECT policy on `challenge_anamnese`
 * (health data stays private), so a client-side insert().select() would
 * fail RLS on the read-back half of INSERT ... RETURNING even though the
 * insert itself is allowed.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const signupId = body?.signupId;
  const parsed = challengeAnamneseSchema.safeParse(body?.responses);

  if (!signupId || typeof signupId !== "string" || !parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const r = parsed.data;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("challenge_anamnese")
    .insert({
      signup_id: signupId,
      age: r.age,
      weight_kg: r.weightKg,
      height_cm: r.heightCm,
      food_preferences: r.foodPreferences || null,
      food_aversions: r.foodAversions || null,
      allergies: r.allergies || null,
      meal_schedule: r.mealSchedule || null,
      breakfast: r.breakfast || null,
      morning_snack: r.morningSnack || null,
      lunch: r.lunch || null,
      afternoon_snack: r.afternoonSnack || null,
      dinner: r.dinner || null,
      training_frequency: r.trainingFrequency || null,
      training_time: r.trainingTime || null,
      medications_in_use: r.medicationsInUse || null,
      waist_cm: r.waistCm ?? null,
      hip_cm: r.hipCm ?? null,
      referred_by: r.referredBy || null,
    })
    .select()
    .single();

  if (error || !data) {
    console.error("[api/challenge/anamnese] Falha ao enviar anamnese:", error);
    return NextResponse.json({ error: "Falha ao enviar anamnese" }, { status: 500 });
  }

  return NextResponse.json(data);
}
