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
