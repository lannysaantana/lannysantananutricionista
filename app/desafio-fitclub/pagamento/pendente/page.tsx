import type { Metadata } from "next";
import { ChallengePaymentPending } from "@/components/fitclub/PaymentPending";

export const metadata: Metadata = {
  title: "Pagamento em análise — Desafio Fit Club",
  robots: { index: false, follow: false },
};

export default function DesafioFitClubPendentePage() {
  return <ChallengePaymentPending />;
}
