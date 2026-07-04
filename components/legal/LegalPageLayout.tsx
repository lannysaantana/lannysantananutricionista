import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import type { ReactNode } from "react";

export function LegalPageLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-noise px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="mb-10 inline-block" aria-label="Início">
          <Logo />
        </Link>

        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 font-sans text-sm text-ink/60 hover:text-sage-dark dark:text-offwhite/60 dark:hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao início
        </Link>

        <h1 className="font-display text-3xl text-ink dark:text-offwhite">{title}</h1>
        <p className="mt-2 font-sans text-xs uppercase tracking-widest text-ink/40 dark:text-offwhite/40">
          Última atualização: {updatedAt}
        </p>

        <div className="prose prose-sm mt-8 max-w-none font-sans text-ink/80 dark:text-offwhite/80 [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-ink [&_h2]:dark:text-offwhite [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </main>
  );
}
