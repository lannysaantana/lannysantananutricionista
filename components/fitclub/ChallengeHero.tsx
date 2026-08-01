"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ClubButton } from "@/components/fitclub/ui/ClubButton";
import { ChallengeLogo } from "@/components/fitclub/ChallengeLogo";
import { ClubTag } from "@/components/fitclub/ui/StickerCard";
import { FloatingSticker, Checkerboard } from "@/components/fitclub/ui/Stickers";
import { formatCurrencyBRL } from "@/utils/formatters";
import { CHALLENGE_PRICE_CENTS, CHALLENGE_START_DATE_LABEL, CHALLENGE_END_DATE_LABEL } from "@/lib/config";

const HIGHLIGHTS = [
  { label: "21 dias de desafio", bg: "bg-club-neon" },
  { label: "Cardápio individualizado", bg: "bg-club-pink-light" },
  { label: "Ranking diário + premiações", bg: "bg-club-blue" },
];

export function ChallengeHero() {
  return (
    <section id="topo" className="relative overflow-hidden px-5 pb-24 pt-14 sm:pt-20">
      <FloatingSticker kind="star" className="left-[4%] top-[8%] h-10 w-10 text-club-pink sm:h-14 sm:w-14" style={{ animationDelay: "0s" }} />
      <FloatingSticker kind="sparkle" className="right-[6%] top-[14%] h-8 w-8 text-club-gold sm:h-12 sm:w-12" style={{ animationDelay: "0.6s" }} />
      <FloatingSticker kind="smiley" className="left-[8%] top-[62%] h-10 w-10 text-club-neon sm:h-14 sm:w-14" style={{ animationDelay: "1.1s" }} />
      <FloatingSticker kind="flower" className="right-[7%] bottom-[10%] h-12 w-12 text-club-pink sm:h-16 sm:w-16" style={{ animationDelay: "0.3s" }} />
      <FloatingSticker kind="lightning" className="right-[16%] top-[4%] hidden h-10 w-10 -rotate-12 text-club-lilac sm:block" style={{ animationDelay: "0.9s" }} />
      <Checkerboard
        className="absolute left-[2%] bottom-[22%] hidden h-16 w-16 rotate-12 rounded-xl border-[3px] border-club-black sm:block"
        colorA="#0B0B0B"
        colorB="#CBB4FF"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-8 flex justify-center"
        >
          <ChallengeLogo size="hero" className="rotate-[-2deg]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <ClubTag bg="neon">2ª edição • Vagas limitadas</ClubTag>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="mt-6 font-club-display text-4xl font-extrabold leading-[1.05] text-club-white sm:text-5xl lg:text-6xl"
        >
          O Desafio{" "}
          <span className="text-club-pink">Fit Club</span> está de volta!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl font-club-sans text-lg leading-relaxed text-club-white/75 sm:text-xl"
        >
          21 dias de foco, constância e muito acompanhamento para quem quer
          finalmente ter resultados — não importa se seu objetivo é emagrecer
          ou ganhar massa muscular.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mx-auto mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          {HIGHLIGHTS.map((item, i) => (
            <span
              key={item.label}
              className={`rounded-full border-[3px] border-club-black px-4 py-2 font-club-sans text-sm font-bold text-club-black shadow-sticker ${item.bg}`}
              style={{ transform: `rotate(${i % 2 === 0 ? "-1.5deg" : "1.5deg"})` }}
            >
              {item.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <a href="#inscricao">
            <ClubButton size="lg" variant="pink" className="group animate-pulse-scale">
              Quero Participar — {formatCurrencyBRL(CHALLENGE_PRICE_CENTS)}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </ClubButton>
          </a>
          <p className="font-club-sans text-xs font-bold uppercase tracking-widest text-club-white/50">
            De {CHALLENGE_START_DATE_LABEL} até {CHALLENGE_END_DATE_LABEL}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
