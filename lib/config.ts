/** Central place for brand/business constants used across the app. */

export const SITE_NAME = "Lanny Santana Nutricionista";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_DESCRIPTION =
  "Nutrição personalizada para transformar sua saúde. Consultas presenciais e teleconsulta com plano alimentar 100% individualizado.";

export const CONSULTATION_PRICE_CENTS = 25000; // R$ 250,00 — adjust as needed

export const BUSINESS_WHATSAPP = process.env.WHATSAPP_BUSINESS_NUMBER ?? "5500000000000";

export const BRAND_COLORS = {
  sage: "#7A8574",
  sageDark: "#5E685A",
  offwhite: "#F7F4ED",
  beige: "#EFE8DD",
  gold: "#C9AF73",
  ink: "#2D2D2D",
} as const;
