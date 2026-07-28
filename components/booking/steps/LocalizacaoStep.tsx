"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { localizacaoSchema } from "@/utils/validators";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormValues = z.infer<typeof localizacaoSchema>;

const BRAZILIAN_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

export function LocalizacaoStep() {
  const { data, setField, next, back } = useBookingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(localizacaoSchema),
    defaultValues: { city: data.city, state: data.state, profession: data.profession },
  });

  return (
    <StepShell title="De onde você é?" subtitle="Cidade, estado e profissão." onBack={back}>
      <form
        onSubmit={handleSubmit((values) => {
          setField("city", values.city);
          setField("state", values.state);
          setField("profession", values.profession);
          next();
        })}
        className="space-y-6"
      >
        <Input
          autoFocus
          placeholder="Cidade"
          error={errors.city?.message}
          {...register("city")}
        />

        <div>
          <label className="mb-2 block font-sans text-sm text-ink/60 dark:text-offwhite/60">
            Estado
          </label>
          <select
            className={cn(
              "w-full rounded-xl border border-sage/20 bg-white/80 dark:bg-white/5 px-5 py-4 text-lg font-sans text-ink dark:text-offwhite transition-colors focus:border-gold focus:outline-none",
              errors.state && "border-red-400"
            )}
            defaultValue={data.state}
            {...register("state")}
          >
            <option value="" disabled>
              Selecione o estado
            </option>
            {BRAZILIAN_STATES.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
          {errors.state && <p className="mt-2 text-sm text-red-500">{errors.state.message}</p>}
        </div>

        <Input
          placeholder="Profissão"
          error={errors.profession?.message}
          {...register("profession")}
        />

        <Button type="submit" size="lg" className="w-full">
          Continuar
        </Button>
      </form>
    </StepShell>
  );
}
