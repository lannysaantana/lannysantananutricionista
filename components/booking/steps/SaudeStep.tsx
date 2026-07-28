"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { saudeSchema } from "@/utils/validators";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormValues = z.infer<typeof saudeSchema>;

function YesNoToggle({
  value,
  onChange,
}: {
  value: boolean | null | undefined;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn(
          "rounded-2xl border py-4 font-sans text-base font-medium transition-colors",
          value === true
            ? "border-gold bg-gold/10 text-ink dark:text-offwhite"
            : "border-sage/15 bg-white/70 text-ink/70 hover:border-sage/40 dark:bg-white/5 dark:text-offwhite/70"
        )}
      >
        SIM
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn(
          "rounded-2xl border py-4 font-sans text-base font-medium transition-colors",
          value === false
            ? "border-gold bg-gold/10 text-ink dark:text-offwhite"
            : "border-sage/15 bg-white/70 text-ink/70 hover:border-sage/40 dark:bg-white/5 dark:text-offwhite/70"
        )}
      >
        NÃO
      </button>
    </div>
  );
}

export function SaudeStep() {
  const { data, setField, next, back } = useBookingStore();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(saudeSchema),
    defaultValues: {
      heightCm: data.heightCm ?? undefined,
      weightKg: data.weightKg ?? undefined,
      medicationsInUse: data.medicationsInUse,
      usesGlp1: data.usesGlp1 ?? undefined,
      glp1Medication: data.glp1Medication,
      hasPhysicalLimitation: data.hasPhysicalLimitation ?? undefined,
    },
  });

  const usesGlp1 = watch("usesGlp1");

  return (
    <StepShell title="Um pouco sobre sua saúde" subtitle="Para personalizar seu atendimento." onBack={back}>
      <form
        onSubmit={handleSubmit((values) => {
          setField("heightCm", values.heightCm);
          setField("weightKg", values.weightKg);
          setField("medicationsInUse", values.medicationsInUse ?? "");
          setField("usesGlp1", values.usesGlp1);
          setField("glp1Medication", values.usesGlp1 ? values.glp1Medication : "");
          setField("hasPhysicalLimitation", values.hasPhysicalLimitation);
          next();
        })}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block font-sans text-sm text-ink/60 dark:text-offwhite/60">
              Altura (cm)
            </label>
            <Input
              autoFocus
              type="number"
              inputMode="numeric"
              placeholder="170"
              error={errors.heightCm?.message}
              {...register("heightCm", { valueAsNumber: true })}
            />
          </div>
          <div>
            <label className="mb-2 block font-sans text-sm text-ink/60 dark:text-offwhite/60">
              Peso atual (kg)
            </label>
            <Input
              type="number"
              inputMode="decimal"
              step="0.1"
              placeholder="70"
              error={errors.weightKg?.message}
              {...register("weightKg", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-sans text-sm text-ink/60 dark:text-offwhite/60">
            Medicamentos em uso (opcional)
          </label>
          <textarea
            rows={3}
            placeholder="Se não usa nenhum, pode deixar em branco"
            className="w-full resize-none rounded-xl border border-sage/20 bg-white/80 dark:bg-white/5 px-5 py-4 text-lg font-sans text-ink dark:text-offwhite placeholder:text-ink/30 dark:placeholder:text-offwhite/30 transition-colors focus:border-gold focus:outline-none"
            {...register("medicationsInUse")}
          />
        </div>

        <div>
          <p className="mb-2 font-sans text-sm text-ink/60 dark:text-offwhite/60">
            Você utiliza medicamento agonista de GLP-1?
          </p>
          <Controller
            control={control}
            name="usesGlp1"
            render={({ field }) => <YesNoToggle value={field.value} onChange={field.onChange} />}
          />
          {errors.usesGlp1 && <p className="mt-2 text-sm text-red-500">{errors.usesGlp1.message}</p>}

          <AnimatePresence>
            {usesGlp1 === true && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <Input
                  placeholder="Qual medicamento?"
                  error={errors.glp1Medication?.message}
                  {...register("glp1Medication")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <p className="mb-2 font-sans text-sm text-ink/60 dark:text-offwhite/60">
            Possui alguma limitação física?
          </p>
          <Controller
            control={control}
            name="hasPhysicalLimitation"
            render={({ field }) => <YesNoToggle value={field.value} onChange={field.onChange} />}
          />
          {errors.hasPhysicalLimitation && (
            <p className="mt-2 text-sm text-red-500">{errors.hasPhysicalLimitation.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full">
          Continuar
        </Button>
      </form>
    </StepShell>
  );
}
