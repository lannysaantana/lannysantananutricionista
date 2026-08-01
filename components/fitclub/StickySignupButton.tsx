"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ClubButton } from "@/components/fitclub/ui/ClubButton";
import { formatCurrencyBRL } from "@/utils/formatters";
import { CHALLENGE_PRICE_CENTS } from "@/lib/config";

/** Persistent signup CTA on mobile — the header button covers desktop (lg+). */
export function StickySignupButton() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-club-black bg-club-black px-5 py-3 lg:hidden"
    >
      <a href="#inscricao" className="block">
        <ClubButton size="md" variant="pink" className="group w-full">
          Quero Participar — {formatCurrencyBRL(CHALLENGE_PRICE_CENTS)}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </ClubButton>
      </a>
    </motion.div>
  );
}
