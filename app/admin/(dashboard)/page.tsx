"use client";

import { useMemo } from "react";
import { CalendarClock, Users, BadgeCheck, Wallet } from "lucide-react";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { ExportOrdersButtons } from "@/components/admin/ExportOrdersButtons";
import { Card } from "@/components/ui/Card";
import { useOrders } from "@/hooks/useOrders";
import { formatCurrencyBRL } from "@/utils/formatters";

export default function AdminDashboardPage() {
  const { data: orders = [] } = useOrders();

  const stats = useMemo(() => {
    const confirmed = orders.filter((o) => o.status === "confirmed").length;
    const revenue = orders
      .filter((o) => o.payment_status === "paid")
      .reduce((sum, o) => sum + o.amount_cents, 0);
    return { total: orders.length, confirmed, revenue };
  }, [orders]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink dark:text-offwhite">Pedidos</h1>
        <p className="mt-1 font-sans text-sm text-ink/60 dark:text-offwhite/60">
          Gerencie pacientes, pagamentos e sessões agendadas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">Total de pedidos</p>
            <p className="font-display text-xl text-ink dark:text-offwhite">{stats.total}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/10 text-sage-dark dark:text-gold">
            <BadgeCheck className="h-5 w-5" />
          </span>
          <div>
            <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">Confirmados</p>
            <p className="font-display text-xl text-ink dark:text-offwhite">{stats.confirmed}</p>
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

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-sans text-sm text-ink/60 dark:text-offwhite/60">
          <CalendarClock className="h-4 w-4" />
          {orders.length} pedido(s)
        </p>
        <ExportOrdersButtons orders={orders} />
      </div>

      <OrdersTable />
    </div>
  );
}
