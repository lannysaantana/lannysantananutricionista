import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Termos de Uso",
  robots: { index: false, follow: false },
};

export default function TermosDeUsoPage() {
  return (
    <LegalPageLayout title="Termos de Uso" updatedAt="a definir">
      <p className="mb-6 rounded-xl border border-gold/30 bg-gold/10 p-4 text-xs">
        Modelo padrão fornecido como ponto de partida — recomenda-se revisão
        por um profissional jurídico antes da publicação final.
      </p>

      <h2>1. Sobre o serviço</h2>
      <p>
        Este site é operado por {SITE_NAME} e tem como finalidade apresentar
        os serviços de nutrição oferecidos e viabilizar o agendamento de
        consultas online.
      </p>

      <h2>2. Natureza do atendimento</h2>
      <p>
        As orientações fornecidas nas consultas são individualizadas e não
        substituem acompanhamento médico. Em caso de emergência de saúde,
        procure atendimento médico imediato.
      </p>

      <h2>3. Uso do site</h2>
      <p>
        Ao utilizar o fluxo de agendamento, você concorda em fornecer
        informações verdadeiras e atualizadas.
      </p>

      <h2>4. Pagamentos</h2>
      <p>
        Os valores e formas de pagamento aceitas são exibidos no momento do
        agendamento e processados por gateways de pagamento terceirizados.
      </p>

      <h2>5. Alterações</h2>
      <p>Estes termos podem ser atualizados periodicamente sem aviso prévio.</p>
    </LegalPageLayout>
  );
}
