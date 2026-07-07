import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentSuccess } from "@/components/booking/PaymentSuccess";

export const metadata: Metadata = {
  title: "Pagamento confirmado",
  robots: { index: false, follow: false },
};

export default function PagamentoSucessoPage() {
  return (
    <Suspense>
      <PaymentSuccess />
    </Suspense>
  );
}
