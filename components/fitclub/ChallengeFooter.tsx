import Link from "next/link";
import { Instagram, Mail, MessageCircle, CalendarDays, Target, Zap, Star } from "lucide-react";
import { ChallengeLogo } from "@/components/fitclub/ChallengeLogo";
import { BUSINESS_WHATSAPP, BUSINESS_INFO, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";
import { toWhatsAppLink } from "@/utils/formatters";

const QUICK_LINKS = [
  { href: "#sobre", label: "O Desafio" },
  { href: "#pontuacao", label: "Pontuação" },
  { href: "#premiacao", label: "Premiação" },
  { href: "#regulamento", label: "Regulamento" },
];

const LEGAL_LINKS = [
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/lgpd", label: "LGPD" },
];

const STRIP_ITEMS = [
  { icon: CalendarDays, label: "21 Dias" },
  { icon: Target, label: "Foco" },
  { icon: Zap, label: "Disciplina" },
  { icon: Star, label: "Transformação" },
];

export function ChallengeFooter() {
  return (
    <footer className="border-t-[3px] border-club-black bg-club-black px-5 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div>
          <ChallengeLogo />
          <div className="mt-4 flex items-center gap-3">
            <a
              href={toWhatsAppLink(BUSINESS_WHATSAPP, WHATSAPP_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-club-black bg-club-neon text-club-black transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-club-black bg-club-pink text-club-black transition-transform hover:-translate-y-0.5"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              aria-label="E-mail"
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-club-black bg-club-blue text-club-black transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 font-club-sans text-sm font-bold uppercase tracking-wide text-club-white">Links rápidos</p>
          <ul className="space-y-2 font-club-sans text-sm text-club-white/70">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-club-neon">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-club-sans text-sm font-bold uppercase tracking-wide text-club-white">Legal</p>
          <ul className="space-y-2 font-club-sans text-sm text-club-white/70">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-club-neon">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/" className="hover:text-club-neon">
                Site principal
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-center gap-3 rounded-2xl border-[3px] border-club-black bg-club-lilac px-6 py-5">
        {STRIP_ITEMS.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-2 rounded-full border-2 border-club-black bg-club-white px-4 py-1.5 font-club-sans text-xs font-bold uppercase tracking-widest text-club-black"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </span>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-6xl text-center">
        <p className="font-club-sans text-xs text-club-white/40">
          © {new Date().getFullYear()} Lanny Santana Nutricionista — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
