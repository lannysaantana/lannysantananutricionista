"use client";

import { motion } from "framer-motion";
import { ClipboardList, HeartHandshake, Building2, Video, Headset } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

const BENEFITS = [
  {
    icon: ClipboardList,
    title: "Plano alimentar individual",
    description: "Construído para a sua rotina, seus gostos e seus objetivos.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento humanizado",
    description: "Escuta atenta e acompanhamento próximo em cada etapa.",
  },
  {
    icon: Building2,
    title: "Consulta presencial",
    description: "Ambiente acolhedor pensado para o seu conforto.",
  },
  {
    icon: Video,
    title: "Teleconsulta",
    description: "Atendimento por videochamada, onde você estiver.",
  },
  {
    icon: Headset,
    title: "Suporte personalizado",
    description: "Acompanhamento contínuo entre as consultas.",
  },
];

export function Benefits() {
  return (
    <section id="beneficios" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl text-ink dark:text-offwhite sm:text-4xl">
            Uma experiência pensada em cada detalhe
          </h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="h-full transition-shadow hover:shadow-card">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
                  <benefit.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <CardTitle>{benefit.title}</CardTitle>
                <CardDescription className="mt-2">{benefit.description}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
