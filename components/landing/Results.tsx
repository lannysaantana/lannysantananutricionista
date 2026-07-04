"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";

// TODO: substituir pelos relatos e avaliações reais dos pacientes assim que
// disponíveis — mantidos como exemplo estrutural até lá.
const HIGHLIGHTS = [
  { quote: "Espaço reservado para um relato real de paciente.", initials: "•" },
  { quote: "Espaço reservado para um relato real de paciente.", initials: "•" },
  { quote: "Espaço reservado para um relato real de paciente.", initials: "•" },
];

export function Results() {
  return (
    <section id="resultados" className="scroll-mt-20 bg-beige/60 px-5 py-20 dark:bg-white/[0.03] sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 flex justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold" />
            ))}
          </div>
          <h2 className="font-display text-3xl text-ink dark:text-offwhite sm:text-4xl">
            Resultados que fazem a diferença
          </h2>
          <p className="mt-3 font-subtitle text-lg italic text-ink/60 dark:text-offwhite/60">
            Acompanhamento próximo, focado na sua evolução real.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="mb-3 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                  ))}
                </div>
                <p className="font-subtitle text-base italic leading-relaxed text-ink/70 dark:text-offwhite/70">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
