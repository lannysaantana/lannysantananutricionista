/** Central place for brand/business constants used across the app. */

export const SITE_NAME = "Lanny Santana Nutricionista";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_DESCRIPTION =
  "Nutrição baseada em ciência, estratégia e acompanhamento personalizado. Teleconsulta com plano alimentar 100% individualizado.";

export const BUSINESS_WHATSAPP = process.env.WHATSAPP_BUSINESS_NUMBER ?? "5500000000000";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Gostaria de tirar uma dúvida sobre as consultas.";

// TODO: e-mail e Instagram ainda são placeholders — substitua pelos reais
// quando disponíveis. Endereço completo será enviado por WhatsApp após a
// aprovação da consulta, por isso mostramos apenas o bairro por enquanto.
export const BUSINESS_INFO = {
  crn: "CRN 50871",
  email: "contato@lannysantana.com.br",
  instagramHandle: "@lannysantana.nutri",
  instagramUrl: "https://instagram.com/lannysantana.nutri",
  city: "João Pessoa",
  state: "PB",
  addressLine: "Manaíra",
} as const;

// ---- Desafio Fit Club (21 dias) -------------------------------------------
export const CHALLENGE_PRICE_CENTS = 11990;
export const CHALLENGE_START_DATE_LABEL = "segunda-feira, 03 de agosto";
export const CHALLENGE_PROOF_WHATSAPP = "83982025003";
export const CHALLENGE_ANAMNESE_DEADLINE_LABEL = "domingo, dia 02 às 12h";

/** Coupon for participants of the previous edition — validated server-side in /api/challenge/signups. */
export const CHALLENGE_DIVA_COUPON_CODE = "DIVA";
export const CHALLENGE_DIVA_PRICE_CENTS = 7990;

export const BRAND_COLORS = {
  sage: "#7A8574",
  sageDark: "#5E685A",
  offwhite: "#F7F4ED",
  beige: "#EFE8DD",
  gold: "#C9AF73",
  ink: "#2D2D2D",
} as const;
