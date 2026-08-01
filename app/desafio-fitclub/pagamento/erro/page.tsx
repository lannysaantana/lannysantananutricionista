import type { Metadata } from "next";
import { ChallengePaymentError } from "@/components/fitclub/PaymentError";

export const metadata: Metadata = {
  title: "Pagamento não confirmado — Desafio Fit Club",
  robots: { index: false, follow: false },
};

export default function DesafioFitClubErroPage() {
  return <ChallengePaymentError />;
}
