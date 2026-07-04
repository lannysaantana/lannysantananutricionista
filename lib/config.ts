/** Central place for brand/business constants used across the app. */

export const SITE_NAME = "Lanny Santana Nutricionista";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_DESCRIPTION =
  "Nutrição personalizada para transformar sua saúde. Consultas presenciais e teleconsulta com plano alimentar 100% individualizado.";

export const CONSULTATION_PRICE_CENTS = 25000; // R$ 250,00 — adjust as needed

export const BUSINESS_WHATSAPP = process.env.WHATSAPP_BUSINESS_NUMBER ?? "5500000000000";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Gostaria de tirar uma dúvida sobre as consultas.";

// TODO: replace these placeholders with the real business details before
// launch — intentionally left as obvious placeholders rather than
// fabricated real-looking data (CRN, address, reviews, etc).
export const BUSINESS_INFO = {
  crn: "CRN-0 00000/P", // TODO: número de registro profissional real
  email: "contato@lannysantana.com.br",
  instagramHandle: "@lannysantana.nutri",
  instagramUrl: "https://instagram.com/lannysantana.nutri",
  city: "Sua cidade",
  state: "UF",
  addressLine: "Endereço do consultório a definir",
} as const;

export const SERVICE_PLANS = [
  {
    key: "presencial",
    name: "Consulta Presencial",
    priceCents: 35000,
    highlight: false,
    features: [
      "Consulta Inicial (60 min)",
      "Avaliação Física após aproximadamente 20 dias (30 min)",
      "Segunda Consulta (benefício do primeiro atendimento)",
    ],
    ctaLabel: "Agendar",
  },
  {
    key: "teleconsulta",
    name: "Teleconsulta",
    priceCents: 30000,
    highlight: false,
    features: [
      "Consulta Online",
      "Bioimpedância Online",
      "Retorno de 30 minutos",
      "Segunda Consulta com valor promocional para o primeiro atendimento",
    ],
    ctaLabel: "Agendar",
  },
  {
    key: "protocolo-trimestral",
    name: "Protocolo Trimestral Premium",
    priceCents: 90000,
    highlight: true,
    badge: "Mais escolhido",
    features: [
      "3 Consultas",
      "Suporte Online",
      "Avaliações Físicas",
      "Plataforma de Desafios",
      "Melhor custo-benefício",
    ],
    ctaLabel: "Quero esse",
  },
] as const;

export const BRAND_COLORS = {
  sage: "#7A8574",
  sageDark: "#5E685A",
  offwhite: "#F7F4ED",
  beige: "#EFE8DD",
  gold: "#C9AF73",
  ink: "#2D2D2D",
} as const;
