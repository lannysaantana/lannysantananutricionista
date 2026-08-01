"use client";

import { motion } from "framer-motion";
import { Shirt, ShoppingBag, Headphones, Sparkles, Nut, Trophy } from "lucide-react";
import { StickerCard, ClubTag } from "@/components/fitclub/ui/StickerCard";
import { FloatingSticker } from "@/components/fitclub/ui/Stickers";

const PODIUM = [
  {
    place: "1º lugar",
    medal: "🥇",
    bg: "pink" as const,
    rotate: "-2deg",
    lift: true,
    items: [
      { icon: Shirt, label: "Camiseta oficial" },
      { icon: ShoppingBag, label: "Ecobag" },
      { icon: Headphones, label: "Fone de ouvido" },
      { icon: Sparkles, label: "Look exclusivo da loja" },
    ],
  },
  {
    place: "2º lugar",
    medal: "🥈",
    bg: "lilac" as const,
    rotate: "1.5deg",
    lift: false,
    items: [
      { icon: Shirt, label: "Camiseta" },
      { icon: ShoppingBag, label: "Ecobag" },
      { icon: Headphones, label: "Fone" },
      { icon: Nut, label: "Kit de snacks e sachês" },
    ],
  },
  {
    place: "3º lugar",
    medal: "🥉",
    bg: "blue" as const,
    rotate: "-1.5deg",
    lift: false,
    items: [
      { icon: Shirt, label: "Camiseta" },
      { icon: ShoppingBag, label: "Ecobag" },
      { icon: Nut, label: "Kit de snacks e sachês" },
    ],
  },
];

export function Prizes() {
  return (
    <section id="premiacao" className="relative scroll-mt-20 overflow-hidden px-5 py-20 sm:py-28">
      <FloatingSticker kind="star" className="left-[6%] top-[10%] h-9 w-9 text-club-gold sm:h-12 sm:w-12" />
      <FloatingSticker kind="sparkle" className="right-[5%] bottom-[6%] h-9 w-9 text-club-neon sm:h-12 sm:w-12" style={{ animationDelay: "0.5s" }} />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <ClubTag bg="pink" className="text-club-white">
            <Trophy className="h-3.5 w-3.5" />
            E sim, teremos premiação!
          </ClubTag>
          <h2 className="mt-4 font-club-display text-3xl font-extrabold text-club-white sm:text-4xl">
            Premiação para as 3 primeiras colocadas
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {PODIUM.map((tier, i) => (
            <motion.div
              key={tier.place}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={tier.lift ? "sm:-translate-y-5" : ""}
            >
              <StickerCard bg={tier.bg} rotate={tier.rotate} shadow="black" className="p-8 text-center">
                <span className="text-4xl">{tier.medal}</span>
                <h3 className="mt-3 font-club-display text-xl font-extrabold text-club-black">{tier.place}</h3>
                <ul className="mt-6 space-y-3 text-left">
                  {tier.items.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-club-black bg-club-white text-club-black">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="font-club-sans text-sm font-medium text-club-black">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </StickerCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
