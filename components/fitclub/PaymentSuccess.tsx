"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList, MessageCircle } from "lucide-react";
import { ClubButton } from "@/components/fitclub/ui/ClubButton";
import { StickerCard } from "@/components/fitclub/ui/StickerCard";
import { ChallengeLogo } from "@/components/fitclub/ChallengeLogo";
import { FloatingSticker } from "@/components/fitclub/ui/Stickers";
import { CHALLENGE_PROOF_WHATSAPP } from "@/lib/config";
import { toWhatsAppLink } from "@/utils/formatters";

const PROOF_MESSAGE =
  "Olá! Acabei de me inscrever no Desafio Fit Club — 21 Dias e estou enviando o comprovante do meu pagamento.";

export function ChallengePaymentSuccess() {
  const searchParams = useSearchParams();
  const [signupId, setSignupId] = useState<string | null>(null);

  useEffect(() => {
    setSignupId(searchParams.get("signup_id") ?? sessionStorage.getItem("lanny-fitclub-signup-id"));
  }, [searchParams]);

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
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-club-black bg-club-neon text-club-black"
        >
          <CheckCircle2 className="h-11 w-11" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8"
        >
          <h1 className="font-club-display text-2xl font-extrabold text-club-black sm:text-3xl">
            Pagamento confirmado! 🎉
          </h1>
          <p className="mt-4 font-club-sans text-base leading-relaxed text-club-black/70">
            Falta só preencher sua anamnese para eu montar seu cardápio
            individualizado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          {signupId && (
            <Link href={`/desafio-fitclub/anamnese/${signupId}`} className="w-full">
              <ClubButton size="lg" variant="pink" className="group w-full">
                <ClipboardList className="h-4 w-4" />
                Preencher anamnese
              </ClubButton>
            </Link>
          )}
          <a
            href={toWhatsAppLink(CHALLENGE_PROOF_WHATSAPP, PROOF_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <ClubButton size={signupId ? "sm" : "lg"} variant={signupId ? "white" : "pink"} className="group w-full">
              <MessageCircle className="h-4 w-4" />
              Enviar comprovante no WhatsApp
            </ClubButton>
          </a>
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
