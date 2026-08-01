"use client";

import { useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Camera } from "lucide-react";
import { ClubButton } from "@/components/fitclub/ui/ClubButton";
import { StickerCard, ClubTag } from "@/components/fitclub/ui/StickerCard";
import { ChallengeLogo } from "@/components/fitclub/ChallengeLogo";
import { PhotoGuideAvatar } from "@/components/fitclub/PhotoGuideAvatar";
import { challengeAnamneseSchema, type ChallengeAnamneseInput } from "@/utils/validators";
import { toWhatsAppLink } from "@/utils/formatters";
import { CHALLENGE_PROOF_WHATSAPP, CHALLENGE_ANAMNESE_DEADLINE_LABEL } from "@/lib/config";

const inputClass =
  "w-full rounded-xl border-[3px] border-club-black bg-club-white px-4 py-3 font-club-sans text-club-black placeholder:text-club-black/30 focus:outline-none focus:ring-4 focus:ring-club-pink/30";
const labelClass = "mb-2 block font-club-sans text-sm font-bold text-club-black/70";

const PHOTOS_MESSAGE =
  "Olá! Estou enviando minhas fotos (frente e perfil) e medidas (cintura e quadril) para a avaliação do Desafio Fit Club.";

function TextField({
  label,
  registerProps,
  multiline,
  error,
}: {
  label: string;
  registerProps: UseFormRegisterReturn;
  multiline?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {multiline ? (
        <textarea rows={2} className={inputClass} {...registerProps} />
      ) : (
        <input className={inputClass} {...registerProps} />
      )}
      {error && <p className="mt-1.5 text-sm font-bold text-club-pink">{error}</p>}
    </div>
  );
}

export function AnamneseForm({ signupId }: { signupId: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChallengeAnamneseInput>({
    resolver: zodResolver(challengeAnamneseSchema),
  });

  async function onSubmit(values: ChallengeAnamneseInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/challenge/anamnese", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signupId, responses: values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Falha ao enviar anamnese");
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Algo deu errado. Tente novamente em instantes.");
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl">
        <StickerCard bg="white" className="p-8 text-center sm:p-10">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-club-black bg-club-neon text-club-black"
          >
            <CheckCircle2 className="h-9 w-9" strokeWidth={1.5} />
          </motion.div>
          <h1 className="mt-6 font-club-display text-2xl font-extrabold text-club-black">Anamnese enviada!</h1>
          <p className="mt-3 font-club-sans text-club-black/70">
            Falta só um passo: envie suas fotos e medidas pelo WhatsApp até{" "}
            <span className="font-bold text-club-black">{CHALLENGE_ANAMNESE_DEADLINE_LABEL}</span> para gerarmos sua
            avaliação física e seu cardápio.
          </p>

          <div className="mt-6">
            <PhotoGuideAvatar />
          </div>

          <ul className="mt-6 space-y-2 text-left font-club-sans text-sm text-club-black/70">
            <li>• 1 foto de frente e 1 foto de perfil (lado)</li>
            <li>• Roupas justas ou íntimas, sem casacos largos</li>
            <li>• Fundo neutro, boa iluminação, corpo inteiro no quadro</li>
            <li>• Pés juntos, braços levemente afastados do corpo</li>
            <li>• Circunferência da cintura e do quadril (em cm)</li>
          </ul>

          <a
            href={toWhatsAppLink(CHALLENGE_PROOF_WHATSAPP, PHOTOS_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block"
          >
            <ClubButton size="lg" variant="pink" className="group w-full">
              <MessageCircle className="h-4 w-4" />
              Enviar fotos e medidas no WhatsApp
            </ClubButton>
          </a>
        </StickerCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10 flex justify-center">
        <ChallengeLogo size="md" />
      </div>

      <div className="mb-10 text-center">
        <ClubTag bg="lilac">Passo final</ClubTag>
        <h1 className="mt-4 font-club-display text-3xl font-extrabold text-club-white">Sua anamnese</h1>
        <p className="mt-3 font-club-sans text-club-white/70">
          Essas informações me ajudam a montar seu cardápio individualizado. Leva só alguns minutos.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <StickerCard bg="white" className="p-6 sm:p-8">
          <h2 className="mb-4 font-club-display text-lg font-extrabold text-club-black">Dados básicos</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField
              label="Idade"
              registerProps={register("age", { valueAsNumber: true })}
              error={errors.age?.message}
            />
            <TextField
              label="Peso (kg)"
              registerProps={register("weightKg", { valueAsNumber: true })}
              error={errors.weightKg?.message}
            />
            <TextField
              label="Altura (cm)"
              registerProps={register("heightCm", { valueAsNumber: true })}
              error={errors.heightCm?.message}
            />
          </div>
        </StickerCard>

        <StickerCard bg="white" className="p-6 sm:p-8">
          <h2 className="mb-4 font-club-display text-lg font-extrabold text-club-black">Alimentação</h2>
          <div className="space-y-4">
            <TextField label="Preferências alimentares" registerProps={register("foodPreferences")} multiline />
            <TextField label="Aversões alimentares" registerProps={register("foodAversions")} multiline />
            <TextField label="Alergias" registerProps={register("allergies")} multiline />
            <TextField label="Horário das refeições" registerProps={register("mealSchedule")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Café da manhã — o que costuma comer" registerProps={register("breakfast")} />
              <TextField label="Lanche da manhã — o que costuma comer" registerProps={register("morningSnack")} />
              <TextField label="Almoço — o que costuma comer" registerProps={register("lunch")} />
              <TextField label="Lanche da tarde — o que costuma comer" registerProps={register("afternoonSnack")} />
              <TextField label="Janta — o que costuma comer" registerProps={register("dinner")} />
            </div>
          </div>
        </StickerCard>

        <StickerCard bg="white" className="p-6 sm:p-8">
          <h2 className="mb-4 font-club-display text-lg font-extrabold text-club-black">Rotina e saúde</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Frequência de treino" registerProps={register("trainingFrequency")} />
            <TextField label="Horário de treino" registerProps={register("trainingTime")} />
          </div>
          <div className="mt-4">
            <TextField label="Uso de medicamentos" registerProps={register("medicationsInUse")} multiline />
          </div>
        </StickerCard>

        <StickerCard bg="lilac" className="p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Camera className="h-5 w-5 text-club-black" />
            <h2 className="font-club-display text-lg font-extrabold text-club-black">Circunferências (cm)</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Cintura (cm)"
              registerProps={register("waistCm", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              error={errors.waistCm?.message}
            />
            <TextField
              label="Quadril (cm)"
              registerProps={register("hipCm", {
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
              error={errors.hipCm?.message}
            />
          </div>
          <p className="mt-3 font-club-sans text-xs text-club-black/60">
            Sem fita métrica em mãos? Pode deixar em branco e enviar junto com as fotos pelo WhatsApp.
          </p>
        </StickerCard>

        <StickerCard bg="white" className="p-6 sm:p-8">
          <TextField label="Quem te indicou? (opcional)" registerProps={register("referredBy")} />
        </StickerCard>

        {submitError && (
          <p className="text-center font-club-sans text-sm font-bold text-club-pink">{submitError}</p>
        )}

        <ClubButton type="submit" size="lg" variant="pink" className="w-full" loading={isSubmitting}>
          Enviar anamnese
        </ClubButton>
      </form>
    </div>
  );
}
