"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-sage/10 bg-offwhite/80 backdrop-blur-md dark:bg-[#20241f]/80"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-5">
        <Link href="/" aria-label="Início" className="min-w-0 shrink">
          <Logo className="h-7 sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-8 font-sans text-sm text-ink/80 dark:text-offwhite/80 md:flex">
          <a href="#beneficios" className="hover:text-sage-dark dark:hover:text-gold">
            Benefícios
          </a>
          <a href="#como-funciona" className="hover:text-sage-dark dark:hover:text-gold">
            Como funciona
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:flex" />
          <Link href="/agendar">
            <Button variant="gold" size="sm">
              Agendar Consulta
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
