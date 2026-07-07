import type { Order, OrderSession } from "@/types/order";
import { formatDateLong } from "@/utils/formatters";

/**
 * WhatsApp Business Cloud API skeleton.
 * Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
 * Requires WHATSAPP_API_TOKEN and WHATSAPP_PHONE_NUMBER_ID (server-side only).
 */
export async function sendOrderConfirmationWhatsApp(
  order: Order,
  firstSession: OrderSession
): Promise<void> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.info(
      "[whatsappService] Integration not configured — skipping WhatsApp notification for",
      order.id
    );
    return;
  }

  const message = `Olá ${order.name}! Sua primeira sessão (${firstSession.label}) foi confirmada para ${formatDateLong(
    firstSession.session_date
  )} às ${firstSession.session_time}. Em breve entraremos em contato com mais detalhes. 🌿`;

  // TODO: call https://graph.facebook.com/v20.0/{phoneNumberId}/messages
  // with the Bearer token above.
  void message;
}
