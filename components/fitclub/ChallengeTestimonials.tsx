"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { StickerCard, ClubTag } from "@/components/fitclub/ui/StickerCard";
import { FloatingSticker } from "@/components/fitclub/ui/Stickers";

// Depoimentos reais de participantes da 1ª edição (prints do WhatsApp).
const TESTIMONIALS = [
  {
    name: "Samyle",
    comment: "Eu amei! Foi uma ótima oportunidade pra melhorar meus hábitos, me senti mais incentivada.",
  },
  {
    name: "Participante",
    comment:
      "Participar do desafio foi uma experiência muito especial e transformadora para mim. Mais do que perder peso, aprendi a cuidar melhor da minha saúde, criar hábitos mais saudáveis e acreditar mais no meu potencial. Os resultados vão muito além da balança.",
  },
  {
    name: "Andressa",
    comment:
      "Acho que assumir a responsabilidade de criar uma plataforma gratuita e além de tudo dar todo suporte aqui sozinha é de admirar muito!!!",
  },
  {
    name: "Participante",
    comment:
      "Participar do Lanny Fit Club tem sido uma experiência muito positiva para mim. O grupo tem me ajudado a melhorar meus hábitos, principalmente em relação a alimentação saudável, a constância nos treinos e a maior ingestão de água. Ter esse acompanhamento e incentivo faz toda a diferença para manter o foco e a motivação.",
  },
  {
    name: "Anna",
    comment:
      "Eu tô achando um luxo a plataforma! Você tá sendo maravilhosa em disponibilizar todo esse material. Acho que todas estão vendo que nada aqui tá sendo feito de qualquer jeito.",
  },
  {
    name: "Luciana",
    comment: "Estou amando essa jornada e melhorando meus hábitos alimentares dia após dia. Vamos em frente!",
  },
];

const AUTOPLAY_MS = 6000;

export function ChallengeTestimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[index];
  if (!current) return null;

  return (
    <section id="depoimentos" className="relative scroll-mt-20 overflow-hidden px-5 py-20 sm:py-28">
      <FloatingSticker kind="heart" className="left-[8%] top-[12%] h-9 w-9 text-club-pink sm:h-12 sm:w-12" />
      <FloatingSticker kind="sparkle" className="right-[8%] bottom-[14%] h-8 w-8 text-club-gold sm:h-10 sm:w-10" style={{ animationDelay: "0.4s" }} />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mb-4">
          <ClubTag bg="pink" className="text-club-white">Quem já viveu</ClubTag>
        </div>
        <h2 className="mb-12 font-club-display text-3xl font-extrabold text-club-white sm:text-4xl">
          A 1ª edição do desafio
        </h2>

        <div className="relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <StickerCard bg="white" rotate="-1deg" className="p-8">
                <Quote className="mx-auto mb-4 h-8 w-8 text-club-pink" />
                <p className="font-club-sans text-lg leading-relaxed text-club-black/80">
                  &ldquo;{current.comment}&rdquo;
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-club-black bg-club-neon font-club-display text-lg font-extrabold text-club-black">
                    {current.name.charAt(0)}
                  </span>
                  <span className="text-left font-club-sans text-sm">
                    <span className="block font-bold text-club-black">
                      {current.name}
                    </span>
                  </span>
                </div>
              </StickerCard>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              aria-label={`Ver depoimento de ${t.name}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2.5 rounded-full border-2 border-club-black transition-all",
                i === index ? "w-7 bg-club-pink" : "w-2.5 bg-club-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
