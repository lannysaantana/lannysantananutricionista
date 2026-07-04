"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="px-5 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl rounded-[2.5rem] border border-gold/20 bg-gradient-to-br from-sage-dark to-sage px-8 py-16 text-center shadow-card sm:px-16"
      >
        <h2 className="font-display text-3xl text-offwhite sm:text-4xl">
          Sua transformação começa hoje.
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-subtitle text-xl italic text-offwhite/80">
          Agende sua consulta e dê o primeiro passo para conquistar uma
          alimentação mais saudável.
        </p>
        <Link href="/agendar" className="mt-8 inline-block">
          <Button variant="gold" size="lg" className="group">
            Agendar Consulta
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
