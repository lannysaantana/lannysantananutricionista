import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { BUSINESS_INFO } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de Cancelamento",
  robots: { index: false, follow: false },
};

export default function PoliticaDeCancelamentoPage() {
  return (
    <LegalPageLayout title="Política de Cancelamento" updatedAt="a definir">
      <p className="mb-6 rounded-xl border border-gold/30 bg-gold/10 p-4 text-xs">
        Modelo padrão fornecido como ponto de partida — ajuste os prazos e
        condições reais e recomenda-se revisão jurídica antes da publicação.
      </p>

      <h2>1. Reagendamento</h2>
      <p>
        Você pode reagendar sua consulta entrando em contato pelo WhatsApp com
        pelo menos 24 horas de antecedência, sujeito à disponibilidade de
        novos horários.
      </p>

      <h2>2. Cancelamento</h2>
      <p>
        Cancelamentos solicitados com menos de 24 horas de antecedência podem
        não ser elegíveis para reembolso integral, cobrindo custos
        administrativos do horário reservado.
      </p>

      <h2>3. Faltas sem aviso</h2>
      <p>
        Em caso de não comparecimento sem aviso prévio, o valor pago não é
        reembolsado.
      </p>

      <h2>4. Dúvidas</h2>
      <p>
        Qualquer dúvida sobre reagendamento ou cancelamento pode ser
        esclarecida em <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
