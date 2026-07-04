import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { BUSINESS_WHATSAPP } from "@/lib/config";
import { toWhatsAppLink } from "@/utils/formatters";

export function Footer() {
  return (
    <footer className="border-t border-sage/10 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo />
        <nav className="flex items-center gap-6 font-sans text-sm text-ink/70 dark:text-offwhite/70">
          <a href={toWhatsAppLink(BUSINESS_WHATSAPP)} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <Link href="/admin/login">Área administrativa</Link>
        </nav>
        <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">
          © {new Date().getFullYear()} Lanny Santana Nutricionista
        </p>
      </div>
    </footer>
  );
}
