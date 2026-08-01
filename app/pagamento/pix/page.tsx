import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentPix } from "@/components/booking/PaymentPix";

export const metadata: Metadata = {
  title: "Pagamento via Pix",
  robots: { index: false, follow: false },
};

export default function PagamentoPixPage() {
  return (
    <Suspense>
      <PaymentPix />
    </Suspense>
  );
}
