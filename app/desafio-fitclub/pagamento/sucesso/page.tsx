import type { Metadata } from "next";
import { Suspense } from "react";
import { ChallengePaymentSuccess } from "@/components/fitclub/PaymentSuccess";

export const metadata: Metadata = {
  title: "Pagamento confirmado — Desafio Fit Club",
  robots: { index: false, follow: false },
};

export default function DesafioFitClubSucessoPage() {
  return (
    <Suspense>
      <ChallengePaymentSuccess />
    </Suspense>
  );
}
