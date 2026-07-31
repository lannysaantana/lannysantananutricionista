export type ChallengeObjective = "emagrecimento" | "hipertrofia";
export type ChallengePaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type ChallengeSignup = {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  objective: ChallengeObjective;
  amount_cents: number;
  coupon_code: string | null;
  payment_status: ChallengePaymentStatus;
  created_at: string;
  updated_at: string;
};

export type ChallengeSignupInsert = Pick<ChallengeSignup, "name" | "whatsapp" | "email" | "objective"> &
  Partial<Pick<ChallengeSignup, "amount_cents" | "coupon_code">>;

export type ChallengeAnamnese = {
  id: string;
  signup_id: string;
  age: number;
  weight_kg: number;
  height_cm: number;
  food_preferences: string | null;
  food_aversions: string | null;
  allergies: string | null;
  meal_schedule: string | null;
  breakfast: string | null;
  morning_snack: string | null;
  lunch: string | null;
  afternoon_snack: string | null;
  dinner: string | null;
  training_frequency: string | null;
  training_time: string | null;
  medications_in_use: string | null;
  waist_cm: number | null;
  hip_cm: number | null;
  referred_by: string | null;
  created_at: string;
};

export type ChallengeAnamneseInsert = Pick<ChallengeAnamnese, "signup_id" | "age" | "weight_kg" | "height_cm"> &
  Partial<
    Pick<
      ChallengeAnamnese,
      | "food_preferences"
      | "food_aversions"
      | "allergies"
      | "meal_schedule"
      | "breakfast"
      | "morning_snack"
      | "lunch"
      | "afternoon_snack"
      | "dinner"
      | "training_frequency"
      | "training_time"
      | "medications_in_use"
      | "waist_cm"
      | "hip_cm"
      | "referred_by"
    >
  >;
