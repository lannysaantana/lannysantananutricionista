"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { emailSchema } from "@/utils/validators";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({ email: emailSchema });

export function EmailStep() {
  const { data, setField, next, back } = useBookingStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: data.email },
  });

  return (
    <StepShell title="Qual seu e-mail?" onBack={back}>
      <form
        onSubmit={handleSubmit(({ email }) => {
          setField("email", email);
          next();
        })}
        className="space-y-6"
      >
        <Input
          autoFocus
          type="email"
          placeholder="seuemail@exemplo.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <Button type="submit" size="lg" className="w-full">
          Continuar
        </Button>
      </form>
    </StepShell>
  );
}
