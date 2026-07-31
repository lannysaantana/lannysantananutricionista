import type { Order, OrderSession, PreConsultationResponses } from "@/types/order";
import { PRE_CONSULTATION_LABELS } from "@/types/order";
import { formatCurrencyBRL, formatDateLong } from "@/utils/formatters";

/** Where booking + Pré-Consulta notifications land — Lanny's own inbox, not the patient's. */
const ADMIN_EMAIL = "hedlannysantana@gmail.com";

/**
 * Transactional email via Resend. Requires RESEND_API_KEY and
 * RESEND_FROM_EMAIL (server-side only) — silently no-ops without them so
 * local/dev environments don't need a Resend account configured.
 */
async function sendEmail(subject: string, html: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.info("[emailService] RESEND_API_KEY/RESEND_FROM_EMAIL not set — skipping email:", subject);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [ADMIN_EMAIL], subject, html }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("[emailService] Falha ao enviar e-mail:", detail);
  }
}

/** Notifies Lanny by e-mail whenever an order is confirmed as paid. */
export async function sendOrderConfirmationEmail(
  order: Order,
  sessions: OrderSession[]
): Promise<void> {
  const sessionsHtml = sessions
    .map(
      (s) =>
        `<li>${s.label} — ${formatDateLong(s.session_date)} às ${s.session_time.slice(0, 5)}</li>`
    )
    .join("");

  const html = `
    <h2>Novo agendamento confirmado</h2>
    <p><strong>Paciente:</strong> ${order.name}</p>
    <p><strong>E-mail:</strong> ${order.email}</p>
    <p><strong>Telefone:</strong> ${order.phone}</p>
    <p><strong>WhatsApp:</strong> ${order.whatsapp ?? "—"}</p>
    <p><strong>Plano:</strong> ${order.service_plan_key}</p>
    <p><strong>Valor pago:</strong> ${formatCurrencyBRL(order.amount_cents)}</p>
    <p><strong>Forma de pagamento:</strong> ${order.payment_method}</p>
    <p><strong>Sessões agendadas:</strong></p>
    <ul>${sessionsHtml}</ul>
  `;

  await sendEmail(`Novo agendamento confirmado — ${order.name}`, html);
}

/** Notifies Lanny by e-mail whenever a patient submits the Pré-Consulta form. */
export async function sendPreConsultationNotificationEmail(
  order: Order,
  responses: PreConsultationResponses
): Promise<void> {
  const rows = (Object.keys(PRE_CONSULTATION_LABELS) as (keyof PreConsultationResponses)[])
    .map(
      (key) =>
        `<p><strong>${PRE_CONSULTATION_LABELS[key]}:</strong><br>${responses[key] || "—"}</p>`
    )
    .join("");

  const html = `
    <h2>Pré-Consulta recebida</h2>
    <p><strong>Paciente:</strong> ${order.name} (${order.email})</p>
    <hr />
    ${rows}
  `;

  await sendEmail(`Pré-Consulta recebida — ${order.name}`, html);
}
