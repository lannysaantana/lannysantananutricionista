import Link from "next/link";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BUSINESS_WHATSAPP, BUSINESS_INFO, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/config";
import { toWhatsAppLink } from "@/utils/formatters";

const QUICK_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre-mim", label: "Sobre Mim" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Perguntas Frequentes" },
];

const LEGAL_LINKS = [
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/politica-de-cancelamento", label: "Política de Cancelamento" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/lgpd", label: "LGPD" },
];

export function Footer() {
  return (
    <footer id="contato" className="scroll-mt-20 border-t border-sage/10 bg-beige/40 px-5 py-16 dark:bg-white/[0.02]">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 font-sans text-xs uppercase tracking-widest text-ink/50 dark:text-offwhite/50">
            {BUSINESS_INFO.crn}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={toWhatsAppLink(BUSINESS_WHATSAPP, WHATSAPP_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark transition-colors hover:bg-sage/20 dark:text-gold"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark transition-colors hover:bg-sage/20 dark:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              aria-label="E-mail"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sage-dark transition-colors hover:bg-sage/20 dark:text-gold"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 font-sans text-sm font-medium text-ink dark:text-offwhite">Links rápidos</p>
          <ul className="space-y-2 font-sans text-sm text-ink/70 dark:text-offwhite/70">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-sage-dark dark:hover:text-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-sans text-sm font-medium text-ink dark:text-offwhite">Contato</p>
          <ul className="space-y-2 font-sans text-sm text-ink/70 dark:text-offwhite/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-dark dark:text-gold" />
              <span>
                {BUSINESS_INFO.addressLine}
                <br />
                {BUSINESS_INFO.city}, {BUSINESS_INFO.state}
              </span>
            </li>
            <li>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-sage-dark dark:hover:text-gold">
                {BUSINESS_INFO.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-sans text-sm font-medium text-ink dark:text-offwhite">Legal</p>
          <ul className="space-y-2 font-sans text-sm text-ink/70 dark:text-offwhite/70">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-sage-dark dark:hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin/login" className="hover:text-sage-dark dark:hover:text-gold">
                Área administrativa
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-sage/10 pt-6 text-center">
        <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">
          © {new Date().getFullYear()} Lanny Santana Nutricionista — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
