"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { ChallengeLogo } from "@/components/fitclub/ChallengeLogo";
import { ClubButton } from "@/components/fitclub/ui/ClubButton";

const NAV_LINKS = [
  { href: "#sobre", label: "O Desafio" },
  { href: "#pontuacao", label: "Como Funciona" },
  { href: "#premiacao", label: "Premiação" },
  { href: "#regulamento", label: "Regulamento" },
  { href: "#depoimentos", label: "Depoimentos" },
];

export function ChallengeHeader() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b-[3px] border-club-black bg-club-black/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <Link href="/desafio-fitclub" aria-label="Início">
          <ChallengeLogo />
        </Link>

        <nav className="hidden items-center gap-1 font-club-sans text-sm font-bold uppercase tracking-wide text-club-white lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition-colors hover:bg-club-white/10 hover:text-club-neon"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#inscricao" className="hidden sm:block">
            <ClubButton variant="pink" size="sm" className="group">
              Quero Participar
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </ClubButton>
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-club-black bg-club-neon text-club-black lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t-[3px] border-club-black bg-club-black lg:hidden"
          >
            <nav className="flex flex-col px-5 py-4 font-club-sans text-sm font-bold uppercase tracking-wide text-club-white">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-club-white/10 py-3 last:border-0 hover:text-club-neon"
                >
                  {link.label}
                </a>
              ))}
              <a href="#inscricao" className="mt-4" onClick={() => setOpen(false)}>
                <ClubButton variant="pink" size="md" className="w-full">
                  Quero Participar
                </ClubButton>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
