import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-noise px-5 text-center">
      <Leaf className="h-10 w-10 text-sage-dark dark:text-gold" strokeWidth={1.25} />
      <h1 className="mt-6 font-display text-3xl text-ink dark:text-offwhite">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-sm font-subtitle text-lg italic text-ink/60 dark:text-offwhite/60">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Link href="/" className="mt-8">
        <Button size="lg">Voltar ao início</Button>
      </Link>
    </main>
  );
}
