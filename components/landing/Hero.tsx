"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-noise px-5 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-sans text-xs uppercase tracking-widest text-sage-dark dark:text-gold">
            <Leaf className="h-3.5 w-3.5" />
            Nutrição de alto padrão
          </span>

          <h1 className="font-display text-4xl leading-[1.1] text-ink dark:text-offwhite sm:text-5xl lg:text-6xl">
            Nutrição personalizada para{" "}
            <span className="text-gradient-gold">transformar sua saúde</span>
          </h1>

          <p className="mt-6 max-w-xl font-subtitle text-xl italic leading-relaxed text-ink/70 dark:text-offwhite/70 sm:text-2xl">
            Cada plano alimentar é desenvolvido de forma individualizada,
            respeitando sua rotina, seus objetivos e sua saúde.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/agendar">
              <Button size="lg" className="group">
                Agendar Consulta
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="#como-funciona">
              <Button variant="outline" size="lg">
                Como funciona
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold/20 via-transparent to-sage/20" />
          <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-sage/10 bg-beige shadow-card dark:bg-white/5">
            <Image
              src="/images/foto-institucional.jpg"
              alt="Lanny Santana, nutricionista"
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-[50%_18%]"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
