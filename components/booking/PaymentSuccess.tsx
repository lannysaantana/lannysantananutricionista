"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function PaymentSuccess() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(sessionStorage.getItem("lanny-last-order-id"));
  }, []);

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
          Parabéns! Seu atendimento foi confirmado.
        </h1>
        <p className="mt-4 font-subtitle text-xl italic text-ink/70 dark:text-offwhite/70">
          Agora basta preencher sua Pré-Consulta para que possamos preparar um
          atendimento ainda mais personalizado.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        {orderId && (
          <Link href={`/pre-consulta/${orderId}`}>
            <Button size="lg" className="group">
              <ClipboardList className="h-4 w-4" />
              Preencher Pré-Consulta
            </Button>
          </Link>
        )}
        <Link href="/">
          <Button variant={orderId ? "outline" : "primary"} size={orderId ? "md" : "lg"}>
            Voltar ao início
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
