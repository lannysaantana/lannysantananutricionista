"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Award, Stethoscope } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/config";

// TODO: substituir pelos dados reais (especializações, cursos e áreas de
// atuação) — mantidos como exemplo até serem confirmados.
const SPECIALIZATIONS = ["Nutrição Clínica", "Nutrição Esportiva", "Nutrição Materno-Infantil"];
const COURSES = ["Bioimpedância e Avaliação Física", "Prescrição de Suplementação"];
const AREAS = ["Emagrecimento", "Hipertrofia", "Reeducação alimentar", "Saúde intestinal", "Gestação"];

export function AboutMe() {
  return (
    <section id="sobre-mim" className="scroll-mt-20 px-5 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:order-2"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sage/20 via-transparent to-gold/20" />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-sage/10 bg-beige shadow-card dark:bg-white/5">
            <Image
              src="/images/foto-institucional.jpg"
              alt="Lanny Santana, nutricionista"
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover object-[50%_15%]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:order-1"
        >
          <h2 className="font-display text-3xl text-ink dark:text-offwhite sm:text-4xl">
            Sobre Mim
          </h2>
          <p className="mt-3 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-sage-dark dark:text-gold">
            <Stethoscope className="h-4 w-4" />
            {BUSINESS_INFO.crn}
          </p>

          <p className="mt-6 font-subtitle text-xl italic leading-relaxed text-ink/70 dark:text-offwhite/70">
            Acredito que nutrição de verdade se constrói com escuta, respeito
            ao seu tempo e ciência — sem fórmulas prontas. Meu propósito é
            caminhar ao seu lado até você conquistar uma relação leve e
            duradoura com a comida.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 flex items-center gap-2 font-sans text-sm font-medium text-ink dark:text-offwhite">
                <GraduationCap className="h-4 w-4 text-sage-dark dark:text-gold" />
                Especializações
              </p>
              <ul className="space-y-1 font-sans text-sm text-ink/70 dark:text-offwhite/70">
                {SPECIALIZATIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-2 font-sans text-sm font-medium text-ink dark:text-offwhite">
                <Award className="h-4 w-4 text-sage-dark dark:text-gold" />
                Cursos complementares
              </p>
              <ul className="space-y-1 font-sans text-sm text-ink/70 dark:text-offwhite/70">
                {COURSES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 font-sans text-sm font-medium text-ink dark:text-offwhite">
              Áreas de atuação
            </p>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-sage/20 bg-sage/5 px-3 py-1 font-sans text-xs text-ink/70 dark:text-offwhite/70"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
