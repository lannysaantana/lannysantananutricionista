"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Persistent booking CTA on mobile — the header button covers desktop (lg+). */
export function StickyBookButton() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-sage/10 bg-offwhite/95 px-5 py-3 backdrop-blur-md dark:bg-[#20241f]/95 lg:hidden"
    >
      <Link href="/agendar" className="block">
        <Button size="md" className="group w-full">
          Agendar Consulta
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Link>
    </motion.div>
  );
}
