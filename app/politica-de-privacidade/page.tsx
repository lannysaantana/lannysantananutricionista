import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { BUSINESS_INFO } from "@/lib/config";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: { index: false, follow: false },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <LegalPageLayout title="Política de Privacidade" updatedAt="a definir">
      <p className="mb-6 rounded-xl border border-gold/30 bg-gold/10 p-4 text-xs">
        Modelo padrão fornecido como ponto de partida — recomenda-se revisão
        por um profissional jurídico antes da publicação final.
      </p>

      <h2>1. Quais dados coletamos</h2>
      <p>
        Ao agendar uma consulta, coletamos nome, idade, telefone, e-mail,
        objetivo do atendimento e informações de saúde que você optar por
        compartilhar durante a consulta.
      </p>

      <h2>2. Como usamos seus dados</h2>
      <p>
        Utilizamos essas informações exclusivamente para viabilizar o
        agendamento, o atendimento nutricional e a comunicação relacionada à
        sua consulta (confirmações, lembretes e retornos).
      </p>

      <h2>3. Compartilhamento</h2>
      <p>
        Seus dados não são vendidos ou compartilhados com terceiros para fins
        de marketing. Podem ser processados por prestadores de serviço
        essenciais à operação (ex.: banco de dados, meio de pagamento),
        sempre sob obrigações de confidencialidade.
      </p>

      <h2>4. Seus direitos</h2>
      <p>
        Você pode solicitar acesso, correção ou exclusão dos seus dados a
        qualquer momento, entrando em contato pelo e-mail{" "}
        <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>.
      </p>

      <h2>5. Segurança</h2>
      <p>
        Adotamos medidas técnicas razoáveis para proteger seus dados contra
        acesso não autorizado, alteração ou destruição.
      </p>
    </LegalPageLayout>
  );
}
