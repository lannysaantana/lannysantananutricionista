import type { Metadata } from "next";
import { PaymentSuccess } from "@/components/booking/PaymentSuccess";

export const metadata: Metadata = {
  title: "Pagamento confirmado",
  robots: { index: false, follow: false },
};

export default function PagamentoSucessoPage() {
  return <PaymentSuccess />;
}
