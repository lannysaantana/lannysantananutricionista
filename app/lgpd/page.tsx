import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { BUSINESS_INFO } from "@/lib/config";

export const metadata: Metadata = {
  title: "LGPD",
  robots: { index: false, follow: false },
};

export default function LgpdPage() {
  return (
    <LegalPageLayout title="LGPD — Lei Geral de Proteção de Dados" updatedAt="a definir">
      <p className="mb-6 rounded-xl border border-gold/30 bg-gold/10 p-4 text-xs">
        Modelo padrão fornecido como ponto de partida — recomenda-se revisão
        por um profissional jurídico antes da publicação final.
      </p>

      <h2>1. Compromisso com a LGPD</h2>
      <p>
        Em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de
        Dados), tratamos seus dados pessoais com base em finalidades
        legítimas e específicas, relacionadas ao agendamento e ao
        atendimento nutricional.
      </p>

      <h2>2. Base legal para o tratamento</h2>
      <p>
        O tratamento de dados de saúde ocorre com base no seu consentimento e
        na execução do serviço contratado (a consulta nutricional).
      </p>

      <h2>3. Direitos do titular</h2>
      <ul>
        <li>Confirmação da existência de tratamento de dados</li>
        <li>Acesso aos dados</li>
        <li>Correção de dados incompletos ou desatualizados</li>
        <li>Eliminação dos dados tratados com consentimento</li>
        <li>Revogação do consentimento a qualquer momento</li>
      </ul>

      <h2>4. Encarregado de dados (DPO)</h2>
      <p>
        Para exercer seus direitos ou tirar dúvidas sobre o tratamento de
        dados, entre em contato pelo e-mail{" "}
        <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>.
      </p>
    </LegalPageLayout>
  );
}
