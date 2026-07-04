import type { Metadata } from "next";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Agendar Consulta",
  description: "Agende sua consulta com a nutricionista Lanny Santana em poucos passos.",
};

export default function AgendarPage() {
  return <BookingWizard />;
}
