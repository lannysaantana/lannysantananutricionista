"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre-mim", label: "Sobre Mim" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Perguntas Frequentes" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-sage/10 bg-offwhite/80 backdrop-blur-md dark:bg-[#20241f]/80"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-5">
        <Link href="#inicio" aria-label="Início" className="min-w-0 shrink">
          <Logo className="h-7 sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-6 font-sans text-sm text-ink/80 dark:text-offwhite/80 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-sage-dark dark:hover:text-gold">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:flex" />
          <Link href="/agendar" className="hidden sm:block">
            <Button variant="primary" size="sm">
              Agendar Consulta
            </Button>
          </Link>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-sage/10 dark:text-offwhite lg:hidden"
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
            className="overflow-hidden border-t border-sage/10 bg-offwhite dark:bg-[#20241f] lg:hidden"
          >
            <nav className="flex flex-col px-5 py-4 font-sans text-sm text-ink/80 dark:text-offwhite/80">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-sage/5 py-3 last:border-0 hover:text-sage-dark dark:hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
              <Link href="/agendar" className="mt-4 sm:hidden">
                <Button variant="primary" size="md" className="w-full">
                  Agendar Consulta
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
