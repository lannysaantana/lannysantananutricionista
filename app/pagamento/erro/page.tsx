import type { Metadata } from "next";
import { PaymentError } from "@/components/booking/PaymentError";

export const metadata: Metadata = {
  title: "Pagamento não aprovado",
  robots: { index: false, follow: false },
};

export default function PagamentoErroPage() {
  return <PaymentError />;
}
