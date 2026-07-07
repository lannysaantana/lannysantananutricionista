"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function PaymentError() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-noise px-5 py-16 text-center">
      <Link href="/" className="mb-12" aria-label="Início">
        <Logo />
      </Link>

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500"
      >
        <XCircle className="h-11 w-11" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 max-w-md"
      >
        <h1 className="font-display text-2xl text-ink dark:text-offwhite sm:text-3xl">
          Não conseguimos confirmar seu pagamento.
        </h1>
        <p className="mt-4 font-subtitle text-xl italic text-ink/70 dark:text-offwhite/70">
          Nenhum valor foi cobrado. Você pode tentar novamente ou falar com a
          gente pelo WhatsApp.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        <Link href="/agendar">
          <Button size="lg">Tentar novamente</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="md">
            Voltar ao início
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
