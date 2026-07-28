"use client";

import { motion } from "framer-motion";
import {
  Scale,
  ClipboardList,
  Headset,
  FlaskConical,
  GraduationCap,
  Compass,
  CalendarClock,
  UserCheck,
} from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

const DIFFERENTIALS = [
  {
    icon: Scale,
    title: "Bioimpedância 3D",
    description: "Análise completa da composição corporal, feita online.",
  },
  {
    icon: ClipboardList,
    title: "Plano alimentar individualizado",
    description: "Nada de dietas prontas — o plano é construído com você.",
  },
  {
    icon: Headset,
    title: "Suporte próximo via WhatsApp",
    description: "Acompanhamento contínuo entre uma consulta e outra.",
  },
  {
    icon: FlaskConical,
    title: "Nutrição baseada em evidências científicas",
    description: "Estratégias respaldadas por ciência, não por modismos.",
  },
  {
    icon: GraduationCap,
    title: "Educação nutricional",
    description: "Você entende o porquê de cada orientação do seu plano.",
  },
  {
    icon: Compass,
    title: "Estratégias sustentáveis",
    description: "Mudanças que cabem na sua rotina e duram no longo prazo.",
  },
  {
    icon: CalendarClock,
    title: "Check-ins periódicos",
    description: "Ajustes ao longo do caminho para manter você no rumo certo.",
  },
  {
    icon: UserCheck,
    title: "Acompanhamento personalizado",
    description: "Cada consulta é pensada para a sua rotina e seus objetivos.",
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="scroll-mt-20 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl text-ink dark:text-offwhite sm:text-4xl">
            Por que escolher meu acompanhamento?
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIALS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <Card className="h-full transition-shadow hover:shadow-card">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
                  <item.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="mt-2">{item.description}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
