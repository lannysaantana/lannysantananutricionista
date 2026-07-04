"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-sage/10 bg-white/70 backdrop-blur-sm dark:bg-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/admin">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 rounded-full border border-sage/15 p-1 sm:flex">
          <Link
            href="/admin"
            className={cn(
              "rounded-full px-4 py-1.5 font-sans text-sm transition-colors",
              pathname === "/admin"
                ? "bg-sage-dark text-offwhite"
                : "text-ink/70 hover:text-ink dark:text-offwhite/70"
            )}
          >
            Agenda
          </Link>
          <Link
            href="/admin/configuracoes"
            className={cn(
              "rounded-full px-4 py-1.5 font-sans text-sm transition-colors",
              pathname === "/admin/configuracoes"
                ? "bg-sage-dark text-offwhite"
                : "text-ink/70 hover:text-ink dark:text-offwhite/70"
            )}
          >
            <span className="flex items-center gap-1.5">
              <Settings className="h-3.5 w-3.5" />
              Configurações
            </span>
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
