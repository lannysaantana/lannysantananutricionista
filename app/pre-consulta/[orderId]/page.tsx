import type { Metadata } from "next";
import { PreConsultationForm } from "@/components/pre-consulta/PreConsultationForm";

export const metadata: Metadata = {
  title: "Pré-Consulta",
  robots: { index: false, follow: false },
};

export default async function PreConsultaPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <main className="min-h-screen bg-noise px-5 py-12 sm:py-16">
      <PreConsultationForm orderId={orderId} />
    </main>
  );
}
