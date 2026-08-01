"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, ClipboardList, Tag } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useChallengeAnamneseGrouped, useChallengeSignupMutations, useChallengeSignups } from "@/hooks/useChallengeSignups";
import { formatCurrencyBRL, formatDateShort } from "@/utils/formatters";
import { cn } from "@/lib/utils";
import type { ChallengeAnamnese, ChallengeSignup } from "@/types/challenge";

const OBJECTIVE_LABELS: Record<ChallengeSignup["objective"], string> = {
  emagrecimento: "Emagrecimento",
  hipertrofia: "Hipertrofia",
};

const ANAMNESE_LABELS: { key: keyof ChallengeAnamnese; label: string }[] = [
  { key: "food_preferences", label: "Preferências alimentares" },
  { key: "food_aversions", label: "Aversões alimentares" },
  { key: "allergies", label: "Alergias" },
  { key: "meal_schedule", label: "Horário das refeições" },
  { key: "breakfast", label: "Café da manhã" },
  { key: "morning_snack", label: "Lanche da manhã" },
  { key: "lunch", label: "Almoço" },
  { key: "afternoon_snack", label: "Janta" },
  { key: "dinner", label: "Jantar" },
  { key: "training_frequency", label: "Frequência de treino" },
  { key: "training_time", label: "Horário de treino" },
  { key: "medications_in_use", label: "Medicamentos em uso" },
  { key: "referred_by", label: "Quem indicou" },
];

function statusColor(status: string) {
  if (status === "paid") return "bg-sage/15 text-sage-dark";
  if (status === "refunded" || status === "failed") return "bg-red-100 text-red-600";
  return "bg-amber-100 text-amber-700";
}

function AnamneseSection({ form }: { form: ChallengeAnamnese | undefined }) {
  const [open, setOpen] = useState(false);

  if (!form) {
    return (
      <div className="flex items-center gap-2 border-t border-sage/5 px-4 py-3 font-sans text-xs text-ink/40 dark:text-offwhite/40">
        <ClipboardList className="h-3.5 w-3.5 shrink-0" />
        Anamnese ainda não preenchida
      </div>
    );
  }

  return (
    <div className="border-t border-sage/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-3 font-sans text-xs font-medium text-ink dark:text-offwhite"
      >
        <ClipboardList className="h-3.5 w-3.5 shrink-0 text-sage-dark dark:text-gold" />
        Anamnese — {form.age} anos, {form.height_cm}cm, {form.weight_kg}kg
        {(form.waist_cm || form.hip_cm) && (
          <span className="text-ink/50 dark:text-offwhite/50">
            {" "}
            · cintura {form.waist_cm ?? "—"}cm / quadril {form.hip_cm ?? "—"}cm
          </span>
        )}
        {open ? <ChevronUp className="ml-auto h-3.5 w-3.5" /> : <ChevronDown className="ml-auto h-3.5 w-3.5" />}
      </button>
      {open && (
        <div className="grid grid-cols-1 gap-3 px-4 pb-4 sm:grid-cols-2">
          {ANAMNESE_LABELS.map(({ key, label }) => (
            <div key={key}>
              <p className="font-sans text-[10px] uppercase tracking-wide text-ink/40 dark:text-offwhite/40">
                {label}
              </p>
              <p className="whitespace-pre-wrap font-sans text-xs text-ink/80 dark:text-offwhite/80">
                {(form[key] as string) || "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SignupRow({ signup, anamnese }: { signup: ChallengeSignup; anamnese: ChallengeAnamnese | undefined }) {
  const { markPaid } = useChallengeSignupMutations();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-sage/5 last:border-0">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3">
        <button onClick={() => setExpanded((v) => !v)} className="text-ink/50 dark:text-offwhite/50">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        <div className="min-w-[160px] flex-1">
          <p className="font-sans text-sm font-medium text-ink dark:text-offwhite">{signup.name}</p>
          <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">{signup.email}</p>
        </div>
        <span className="font-sans text-sm text-ink/80 dark:text-offwhite/80">
          {OBJECTIVE_LABELS[signup.objective]}
        </span>
        <span className="font-sans text-sm text-ink/80 dark:text-offwhite/80">
          {formatCurrencyBRL(signup.amount_cents)}
        </span>
        {signup.coupon_code && (
          <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 font-sans text-xs font-medium text-sage-dark dark:text-gold">
            <Tag className="h-3 w-3" />
            {signup.coupon_code}
          </span>
        )}
        <span className={cn("rounded-full px-2.5 py-1 font-sans text-xs font-medium", statusColor(signup.payment_status))}>
          {signup.payment_status}
        </span>
        <span className="font-sans text-xs text-ink/50 dark:text-offwhite/50">
          {formatDateShort(signup.created_at.slice(0, 10))}
        </span>
        <button
          title="Marcar como pago"
          disabled={signup.payment_status === "paid"}
          onClick={() => markPaid.mutate(signup.id)}
          className="rounded-full p-2 text-sage-dark hover:bg-sage/10 disabled:opacity-30 dark:text-gold"
        >
          <CheckCircle className="h-4 w-4" />
        </button>
      </div>

      {expanded && (
        <div className="mb-3 ml-9 mr-4 rounded-xl border border-sage/10 bg-sage/[0.03]">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 px-4 py-3 sm:grid-cols-3">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-wide text-ink/40 dark:text-offwhite/40">
                WhatsApp
              </p>
              <p className="font-sans text-xs text-ink/80 dark:text-offwhite/80">{signup.whatsapp}</p>
            </div>
          </div>
          <AnamneseSection form={anamnese} />
        </div>
      )}
    </div>
  );
}

export function ChallengeSignupsTable() {
  const { data: signups, isLoading } = useChallengeSignups();
  const { data: anamneseBySignup } = useChallengeAnamneseGrouped();

  if (isLoading) return <LoadingSpinner />;

  if (!signups || signups.length === 0) {
    return (
      <p className="py-16 text-center font-sans text-sm text-ink/50 dark:text-offwhite/50">
        Nenhuma inscrição no Desafio Fit Club ainda.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-sage/10 bg-white/70 dark:bg-white/5">
      <div className="min-w-[900px]">
        {signups.map((signup) => (
          <SignupRow key={signup.id} signup={signup} anamnese={anamneseBySignup?.[signup.id]} />
        ))}
      </div>
    </div>
  );
}
