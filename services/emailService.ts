import type { Appointment } from "@/types/appointment";
import { formatDateLong } from "@/utils/formatters";

/**
 * Transactional email via Resend.
 * Docs: https://resend.com/docs
 * Requires RESEND_API_KEY (server-side only).
 */
export async function sendAppointmentConfirmationEmail(
  appointment: Appointment
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(
      "[emailService] RESEND_API_KEY not set — skipping confirmation email for",
      appointment.id
    );
    return;
  }

  const subject = "Sua consulta com Lanny Santana foi confirmada";
  const body = `Olá ${appointment.name}, sua consulta está agendada para ${formatDateLong(
    appointment.appointment_date
  )} às ${appointment.appointment_time}.`;

  // TODO: POST https://api.resend.com/emails with RESEND_FROM_EMAIL as sender.
  void subject;
  void body;
}
