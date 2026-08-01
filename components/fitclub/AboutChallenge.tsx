"use client";

import { motion } from "framer-motion";
import { Dumbbell, Scale, ClipboardList, MessageCircleHeart } from "lucide-react";
import { StickerCard } from "@/components/fitclub/ui/StickerCard";
import { FloatingSticker } from "@/components/fitclub/ui/Stickers";

const OBJECTIVES = [
  {
    icon: Scale,
    title: "Emagrecimento",
    description: "Plano alimentar voltado à redução de gordura corporal, respeitando sua rotina.",
    rotate: "-1.5deg",
  },
  {
    icon: Dumbbell,
    title: "Hipertrofia",
    description: "Planejamento nutricional voltado para ganho de massa muscular.",
    rotate: "1.5deg",
  },
];

const STEPS = [
  {
    icon: ClipboardList,
    title: "Você preenche o formulário",
    description:
      "Preferências, aversões alimentares, alergias, rotina de treinos e avaliação física.",
  },
  {
    icon: MessageCircleHeart,
    title: "Eu monto seu plano",
    description:
      "Um cardápio pensado exclusivamente para você, considerando seu objetivo e sua rotina.",
  },
];

export function AboutChallenge() {
  return (
    <section id="sobre" className="relative scroll-mt-20 overflow-hidden bg-club-lilac px-5 py-20 sm:py-28">
      <FloatingSticker kind="sparkle" className="left-[5%] top-[8%] h-8 w-8 text-club-black sm:h-10 sm:w-10" />
      <FloatingSticker kind="star" className="right-[5%] bottom-[10%] h-10 w-10 text-club-pink sm:h-14 sm:w-14" style={{ animationDelay: "0.4s" }} />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-club-display text-3xl font-extrabold text-club-black sm:text-4xl">
            Não importa qual seja o seu objetivo
          </h2>
          <p className="mt-4 font-club-sans text-lg leading-relaxed text-club-black/80">
            No momento da inscrição você escolhe seu objetivo e eu monto um
            cardápio totalmente individualizado para você. Nada de dieta igual
            para todo mundo.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {OBJECTIVES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <StickerCard bg="white" rotate={item.rotate} className="p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-club-black bg-club-neon text-club-black">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-club-display text-xl font-extrabold text-club-black">{item.title}</h3>
                <p className="mt-2 font-club-sans text-sm leading-relaxed text-club-black/70">
                  {item.description}
                </p>
              </StickerCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <StickerCard bg="black" shadow="pink" className="p-8 sm:p-10">
            <h3 className="text-center font-club-display text-2xl font-extrabold text-club-white">
              Como funciona a personalização
            </h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] border-club-black bg-club-pink font-club-display text-sm font-extrabold text-club-black">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-club-sans font-bold text-club-white">{step.title}</p>
                    <p className="mt-1 font-club-sans text-sm leading-relaxed text-club-white/70">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-center font-club-sans text-sm text-club-white/60">
              Com base na sua avaliação física e no formulário, você recebe seu
              plano alimentar individualizado diretamente pelo WhatsApp — antes
              do início do desafio.
            </p>
          </StickerCard>
        </div>
      </div>
    </section>
  );
}
