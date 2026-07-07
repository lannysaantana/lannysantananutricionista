import type { Metadata } from "next";
import { PaymentPending } from "@/components/booking/PaymentPending";

export const metadata: Metadata = {
  title: "Pagamento em análise",
  robots: { index: false, follow: false },
};

export default function PagamentoPendentePage() {
  return <PaymentPending />;
}
