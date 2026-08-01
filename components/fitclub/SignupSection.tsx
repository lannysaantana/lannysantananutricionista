"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Dumbbell, Scale, CheckCircle2, Check, Tag } from "lucide-react";
import { ClubButton } from "@/components/fitclub/ui/ClubButton";
import { StickerCard, ClubTag } from "@/components/fitclub/ui/StickerCard";
import { FloatingSticker } from "@/components/fitclub/ui/Stickers";
import { challengeSignupSchema, type ChallengeSignupInput } from "@/utils/validators";
import { formatPhoneInput, formatCurrencyBRL } from "@/utils/formatters";
import { cn } from "@/lib/utils";
import {
  CHALLENGE_PRICE_CENTS,
  CHALLENGE_START_DATE_LABEL,
  CHALLENGE_END_DATE_LABEL,
  CHALLENGE_DIVA_COUPON_CODE,
  CHALLENGE_DIVA_PRICE_CENTS,
} from "@/lib/config";

const INCLUDED = [
  "Cardápio individualizado para seu objetivo",
  "Acompanhamento diário com pontuação e ranking",
  "Grupo oficial no WhatsApp",
  "Chance de ganhar prêmios exclusivos",
];

function ObjectiveOption({
  label,
  icon: Icon,
  selected,
  onSelect,
}: {
  label: string;
  icon: typeof Scale;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border-[3px] border-club-black px-4 py-3.5 text-left font-club-sans font-bold transition-all",
        selected ? "bg-club-neon shadow-sticker" : "bg-club-white hover:-translate-y-0.5 hover:shadow-sticker"
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-club-black bg-club-white text-club-black">
        <Icon className="h-4 w-4" />
      </span>
      <span className="flex-1 text-club-black">{label}</span>
      {selected && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-club-black bg-club-black text-club-white">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
    </button>
  );
}

export function SignupSection() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ChallengeSignupInput>({
    resolver: zodResolver(challengeSignupSchema),
    defaultValues: { name: "", whatsapp: "", email: "", objective: undefined, couponCode: "" },
  });

  const couponInput = watch("couponCode");
  const isCouponValid = couponInput?.trim().toUpperCase() === CHALLENGE_DIVA_COUPON_CODE;
  const displayPriceCents = isCouponValid ? CHALLENGE_DIVA_PRICE_CENTS : CHALLENGE_PRICE_CENTS;

  async function onSubmit(values: ChallengeSignupInput) {
    setSubmitError(null);
    try {
      const signupRes = await fetch("/api/challenge/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const signupData = await signupRes.json();
      if (!signupRes.ok) throw new Error(signupData?.error ?? "Falha ao criar inscrição");

      sessionStorage.setItem("lanny-fitclub-signup-id", signupData.id);

      const checkoutRes = await fetch("/api/challenge/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signupId: signupData.id }),
      });
      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok) throw new Error(checkoutData?.error ?? "Falha ao criar checkout");

      window.location.href = checkoutData.url;
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Algo deu errado. Tente novamente em instantes."
      );
    }
  }

  return (
    <section id="inscricao" className="relative scroll-mt-20 overflow-hidden px-5 py-20 sm:py-28">
      <FloatingSticker kind="star" className="right-[6%] top-[8%] h-10 w-10 text-club-pink sm:h-14 sm:w-14" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <ClubTag bg="gold">Vagas limitadas</ClubTag>
          <h2 className="mt-4 font-club-display text-3xl font-extrabold text-club-white sm:text-4xl">
            Garanta sua vaga
          </h2>
          <p className="mt-4 font-club-sans text-lg text-club-white/70">
            De {CHALLENGE_START_DATE_LABEL} até {CHALLENGE_END_DATE_LABEL}.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {!isCouponValid && (
              <span className="absolute -top-4 right-4 z-10 rotate-[4deg] rounded-full border-[3px] border-club-black bg-club-pink px-4 py-1.5 font-club-sans text-xs font-bold text-club-black shadow-sticker sm:right-8">
                Já fez o desafio? Cupom DIVA = {formatCurrencyBRL(CHALLENGE_DIVA_PRICE_CENTS)}
              </span>
            )}
            <StickerCard bg="neon" rotate="-1.5deg" className="p-8 sm:p-10">
              <p className="font-club-sans text-xs font-bold uppercase tracking-widest text-club-black/60">
                Investimento
              </p>
              <div className="mt-2 flex items-baseline gap-3">
                {isCouponValid && (
                  <p className="font-club-sans text-xl font-bold text-club-black/40 line-through">
                    {formatCurrencyBRL(CHALLENGE_PRICE_CENTS)}
                  </p>
                )}
                <p className="font-club-display text-5xl font-extrabold text-club-black">
                  {formatCurrencyBRL(displayPriceCents)}
                </p>
              </div>
              {isCouponValid && (
                <p className="mt-2 flex items-center gap-1.5 font-club-sans text-sm font-bold text-club-black">
                  <Tag className="h-4 w-4" />
                  Cupom DIVA aplicado — desconto de veterana!
                </p>
              )}
              <ul className="mt-8 space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-club-black" />
                    <span className="font-club-sans text-sm font-medium text-club-black/90">{item}</span>
                  </li>
                ))}
              </ul>
            </StickerCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StickerCard bg="white" className="p-8 sm:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="mb-2 block font-club-sans text-sm font-bold text-club-black/70">
                    Nome completo
                  </label>
                  <input
                    placeholder="Seu nome completo"
                    className="w-full rounded-xl border-[3px] border-club-black bg-club-white px-4 py-3 font-club-sans text-club-black placeholder:text-club-black/30 focus:outline-none focus:ring-4 focus:ring-club-pink/30"
                    {...register("name")}
                  />
                  {errors.name && <p className="mt-1.5 text-sm font-bold text-club-pink">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block font-club-sans text-sm font-bold text-club-black/70">
                    WhatsApp
                  </label>
                  <Controller
                    control={control}
                    name="whatsapp"
                    render={({ field }) => (
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="(00) 00000-0000"
                        className="w-full rounded-xl border-[3px] border-club-black bg-club-white px-4 py-3 font-club-sans text-club-black placeholder:text-club-black/30 focus:outline-none focus:ring-4 focus:ring-club-pink/30"
                        value={field.value}
                        onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                      />
                    )}
                  />
                  {errors.whatsapp && (
                    <p className="mt-1.5 text-sm font-bold text-club-pink">{errors.whatsapp.message}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block font-club-sans text-sm font-bold text-club-black/70">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border-[3px] border-club-black bg-club-white px-4 py-3 font-club-sans text-club-black placeholder:text-club-black/30 focus:outline-none focus:ring-4 focus:ring-club-pink/30"
                    {...register("email")}
                  />
                  {errors.email && <p className="mt-1.5 text-sm font-bold text-club-pink">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block font-club-sans text-sm font-bold text-club-black/70">
                    Seu objetivo
                  </label>
                  <Controller
                    control={control}
                    name="objective"
                    render={({ field }) => (
                      <div className="space-y-3">
                        <ObjectiveOption
                          label="Emagrecimento"
                          icon={Scale}
                          selected={field.value === "emagrecimento"}
                          onSelect={() => field.onChange("emagrecimento")}
                        />
                        <ObjectiveOption
                          label="Hipertrofia"
                          icon={Dumbbell}
                          selected={field.value === "hipertrofia"}
                          onSelect={() => field.onChange("hipertrofia")}
                        />
                      </div>
                    )}
                  />
                  {errors.objective && (
                    <p className="mt-1.5 text-sm font-bold text-club-pink">Selecione seu objetivo</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-1.5 font-club-sans text-sm font-bold text-club-black/70">
                    <Tag className="h-3.5 w-3.5" />
                    Cupom de desconto (opcional)
                  </label>
                  <input
                    placeholder="Já fez o desafio? Digite seu cupom"
                    className={cn(
                      "w-full rounded-xl border-[3px] bg-club-white px-4 py-3 font-club-sans uppercase text-club-black placeholder:normal-case placeholder:text-club-black/30 focus:outline-none focus:ring-4 focus:ring-club-pink/30",
                      isCouponValid ? "border-club-neon" : "border-club-black"
                    )}
                    {...register("couponCode")}
                  />
                  {isCouponValid && (
                    <p className="mt-1.5 flex items-center gap-1 text-sm font-bold text-club-black">
                      <Check className="h-3.5 w-3.5" /> Cupom válido — {formatCurrencyBRL(CHALLENGE_DIVA_PRICE_CENTS)}
                    </p>
                  )}
                </div>

                {submitError && <p className="text-sm font-bold text-club-pink">{submitError}</p>}

                <ClubButton type="submit" size="lg" variant="pink" className="w-full" loading={isSubmitting}>
                  Quero Participar
                </ClubButton>
                <p className="text-center font-club-sans text-xs text-club-black/50">
                  Você será redirecionada ao pagamento seguro do Mercado Pago.
                </p>
              </form>
            </StickerCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
