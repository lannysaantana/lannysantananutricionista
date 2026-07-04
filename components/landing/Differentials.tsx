"use client";

import { motion } from "framer-motion";
import {
  UserCheck,
  ClipboardList,
  Activity,
  Scale,
  Video,
  Building2,
  Headset,
  Trophy,
} from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

const DIFFERENTIALS = [
  {
    icon: UserCheck,
    title: "Atendimento individualizado",
    description: "Cada consulta é pensada para a sua rotina e seus objetivos.",
  },
  {
    icon: ClipboardList,
    title: "Plano alimentar personalizado",
    description: "Nada de dietas prontas — o plano é construído com você.",
  },
  {
    icon: Activity,
    title: "Avaliação física completa",
    description: "Acompanhamento de medidas e evolução ao longo do processo.",
  },
  {
    icon: Scale,
    title: "Bioimpedância",
    description: "Análise de composição corporal presencial ou online.",
  },
  {
    icon: Video,
    title: "Teleconsulta",
    description: "Atendimento por videochamada, onde você estiver.",
  },
  {
    icon: Building2,
    title: "Consulta presencial",
    description: "Ambiente acolhedor pensado para o seu conforto.",
  },
  {
    icon: Headset,
    title: "Suporte online",
    description: "Acompanhamento contínuo entre uma consulta e outra.",
  },
  {
    icon: Trophy,
    title: "Plataforma exclusiva de desafios",
    description: "Motivação extra para manter o foco nos seus resultados.",
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
