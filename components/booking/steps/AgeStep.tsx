"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ageSchema } from "@/utils/validators";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({ age: ageSchema });

export function AgeStep() {
  const { data, setField, next, back } = useBookingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { age: data.age ?? undefined },
  });

  return (
    <StepShell title="Qual sua idade?" onBack={back}>
      <form
        onSubmit={handleSubmit(({ age }) => {
          setField("age", age);
          next();
        })}
        className="space-y-6"
      >
        <Input
          autoFocus
          type="number"
          inputMode="numeric"
          placeholder="Idade"
          error={errors.age?.message}
          {...register("age", { valueAsNumber: true })}
        />
        <Button type="submit" size="lg" className="w-full">
          Continuar
        </Button>
      </form>
    </StepShell>
  );
}
