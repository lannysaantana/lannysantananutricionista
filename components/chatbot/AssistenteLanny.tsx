"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAssistantReply, FAQ_ENTRIES } from "@/services/chatbotService";
import type { ChatMessage } from "@/types/chat";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Olá! Eu sou a Assistente Lanny 🌿 Posso te ajudar com dúvidas sobre a consulta, teleconsulta, pagamento e mais. Como posso ajudar?",
  timestamp: 0,
};

export function AssistenteLanny() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `msg-${idCounter.current++}`,
      role: "user",
      content: trimmed,
      timestamp: idCounter.current,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setTyping(true);

    const reply = await getAssistantReply(trimmed, nextMessages);

    setTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: `msg-${idCounter.current++}`, role: "assistant", content: reply, timestamp: idCounter.current },
    ]);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir Assistente Lanny"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sage-dark text-offwhite shadow-card"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-5 z-50 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-sage/15 bg-offwhite shadow-card dark:bg-[#20241f]"
          >
            <div className="flex items-center gap-3 border-b border-sage/10 bg-sage-dark px-4 py-3 text-offwhite">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20">
                <Leaf className="h-4 w-4" />
              </span>
              <div>
                <p className="font-sans text-sm font-medium">Assistente Lanny</p>
                <p className="font-sans text-xs text-offwhite/70">Tira-dúvidas rápido</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <p
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 font-sans text-sm leading-relaxed",
                      message.role === "user"
                        ? "bg-gold/20 text-ink dark:text-offwhite"
                        : "bg-sage/10 text-ink dark:text-offwhite"
                    )}
                  >
                    {message.content}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <span className="flex gap-1 rounded-2xl bg-sage/10 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-sage-dark/50 dark:bg-gold/60"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </span>
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {FAQ_ENTRIES.map((faq) => (
                    <button
                      key={faq.question}
                      onClick={() => sendMessage(faq.question)}
                      className="rounded-full border border-sage/20 px-3 py-1.5 font-sans text-xs text-ink/70 hover:border-gold hover:text-ink dark:text-offwhite/70"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-sage/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua dúvida..."
                className="flex-1 rounded-full border border-sage/15 bg-transparent px-4 py-2.5 font-sans text-sm text-ink outline-none focus:border-gold dark:text-offwhite"
              />
              <button
                type="submit"
                aria-label="Enviar"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage-dark text-offwhite disabled:opacity-40"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
