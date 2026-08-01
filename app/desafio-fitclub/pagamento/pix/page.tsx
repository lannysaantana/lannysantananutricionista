import type { Metadata } from "next";
import { Suspense } from "react";
import { ChallengePaymentPix } from "@/components/fitclub/PaymentPix";

export const metadata: Metadata = {
  title: "Pagamento via Pix — Desafio Fit Club",
  robots: { index: false, follow: false },
};

export default function DesafioFitClubPixPage() {
  return (
    <Suspense>
      <ChallengePaymentPix />
    </Suspense>
  );
}
