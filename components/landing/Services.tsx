"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils";
import { useServicePlans } from "@/hooks/usePricing";
import { formatCurrencyBRL } from "@/utils/formatters";

export function Services() {
  const { data: plans, isLoading } = useServicePlans(true);

  return (
    <section id="servicos" className="scroll-mt-20 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl text-ink dark:text-offwhite sm:text-4xl">
            Serviços
          </h2>
          <p className="mt-3 font-subtitle text-lg italic text-ink/60 dark:text-offwhite/60">
            Escolha a forma de atendimento que faz mais sentido para você.
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(plans ?? []).map((plan, index) => (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-8 shadow-soft transition-shadow hover:shadow-card",
                  plan.badge
                    ? "border-gold bg-gold/[0.06] shadow-gold lg:-translate-y-3"
                    : "border-sage/10 bg-white/70 dark:bg-white/5"
                )}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 font-sans text-xs font-medium uppercase tracking-wide text-ink shadow-gold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      {plan.badge}
                    </span>
                  </span>
                )}

                <h3 className="font-display text-xl text-ink dark:text-offwhite">{plan.name}</h3>
                <p className="mt-2 font-display text-3xl text-sage-dark dark:text-gold">
                  {formatCurrencyBRL(plan.base_price_cents)}
                </p>
                {plan.payment_note && (
                  <p className="mt-1 font-sans text-xs text-ink/50 dark:text-offwhite/50">
                    {plan.payment_note}
                  </p>
                )}

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 font-sans text-sm text-ink/80 dark:text-offwhite/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark dark:text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/agendar" className="mt-8">
                  <Button variant={plan.badge ? "gold" : "primary"} size="md" className="w-full">
                    Agendar
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
