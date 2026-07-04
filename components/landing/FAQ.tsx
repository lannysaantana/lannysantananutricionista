"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "Como funciona a consulta?",
    answer:
      "Na consulta inicial, entendemos juntos seu histórico, rotina e objetivos para montar um plano alimentar 100% individualizado.",
  },
  {
    question: "Quanto tempo dura?",
    answer:
      "A consulta inicial dura em média 50 a 60 minutos, com tempo dedicado a ouvir seu histórico com calma.",
  },
  {
    question: "Aceita plano de saúde?",
    answer:
      "O atendimento é particular. Posso emitir recibo para você solicitar reembolso junto ao seu convênio, quando aplicável.",
  },
  {
    question: "Como funciona a teleconsulta?",
    answer:
      "A teleconsulta acontece por videochamada em horário marcado. Você recebe o link por e-mail e WhatsApp antes do horário.",
  },
  {
    question: "Como funciona o retorno?",
    answer:
      "O retorno acompanha sua evolução e ajusta o plano conforme necessário, geralmente entre 20 e 30 dias após a consulta inicial.",
  },
  {
    question: "Posso remarcar?",
    answer: "Sim, é só entrar em contato pelo WhatsApp com antecedência para reagendar seu horário.",
  },
  {
    question: "Como é o pagamento?",
    answer: "O pagamento é feito de forma segura no ato do agendamento, via Pix, boleto ou cartão.",
  },
  {
    question: "Recebo plano alimentar?",
    answer: "Sim, você recebe um plano alimentar personalizado por escrito logo após a consulta.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-beige/60 px-5 py-20 dark:bg-white/[0.03] sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center font-display text-3xl text-ink dark:text-offwhite sm:text-4xl"
        >
          Perguntas Frequentes
        </motion.h2>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-sage/10 bg-white/70 dark:bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-sm font-medium text-ink dark:text-offwhite sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-sage-dark transition-transform dark:text-gold",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <p className="px-5 pb-4 font-sans text-sm leading-relaxed text-ink/70 dark:text-offwhite/70">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
