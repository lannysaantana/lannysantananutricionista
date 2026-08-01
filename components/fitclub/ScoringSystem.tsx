"use client";

import { motion } from "framer-motion";
import { Dumbbell, Salad, Droplets, Camera, Sparkles, HeartPulse, Hash } from "lucide-react";
import { StickerCard, ClubTag } from "@/components/fitclub/ui/StickerCard";
import { FloatingSticker } from "@/components/fitclub/ui/Stickers";

const DAILY_POINTS = [
  {
    icon: Dumbbell,
    label: "Treino",
    points: "+10",
    description: "1 foto ou vídeo do seu treino. Apenas um envio por dia é contabilizado.",
    bg: "pink" as const,
    rotate: "-1.5deg",
  },
  {
    icon: Salad,
    label: "Alimentação",
    points: "+5",
    description: "1 foto de qualquer refeição do dia (café, lanche, almoço, jantar ou ceia).",
    bg: "neon" as const,
    rotate: "1deg",
  },
  {
    icon: Droplets,
    label: "Hidratação",
    points: "+5",
    description: "1 foto da sua garrafa de água ou squeeze.",
    bg: "blue" as const,
    rotate: "-1deg",
  },
  {
    icon: Camera,
    label: "Story bônus",
    points: "+5",
    description: "Publique um story marcando o Fit Club.",
    bg: "lilac" as const,
    rotate: "1.5deg",
  },
];

const WEEKLY_BONUS = [
  { treinos: 3, pontos: 10 },
  { treinos: 4, pontos: 20 },
  { treinos: 5, pontos: 30 },
  { treinos: 6, pontos: 40 },
  { treinos: 7, pontos: 50 },
];

export function ScoringSystem() {
  return (
    <section id="pontuacao" className="relative scroll-mt-20 overflow-hidden px-5 py-20 sm:py-28">
      <FloatingSticker kind="lightning" className="right-[6%] top-[6%] h-10 w-10 text-club-neon sm:h-14 sm:w-14" />
      <FloatingSticker kind="heart" className="left-[4%] bottom-[8%] h-9 w-9 text-club-pink sm:h-12 sm:w-12" style={{ animationDelay: "0.5s" }} />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <ClubTag bg="blue">Como vai funcionar</ClubTag>
          <h2 className="mt-4 font-club-display text-3xl font-extrabold text-club-white sm:text-4xl">
            Sistema de pontuação
          </h2>
          <p className="mt-4 font-club-sans text-lg text-club-white/70">
            Você acumula pontos por constância — todos os dias um ranking
            atualizado mostra sua evolução.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DAILY_POINTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <StickerCard bg={item.bg} rotate={item.rotate} className="h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-club-black bg-club-white text-club-black">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="font-club-display text-2xl font-extrabold text-club-black">{item.points}</span>
                </div>
                <h3 className="mt-4 font-club-sans font-bold text-club-black">{item.label}</h3>
                <p className="mt-1 font-club-sans text-sm leading-relaxed text-club-black/70">
                  {item.description}
                </p>
              </StickerCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-8 grid gap-6 lg:grid-cols-2"
        >
          <StickerCard bg="white" rotate="-0.8deg" className="p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-club-black bg-club-gold text-club-black">
              <Sparkles className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-club-display text-lg font-extrabold text-club-black">
              Bônus de consistência
            </h3>
            <p className="mt-1 font-club-sans text-sm text-club-black/70">
              Ao final de cada semana, quem mantiver frequência nos treinos
              recebe uma bonificação extra.
            </p>
            <ul className="mt-4 space-y-2">
              {WEEKLY_BONUS.map((row) => (
                <li
                  key={row.treinos}
                  className="flex items-center justify-between rounded-xl border-2 border-club-black/10 bg-club-black/[0.04] px-4 py-2 font-club-sans text-sm font-medium text-club-black"
                >
                  <span>{row.treinos} treinos na semana</span>
                  <span className="font-bold text-club-pink">+{row.pontos} pontos</span>
                </li>
              ))}
            </ul>
          </StickerCard>

          <StickerCard bg="white" rotate="0.8deg" className="p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-club-black bg-club-blue text-club-black">
              <HeartPulse className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-club-display text-lg font-extrabold text-club-black">Bônus cardio</h3>
            <p className="mt-2 font-club-sans text-sm leading-relaxed text-club-black/70">
              Durante o desafio serão lançados desafios surpresa. Quando
              aparecer a mensagem{" "}
              <span className="font-bold text-club-black">
                &ldquo;🚨 Bônus cardio valendo hoje!&rdquo;
              </span>
              , quem realizar o cardio e enviar o comprovante ganha{" "}
              <span className="font-bold text-club-pink">+10 pontos</span> de bônus.
              Esses desafios acontecem em dias aleatórios.
            </p>
            <div className="mt-4 flex items-start gap-3 rounded-xl border-2 border-club-black/10 bg-club-black/[0.04] px-4 py-3">
              <Hash className="mt-0.5 h-4 w-4 shrink-0 text-club-pink" />
              <p className="font-club-sans text-sm text-club-black/70">
                Todos os dias divulgo um <span className="font-bold">símbolo do dia</span>, que
                deve aparecer nos comprovantes para validar as atividades e
                manter a competição justa.
              </p>
            </div>
          </StickerCard>
        </motion.div>
      </div>
    </section>
  );
}
