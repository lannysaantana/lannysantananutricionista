"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClubTag } from "@/components/fitclub/ui/StickerCard";

const RULES_ITEMS = [
  {
    question: "Como funciona o símbolo do dia?",
    answer:
      "Todos os dias divulgo um símbolo oficial (por exemplo: 👍 ✌️ 🫶 👌). Esse símbolo deve aparecer nas fotos ou vídeos enviados como comprovante das atividades do dia, garantindo que todos os registros foram feitos no mesmo dia — mantendo a competição justa para todas.",
  },
  {
    question: "Onde envio meus comprovantes?",
    answer:
      "Todos os comprovantes (treino, alimentação, hidratação e stories) devem ser enviados no grupo oficial do WhatsApp do desafio, ao qual você tem acesso em até 24 horas após a confirmação do pagamento.",
  },
  {
    question: "O que preciso preencher antes do início?",
    answer:
      "Antes do início você preenche um formulário com: nome completo, idade, altura e peso, objetivo (emagrecimento ou hipertrofia), circunferências corporais (cintura, abdômen e quadril), fotos para avaliação física (frente e perfil), preferências e aversões alimentares, alergias e intolerâncias, horários das refeições, frequência e horário dos treinos, uso de medicamentos e outras informações relevantes.",
  },
  {
    question: "O ranking é diferente para quem quer emagrecer ou ganhar massa?",
    answer:
      "Não. O ranking é baseado na constância e no cumprimento das atividades diárias, não no objetivo escolhido — participantes com objetivos diferentes competem em igualdade de condições, enquanto cada uma segue um plano alimentar específico para alcançar seus próprios resultados.",
  },
  {
    question: "Como recebo meu cardápio personalizado?",
    answer:
      "Com base no formulário e na avaliação física, você recebe um plano alimentar totalmente individualizado, elaborado de acordo com seu objetivo, rotina e necessidades, enviado diretamente pelo WhatsApp antes do início do desafio, junto com todas as orientações necessárias.",
  },
  {
    question: "Como acompanho minha posição no ranking?",
    answer:
      "Ao final de cada dia é enviada a planilha atualizada com a pontuação de todas as participantes. Ao final de cada semana, divulgo o ranking geral com a classificação atualizada.",
  },
];

export function Rules() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="regulamento" className="scroll-mt-20 bg-club-black px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 text-center">
          <ClubTag bg="lilac">Regulamento</ClubTag>
        </div>
        <h2 className="mb-4 text-center font-club-display text-3xl font-extrabold text-club-white sm:text-4xl">
          Tudo o que você precisa saber
        </h2>
        <p className="mb-12 text-center font-club-sans text-lg text-club-white/70">
          Antes de se inscrever, dá uma olhada nas regras do desafio.
        </p>

        <div className="space-y-4">
          {RULES_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border-[3px] border-club-black bg-club-white shadow-sticker"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-club-sans text-sm font-bold text-club-black sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-club-pink transition-transform",
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
                      <p className="px-5 pb-4 font-club-sans text-sm leading-relaxed text-club-black/70">
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
