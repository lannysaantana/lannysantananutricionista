"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { dadosPessoaisSchema } from "@/utils/validators";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Input } from "@/components/ui/Input";
import { RadioCard } from "@/components/ui/RadioCard";
import { Button } from "@/components/ui/Button";
import { PATIENT_SEX_LABELS, type PatientSex } from "@/types/booking";

type FormValues = z.infer<typeof dadosPessoaisSchema>;

export function DadosPessoaisStep() {
  const { data, setField, next } = useBookingStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(dadosPessoaisSchema),
    defaultValues: {
      name: data.name,
      birthDate: data.birthDate,
      sex: data.sex ?? undefined,
    },
  });

  return (
    <StepShell title="Vamos começar com o básico" subtitle="Seus dados pessoais.">
      <form
        onSubmit={handleSubmit((values) => {
          setField("name", values.name);
          setField("birthDate", values.birthDate);
          setField("sex", values.sex);
          next();
        })}
        className="space-y-6"
      >
        <Input
          autoFocus
          placeholder="Nome completo"
          error={errors.name?.message}
          {...register("name")}
        />
        <div>
          <label className="mb-2 block font-sans text-sm text-ink/60 dark:text-offwhite/60">
            Data de nascimento
          </label>
          <Input type="date" error={errors.birthDate?.message} {...register("birthDate")} />
        </div>

        <Controller
          control={control}
          name="sex"
          render={({ field }) => (
            <div className="space-y-3">
              {(Object.keys(PATIENT_SEX_LABELS) as PatientSex[]).map((option) => (
                <RadioCard
                  key={option}
                  label={PATIENT_SEX_LABELS[option]}
                  selected={field.value === option}
                  onSelect={() => field.onChange(option)}
                />
              ))}
              {errors.sex && <p className="text-sm text-red-500">{errors.sex.message}</p>}
            </div>
          )}
        />

        <Button type="submit" size="lg" className="w-full">
          Continuar
        </Button>
      </form>
    </StepShell>
  );
}
