"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Wallet, ClipboardList, Copy, Check, MessageCircle } from "lucide-react";
import { ClubButton } from "@/components/fitclub/ui/ClubButton";
import { StickerCard } from "@/components/fitclub/ui/StickerCard";
import { ChallengeLogo } from "@/components/fitclub/ChallengeLogo";
import { FloatingSticker } from "@/components/fitclub/ui/Stickers";
import { PIX_KEY, PIX_KEY_TYPE, PIX_RECIPIENT_NAME, PIX_BANK_NAME, CHALLENGE_PROOF_WHATSAPP } from "@/lib/config";
import { formatCurrencyBRL, toWhatsAppLink } from "@/utils/formatters";

export function ChallengePaymentPix() {
  const searchParams = useSearchParams();
  const [signupId, setSignupId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const amountCents = Number(searchParams.get("amount") ?? 0);

  useEffect(() => {
    setSignupId(searchParams.get("signup_id") ?? sessionStorage.getItem("lanny-fitclub-signup-id"));
  }, [searchParams]);

  function handleCopy() {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const proofMessage = `Olá! Acabei de me inscrever no Desafio Fit Club — 21 Dias${
    amountCents ? ` (${formatCurrencyBRL(amountCents)})` : ""
  } e vou enviar o comprovante do Pix.`;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16 text-center">
      <FloatingSticker kind="star" className="left-[8%] top-[12%] h-10 w-10 text-club-pink" />
      <FloatingSticker kind="sparkle" className="right-[8%] bottom-[16%] h-10 w-10 text-club-gold" style={{ animationDelay: "0.4s" }} />

      <Link href="/desafio-fitclub" className="mb-10" aria-label="Início">
        <ChallengeLogo />
      </Link>

      <StickerCard bg="white" className="relative max-w-md p-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-club-black bg-club-gold text-club-black"
        >
          <Wallet className="h-11 w-11" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8"
        >
          <h1 className="font-club-display text-2xl font-extrabold text-club-black sm:text-3xl">
            Falta só o pagamento via Pix
          </h1>
          <p className="mt-4 font-club-sans text-base leading-relaxed text-club-black/70">
            Pague com a chave abaixo e envie o comprovante pelo WhatsApp pra confirmarmos sua vaga.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 rounded-2xl border-[3px] border-club-black bg-club-neon p-5 text-left"
        >
          {amountCents > 0 && (
            <div className="mb-4 text-center">
              <p className="font-club-sans text-xs font-bold uppercase tracking-widest text-club-black/60">
                Valor a pagar
              </p>
              <p className="font-club-display text-3xl font-extrabold text-club-black">
                {formatCurrencyBRL(amountCents)}
              </p>
            </div>
          )}

          <div className="rounded-xl border-2 border-club-black bg-club-white p-4">
            <p className="font-club-sans text-xs font-bold uppercase tracking-widest text-club-black/50">
              Chave Pix ({PIX_KEY_TYPE})
            </p>
            <div className="mt-1 flex items-center justify-between gap-3">
              <p className="font-club-sans text-lg font-bold text-club-black">{PIX_KEY}</p>
              <button
                type="button"
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-1.5 rounded-full border-2 border-club-black bg-club-pink px-3 py-1.5 font-club-sans text-xs font-bold text-club-black"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
          </div>

          <p className="mt-3 font-club-sans text-sm font-medium text-club-black/70">
            {PIX_RECIPIENT_NAME} · {PIX_BANK_NAME}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <a
            href={toWhatsAppLink(CHALLENGE_PROOF_WHATSAPP, proofMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <ClubButton size="lg" variant="pink" className="group w-full">
              <MessageCircle className="h-4 w-4" />
              Enviar comprovante no WhatsApp
            </ClubButton>
          </a>
          {signupId && (
            <Link href={`/desafio-fitclub/anamnese/${signupId}`} className="w-full">
              <ClubButton variant="white" size="md" className="w-full">
                <ClipboardList className="h-4 w-4" />
                Preencher anamnese
              </ClubButton>
            </Link>
          )}
          <Link href="/desafio-fitclub">
            <ClubButton variant="white" size="sm">
              Voltar ao início
            </ClubButton>
          </Link>
        </motion.div>
      </StickerCard>
    </main>
  );
}
