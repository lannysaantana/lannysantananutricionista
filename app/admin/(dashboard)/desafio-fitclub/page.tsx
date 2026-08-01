"use client";

import { useMemo } from "react";
import { Users, BadgeCheck, Wallet, ClipboardList } from "lucide-react";
import { ChallengeSignupsTable } from "@/components/admin/ChallengeSignupsTable";
import { Card } from "@/components/ui/Card";
import { useChallengeAnamneseGrouped, useChallengeSignups } from "@/hooks/useChallengeSignups";
import { formatCurrencyBRL } from "@/utils/formatters";

export default function AdminFitClubPage() {
  const { data: signups = [] } = useChallengeSignups();
  const { data: anamneseBySignup } = useChallengeAnamneseGrouped();

  const stats = useMemo(() => {
    const paid = signups.filter((s) => s.payment_status === "paid");
    const revenue = paid.reduce((sum, s) => sum + s.amount_cents, 0);
    const withAnamnese = signups.filter((s) => anamneseBySignup?.[s.id]).length;
    return { total: signups.length, paid: paid.length, revenue, withAnamnese };
  }, [signups, anamneseBySignup]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink dark:text-offwhite">Desafio Fit Club</h1>
        <p className="mt-1 font-sans text-sm text-ink/60 dark:text-offwhite/60">
          Inscrições, pagamentos e anamneses das participantes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">Inscrições</p>
            <p className="font-display text-xl text-ink dark:text-offwhite">{stats.total}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <BadgeCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">Pagas</p>
            <p className="font-display text-xl text-ink dark:text-offwhite">{stats.paid}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <ClipboardList className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">Anamneses preenchidas</p>
            <p className="font-display text-xl text-ink dark:text-offwhite">{stats.withAnamnese}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <Wallet className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">Faturamento pago</p>
            <p className="font-display text-xl text-ink dark:text-offwhite">
              {formatCurrencyBRL(stats.revenue)}
            </p>
          </div>
        </Card>
      </div>

      <ChallengeSignupsTable />
    </div>
  );
}
