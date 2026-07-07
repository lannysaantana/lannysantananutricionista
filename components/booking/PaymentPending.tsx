"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function PaymentPending() {
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
        <Clock className="h-11 w-11" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 max-w-md"
      >
        <h1 className="font-display text-2xl text-ink dark:text-offwhite sm:text-3xl">
          Seu pagamento está em análise.
        </h1>
        <p className="mt-4 font-subtitle text-xl italic text-ink/70 dark:text-offwhite/70">
          Assim que for aprovado você recebe a confirmação por e-mail e
          WhatsApp — normalmente leva só alguns minutos.
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
