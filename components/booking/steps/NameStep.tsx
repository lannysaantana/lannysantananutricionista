"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { nameSchema } from "@/utils/validators";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({ name: nameSchema });

export function NameStep() {
  const { data, setField, next } = useBookingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: data.name },
  });

  return (
    <StepShell title="Qual seu nome?" subtitle="Para começarmos com o pé direito.">
      <form
        onSubmit={handleSubmit(({ name }) => {
          setField("name", name);
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
        <Button type="submit" size="lg" className="w-full">
          Continuar
        </Button>
      </form>
    </StepShell>
  );
}
