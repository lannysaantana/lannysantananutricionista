"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { ClubButton } from "@/components/fitclub/ui/ClubButton";
import { StickerCard } from "@/components/fitclub/ui/StickerCard";
import { ChallengeLogo } from "@/components/fitclub/ChallengeLogo";

export function ChallengePaymentPending() {
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
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-club-black bg-club-gold text-club-black"
        >
          <Clock className="h-11 w-11" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8"
        >
          <h1 className="font-club-display text-2xl font-extrabold text-club-black sm:text-3xl">
            Seu pagamento está em análise.
          </h1>
          <p className="mt-4 font-club-sans text-base leading-relaxed text-club-black/70">
            Assim que for aprovado, envie o comprovante no WhatsApp para
            liberarmos seu acesso ao grupo oficial.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <Link href="/desafio-fitclub">
            <ClubButton size="lg" variant="pink">
              Voltar ao início
            </ClubButton>
          </Link>
        </motion.div>
      </StickerCard>
    </main>
  );
}
