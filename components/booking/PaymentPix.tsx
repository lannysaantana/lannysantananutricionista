"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Wallet, ClipboardList, Copy, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { PIX_KEY, PIX_KEY_TYPE, PIX_RECIPIENT_NAME, PIX_BANK_NAME, BUSINESS_WHATSAPP } from "@/lib/config";
import { formatCurrencyBRL, toWhatsAppLink } from "@/utils/formatters";

export function PaymentPix() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const amountCents = Number(searchParams.get("amount") ?? 0);

  useEffect(() => {
    setOrderId(searchParams.get("order_id") ?? sessionStorage.getItem("lanny-last-order-id"));
  }, [searchParams]);

  function handleCopy() {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const proofMessage = `Olá! Acabei de agendar minha consulta${
    amountCents ? ` (${formatCurrencyBRL(amountCents)})` : ""
  } e vou enviar o comprovante do Pix.`;

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
        <Wallet className="h-11 w-11" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 max-w-md"
      >
        <h1 className="font-display text-2xl text-ink dark:text-offwhite sm:text-3xl">
          Falta só o pagamento via Pix
        </h1>
        <p className="mt-4 font-subtitle text-xl italic text-ink/70 dark:text-offwhite/70">
          Pague com a chave abaixo e envie o comprovante pelo WhatsApp para
          confirmarmos seu agendamento.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 w-full max-w-md rounded-3xl border border-sage/10 bg-white/70 p-6 text-left shadow-soft dark:bg-white/5"
      >
        {amountCents > 0 && (
          <div className="mb-4 text-center">
            <p className="font-sans text-xs uppercase tracking-widest text-ink/50 dark:text-offwhite/50">
              Valor a pagar
            </p>
            <p className="font-display text-3xl text-sage-dark dark:text-gold">
              {formatCurrencyBRL(amountCents)}
            </p>
          </div>
        )}

        <div className="rounded-2xl bg-sage/5 p-4">
          <p className="font-sans text-xs uppercase tracking-widest text-ink/50 dark:text-offwhite/50">
            Chave Pix ({PIX_KEY_TYPE})
          </p>
          <div className="mt-1 flex items-center justify-between gap-3">
            <p className="font-sans text-lg font-medium text-ink dark:text-offwhite">{PIX_KEY}</p>
            <button
              type="button"
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 font-sans text-xs font-medium text-sage-dark dark:text-gold"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>

        <p className="mt-3 font-sans text-sm text-ink/60 dark:text-offwhite/60">
          {PIX_RECIPIENT_NAME} · {PIX_BANK_NAME}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 flex flex-col items-center gap-3"
      >
        <a href={toWhatsAppLink(BUSINESS_WHATSAPP, proofMessage)} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="group">
            <MessageCircle className="h-4 w-4" />
            Enviar comprovante pelo WhatsApp
          </Button>
        </a>
        {orderId && (
          <Link href={`/pre-consulta/${orderId}`}>
            <Button variant="outline" size="md">
              <ClipboardList className="h-4 w-4" />
              Preencher Pré-Consulta
            </Button>
          </Link>
        )}
        <Link href="/">
          <Button variant="outline" size="md">
            Voltar ao início
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
