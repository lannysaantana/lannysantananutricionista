"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: substituir pelos depoimentos reais dos pacientes (nome, cidade,
// foto e comentário) — mantidos como exemplo estrutural até lá.
const TESTIMONIALS = [
  {
    name: "Paciente A",
    city: "Cidade, UF",
    comment: "Espaço reservado para o depoimento real deste paciente.",
  },
  {
    name: "Paciente B",
    city: "Cidade, UF",
    comment: "Espaço reservado para o depoimento real deste paciente.",
  },
  {
    name: "Paciente C",
    city: "Cidade, UF",
    comment: "Espaço reservado para o depoimento real deste paciente.",
  },
];

const AUTOPLAY_MS = 6000;

export function Testimonials() {
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
    <section id="depoimentos" className="scroll-mt-20 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 font-display text-3xl text-ink dark:text-offwhite sm:text-4xl"
        >
          O que dizem meus pacientes
        </motion.h2>

        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <Quote className="mb-4 h-8 w-8 text-gold" />
              <p className="font-subtitle text-xl italic leading-relaxed text-ink/80 dark:text-offwhite/80">
                &ldquo;{current.comment}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/10 font-display text-lg text-sage-dark dark:text-gold">
                  {current.name.charAt(0)}
                </span>
                <span className="text-left font-sans text-sm">
                  <span className="block font-medium text-ink dark:text-offwhite">
                    {current.name}
                  </span>
                  <span className="block text-ink/50 dark:text-offwhite/50">{current.city}</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Ver depoimento de ${t.name}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-gold" : "w-2 bg-sage/20"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
