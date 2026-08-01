import { z } from "zod";

/** Per-step schemas used by the booking wizard (one question per screen). */

export const nameSchema = z
  .string()
  .trim()
  .min(3, "Digite seu nome completo")
  .max(100, "Nome muito longo");

export const ageSchema = z
  .number({ invalid_type_error: "Digite uma idade válida" })
  .int()
  .min(12, "Idade mínima de 12 anos")
  .max(110, "Digite uma idade válida");

export const phoneSchema = z
  .string()
  .trim()
  .min(14, "Digite um telefone válido com DDD")
  .max(16, "Digite um telefone válido");

export const emailSchema = z
  .string()
  .trim()
  .email("Digite um e-mail válido");

export const objectiveSchema = z.enum([
  "emagrecimento",
  "hipertrofia",
  "performance",
  "reeducacao_alimentar",
  "saude_intestinal",
  "gestacao",
  "outro",
]);

export const consultationTypeSchema = z.enum(["presencial", "teleconsulta"]);

export const sexSchema = z.enum(["feminino", "masculino", "prefiro_nao_informar"]);

export const birthDateSchema = z
  .string()
  .min(1, "Selecione sua data de nascimento")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return false;
    const ageInYears = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    return ageInYears >= 12 && ageInYears <= 110;
  }, "Digite uma data de nascimento válida");

export const citySchema = z.string().trim().min(2, "Digite sua cidade");
export const stateSchema = z.string().trim().length(2, "Selecione o estado");
export const professionSchema = z.string().trim().min(2, "Digite sua profissão");

export const heightCmSchema = z
  .number({ invalid_type_error: "Digite uma altura válida" })
  .min(100, "Digite uma altura válida")
  .max(230, "Digite uma altura válida");

export const weightKgSchema = z
  .number({ invalid_type_error: "Digite um peso válido" })
  .min(30, "Digite um peso válido")
  .max(300, "Digite um peso válido");

/** Per-step schema groups — the new intake steps collect several fields per screen. */
export const dadosPessoaisSchema = z.object({
  name: nameSchema,
  birthDate: birthDateSchema,
  sex: sexSchema,
});

export const contatoSchema = z.object({
  phone: phoneSchema,
  whatsapp: phoneSchema,
  email: emailSchema,
});

export const localizacaoSchema = z.object({
  city: citySchema,
  state: stateSchema,
  profession: professionSchema,
});

export const saudeSchema = z
  .object({
    heightCm: heightCmSchema,
    weightKg: weightKgSchema,
    medicationsInUse: z.string().trim().optional().default(""),
    usesGlp1: z.boolean(),
    glp1Medication: z.string().trim().optional().default(""),
    hasPhysicalLimitation: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.usesGlp1 && data.glp1Medication.trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["glp1Medication"],
        message: "Digite qual medicamento você utiliza",
      });
    }
  });

export const bookingSummarySchema = z.object({
  name: nameSchema,
  age: ageSchema,
  phone: phoneSchema,
  email: emailSchema,
  objective: objectiveSchema,
  hasLimitation: z.boolean(),
  consultationType: consultationTypeSchema,
  selectedDate: z.string().min(1, "Selecione uma data"),
  selectedSlot: z.object({
    id: z.string(),
    date: z.string(),
    time: z.string(),
    available: z.boolean(),
  }),
});

export type BookingSummaryInput = z.infer<typeof bookingSummarySchema>;

/** Desafio Fit Club — signup form (name, whatsapp, email, objective). */
export const challengeObjectiveSchema = z.enum(["emagrecimento", "hipertrofia"]);

export const challengeSignupSchema = z.object({
  name: nameSchema,
  whatsapp: phoneSchema,
  email: emailSchema,
  objective: challengeObjectiveSchema,
  couponCode: z.string().trim().optional().default(""),
});

export type ChallengeSignupInput = z.infer<typeof challengeSignupSchema>;

/** Desafio Fit Club — anamnese preenchida após o pagamento confirmado. */
export const challengeAnamneseSchema = z.object({
  age: z
    .number({ invalid_type_error: "Digite uma idade válida" })
    .int()
    .min(12, "Idade mínima de 12 anos")
    .max(100, "Digite uma idade válida"),
  weightKg: z
    .number({ invalid_type_error: "Digite um peso válido" })
    .min(30, "Digite um peso válido")
    .max(300, "Digite um peso válido"),
  heightCm: z
    .number({ invalid_type_error: "Digite uma altura válida" })
    .min(100, "Digite uma altura válida")
    .max(230, "Digite uma altura válida"),
  foodPreferences: z.string().trim().optional().default(""),
  foodAversions: z.string().trim().optional().default(""),
  allergies: z.string().trim().optional().default(""),
  mealSchedule: z.string().trim().optional().default(""),
  breakfast: z.string().trim().optional().default(""),
  morningSnack: z.string().trim().optional().default(""),
  lunch: z.string().trim().optional().default(""),
  afternoonSnack: z.string().trim().optional().default(""),
  dinner: z.string().trim().optional().default(""),
  trainingFrequency: z.string().trim().optional().default(""),
  trainingTime: z.string().trim().optional().default(""),
  medicationsInUse: z.string().trim().optional().default(""),
  waistCm: z.number().optional(),
  hipCm: z.number().optional(),
  referredBy: z.string().trim().optional().default(""),
});

export type ChallengeAnamneseInput = z.infer<typeof challengeAnamneseSchema>;
