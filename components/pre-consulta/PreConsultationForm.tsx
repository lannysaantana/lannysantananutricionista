"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeartPulse, UtensilsCrossed, CheckCircle2 } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { submitPreConsultationForm } from "@/services/orderService";
import type { PreConsultationResponses } from "@/types/order";

const EMPTY_RESPONSES: PreConsultationResponses = {
  healthComplaints: "",
  diagnosedConditions: "",
  medicationsInUse: "",
  allergiesOrIntolerances: "",
  familyHistory: "",
  sleepQuality: "",
  waterIntakeLiters: "",
  physicalActivity: "",
  bowelHabits: "",
  previousDiets: "",
  mainGoalDescription: "",
  breakfast: "",
  morningSnack: "",
  lunch: "",
  afternoonSnack: "",
  dinner: "",
  eveningSnack: "",
  additionalNotes: "",
};

const ANAMNESE_FIELDS: { key: keyof PreConsultationResponses; label: string; multiline?: boolean }[] = [
  { key: "healthComplaints", label: "Quais queixas de saúde você possui atualmente?", multiline: true },
  { key: "diagnosedConditions", label: "Possui alguma condição diagnosticada? (diabetes, hipertensão, etc.)", multiline: true },
  { key: "medicationsInUse", label: "Quais medicamentos você utiliza atualmente?", multiline: true },
  { key: "allergiesOrIntolerances", label: "Possui alergias ou intolerâncias alimentares?", multiline: true },
  { key: "familyHistory", label: "Histórico familiar relevante (diabetes, obesidade, doenças cardíacas, etc.)", multiline: true },
  { key: "sleepQuality", label: "Como você avalia a qualidade do seu sono?" },
  { key: "waterIntakeLiters", label: "Quantos litros de água você bebe por dia, em média?" },
  { key: "physicalActivity", label: "Pratica atividade física? Qual e com que frequência?", multiline: true },
  { key: "bowelHabits", label: "Como estão seus hábitos intestinais?" },
  { key: "previousDiets", label: "Já fez alguma dieta antes? Qual foi o resultado?", multiline: true },
  { key: "mainGoalDescription", label: "Descreva com suas palavras o que espera alcançar com o acompanhamento", multiline: true },
];

const RECORDATORIO_FIELDS: { key: keyof PreConsultationResponses; label: string }[] = [
  { key: "breakfast", label: "Café da manhã (horário e o que costuma comer)" },
  { key: "morningSnack", label: "Lanche da manhã" },
  { key: "lunch", label: "Almoço" },
  { key: "afternoonSnack", label: "Lanche da tarde" },
  { key: "dinner", label: "Jantar" },
  { key: "eveningSnack", label: "Ceia" },
  { key: "additionalNotes", label: "Alguma observação adicional?" },
];

export function PreConsultationForm({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [responses, setResponses] = useState<PreConsultationResponses>(EMPTY_RESPONSES);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function patch(key: keyof PreConsultationResponses, value: string) {
    setResponses((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    try {
      await submitPreConsultationForm({ order_id: orderId, responses });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível enviar agora.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-lg flex-col items-center text-center"
      >
        <CheckCircle2 className="h-14 w-14 text-sage-dark dark:text-gold" strokeWidth={1.5} />
        <h1 className="mt-6 font-display text-2xl text-ink dark:text-offwhite">
          Pré-Consulta enviada!
        </h1>
        <p className="mt-3 font-subtitle text-lg italic text-ink/70 dark:text-offwhite/70">
          Obrigada por compartilhar essas informações — elas ajudam a preparar
          um atendimento ainda mais personalizado para você.
        </p>
        <Button className="mt-8" size="lg" onClick={() => router.push("/")}>
          Voltar ao início
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <h1 className="font-display text-3xl text-ink dark:text-offwhite">Pré-Consulta</h1>
        <p className="mt-2 font-subtitle text-lg italic text-ink/60 dark:text-offwhite/60">
          Anamnese e recordatório alimentar — leva só alguns minutos.
        </p>
      </div>

      <Card>
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <HeartPulse className="h-4 w-4" />
          </span>
          <div>
            <CardTitle>Anamnese</CardTitle>
            <CardDescription>Seu histórico de saúde</CardDescription>
          </div>
        </div>
        <div className="space-y-4">
          {ANAMNESE_FIELDS.map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block font-sans text-sm text-ink/80 dark:text-offwhite/80">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  value={responses[field.key]}
                  onChange={(e) => patch(field.key, e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-sage/20 bg-white/80 px-4 py-3 font-sans text-sm text-ink outline-none focus:border-gold dark:bg-white/5 dark:text-offwhite"
                />
              ) : (
                <input
                  value={responses[field.key]}
                  onChange={(e) => patch(field.key, e.target.value)}
                  className="w-full rounded-xl border border-sage/20 bg-white/80 px-4 py-3 font-sans text-sm text-ink outline-none focus:border-gold dark:bg-white/5 dark:text-offwhite"
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <UtensilsCrossed className="h-4 w-4" />
          </span>
          <div>
            <CardTitle>Recordatório Alimentar</CardTitle>
            <CardDescription>Como é o seu dia alimentar típico</CardDescription>
          </div>
        </div>
        <div className="space-y-4">
          {RECORDATORIO_FIELDS.map((field) => (
            <div key={field.key}>
              <label className="mb-1.5 block font-sans text-sm text-ink/80 dark:text-offwhite/80">
                {field.label}
              </label>
              <textarea
                value={responses[field.key]}
                onChange={(e) => patch(field.key, e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-sage/20 bg-white/80 px-4 py-3 font-sans text-sm text-ink outline-none focus:border-gold dark:bg-white/5 dark:text-offwhite"
              />
            </div>
          ))}
        </div>
      </Card>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <Button size="lg" className="w-full" loading={loading} onClick={handleSubmit}>
        Enviar Pré-Consulta
      </Button>
    </div>
  );
}
