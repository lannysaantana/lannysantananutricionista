"use client";

import { motion } from "framer-motion";
import { Target, CalendarCheck, CreditCard, FileText, CheckCircle2 } from "lucide-react";

const STEPS = [
  { icon: Target, title: "Escolha o tipo de atendimento" },
  { icon: CalendarCheck, title: "Selecione o melhor horário" },
  { icon: CreditCard, title: "Realize o pagamento" },
  { icon: FileText, title: "Receba acesso à Pré-Consulta" },
  { icon: CheckCircle2, title: "Compareça à consulta" },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-20 bg-beige/60 px-5 py-20 dark:bg-white/[0.03] sm:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center font-display text-3xl text-ink dark:text-offwhite sm:text-4xl"
        >
          Como funciona
        </motion.h2>

        <ol className="grid gap-8 sm:grid-cols-5 sm:gap-4">
          {STEPS.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              {index < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-7 hidden h-[2px] w-full -translate-x-0 bg-gradient-to-r from-gold/50 to-transparent sm:block"
                />
              )}
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-offwhite text-sage-dark shadow-soft dark:bg-[#20241f] dark:text-gold">
                <step.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span className="mt-4 font-sans text-xs uppercase tracking-widest text-gold">
                Passo {index + 1}
              </span>
              <span className="mt-1 font-sans text-sm text-ink dark:text-offwhite">
                {step.title}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
