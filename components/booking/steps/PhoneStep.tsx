"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { phoneSchema } from "@/utils/validators";
import { formatPhoneInput } from "@/utils/formatters";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({ phone: phoneSchema });

export function PhoneStep() {
  const { data, setField, next, back } = useBookingStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { phone: data.phone },
  });

  return (
    <StepShell title="Qual seu telefone?" subtitle="Usaremos para confirmar sua consulta pelo WhatsApp." onBack={back}>
      <form
        onSubmit={handleSubmit(({ phone }) => {
          setField("phone", phone);
          next();
        })}
        className="space-y-6"
      >
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              autoFocus
              type="tel"
              inputMode="numeric"
              placeholder="(00) 00000-0000"
              error={errors.phone?.message}
              value={field.value}
              onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
            />
          )}
        />
        <Button type="submit" size="lg" className="w-full">
          Continuar
        </Button>
      </form>
    </StepShell>
  );
}
