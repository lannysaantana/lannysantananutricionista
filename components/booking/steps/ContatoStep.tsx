"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contatoSchema } from "@/utils/validators";
import { formatPhoneInput } from "@/utils/formatters";
import { useBookingStore } from "@/hooks/useBookingStore";
import { StepShell } from "@/components/booking/StepShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type FormValues = z.infer<typeof contatoSchema>;

export function ContatoStep() {
  const { data, setField, next, back } = useBookingStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contatoSchema),
    defaultValues: { phone: data.phone, whatsapp: data.whatsapp, email: data.email },
  });

  return (
    <StepShell title="Como podemos falar com você?" subtitle="Seus contatos." onBack={back}>
      <form
        onSubmit={handleSubmit((values) => {
          setField("phone", values.phone);
          setField("whatsapp", values.whatsapp);
          setField("email", values.email);
          next();
        })}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block font-sans text-sm text-ink/60 dark:text-offwhite/60">
            Telefone
          </label>
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
        </div>

        <div>
          <label className="mb-2 block font-sans text-sm text-ink/60 dark:text-offwhite/60">
            WhatsApp
          </label>
          <Controller
            control={control}
            name="whatsapp"
            render={({ field }) => (
              <Input
                type="tel"
                inputMode="numeric"
                placeholder="(00) 00000-0000"
                error={errors.whatsapp?.message}
                value={field.value}
                onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
              />
            )}
          />
        </div>

        <div>
          <label className="mb-2 block font-sans text-sm text-ink/60 dark:text-offwhite/60">
            E-mail
          </label>
          <Input
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Continuar
        </Button>
      </form>
    </StepShell>
  );
}
