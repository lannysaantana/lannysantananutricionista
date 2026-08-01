"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { ClubButton } from "@/components/fitclub/ui/ClubButton";
import { StickerCard } from "@/components/fitclub/ui/StickerCard";
import { ChallengeLogo } from "@/components/fitclub/ChallengeLogo";

export function ChallengePaymentError() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
      <Link href="/desafio-fitclub" className="mb-10" aria-label="Início">
        <ChallengeLogo />
      </Link>

      <StickerCard bg="white" className="max-w-md p-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-club-black bg-club-pink text-club-black"
        >
          <XCircle className="h-11 w-11" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8"
        >
          <h1 className="font-club-display text-2xl font-extrabold text-club-black sm:text-3xl">
            Não conseguimos confirmar seu pagamento.
          </h1>
          <p className="mt-4 font-club-sans text-base leading-relaxed text-club-black/70">
            Nenhum valor foi cobrado. Você pode tentar novamente ou falar com a
            gente pelo WhatsApp.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <Link href="/desafio-fitclub#inscricao" className="w-full">
            <ClubButton size="lg" variant="pink" className="w-full">
              Tentar novamente
            </ClubButton>
          </Link>
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
