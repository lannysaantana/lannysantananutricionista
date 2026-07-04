"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function PaymentSuccess() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-noise px-5 py-16 text-center">
      <Link href="/" className="mb-12" aria-label="Início">
        <Logo />
      </Link>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-sage-dark dark:text-gold"
      >
        <CheckCircle2 className="h-11 w-11" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 max-w-md"
      >
        <h1 className="font-display text-2xl text-ink dark:text-offwhite sm:text-3xl">
          Pagamento realizado com sucesso.
        </h1>
        <p className="mt-4 font-subtitle text-xl italic text-ink/70 dark:text-offwhite/70">
          Seu horário foi reservado.
        </p>
        <p className="mt-2 flex items-center justify-center gap-2 font-sans text-sm text-ink/60 dark:text-offwhite/60">
          <MessageCircle className="h-4 w-4 text-sage-dark dark:text-gold" />
          Em breve entraremos em contato pelo WhatsApp.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10"
      >
        <Link href="/">
          <Button size="lg">Voltar ao início</Button>
        </Link>
      </motion.div>
    </main>
  );
}
