import type { Appointment } from "@/types/appointment";
import { formatDateLong } from "@/utils/formatters";

/**
 * WhatsApp Business Cloud API skeleton.
 * Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
 * Requires WHATSAPP_API_TOKEN and WHATSAPP_PHONE_NUMBER_ID (server-side only).
 */
export async function sendAppointmentConfirmationWhatsApp(
  appointment: Appointment
): Promise<void> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.info(
      "[whatsappService] Integration not configured — skipping WhatsApp notification for",
      appointment.id
    );
    return;
  }

  const message = `Olá ${appointment.name}! Sua consulta foi confirmada para ${formatDateLong(
    appointment.appointment_date
  )} às ${appointment.appointment_time}. Em breve entraremos em contato com mais detalhes. 🌿`;

  // TODO: call https://graph.facebook.com/v20.0/{phoneNumberId}/messages
  // with the Bearer token above.
  void message;
}
