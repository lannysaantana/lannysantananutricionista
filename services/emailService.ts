import type { Order, OrderSession } from "@/types/order";
import { formatDateLong } from "@/utils/formatters";

/**
 * Transactional email via Resend.
 * Docs: https://resend.com/docs
 * Requires RESEND_API_KEY (server-side only).
 */
export async function sendOrderConfirmationEmail(
  order: Order,
  firstSession: OrderSession
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(
      "[emailService] RESEND_API_KEY not set — skipping confirmation email for",
      order.id
    );
    return;
  }

  const subject = "Sua consulta com Lanny Santana foi confirmada";
  const body = `Olá ${order.name}, sua primeira sessão (${firstSession.label}) está agendada para ${formatDateLong(
    firstSession.session_date
  )} às ${firstSession.session_time}.`;

  // TODO: POST https://api.resend.com/emails with RESEND_FROM_EMAIL as sender.
  void subject;
  void body;
}
