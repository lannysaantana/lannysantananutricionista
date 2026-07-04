"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BUSINESS_WHATSAPP, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";
import { toWhatsAppLink } from "@/utils/formatters";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={toWhatsAppLink(BUSINESS_WHATSAPP, WHATSAPP_DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card lg:bottom-5"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" strokeWidth={0} />
    </motion.a>
  );
}
