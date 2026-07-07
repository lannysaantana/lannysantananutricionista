"use client";

import { useState } from "react";
import { CheckCircle, XCircle, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useOrderMutations, useOrderSessionsGrouped, useOrders } from "@/hooks/useOrders";
import { useServicePlans } from "@/hooks/usePricing";
import { formatCurrencyBRL, formatDateShort } from "@/utils/formatters";
import { cn } from "@/lib/utils";
import type { Order, OrderSession } from "@/types/order";

function statusColor(status: string) {
  if (status === "confirmed") return "bg-sage/15 text-sage-dark";
  if (status === "cancelled") return "bg-red-100 text-red-600";
  return "bg-amber-100 text-amber-700";
}

function SessionRow({ session }: { session: OrderSession }) {
  const { cancelSession, reschedule } = useOrderMutations();
  const [editing, setEditing] = useState(false);
  const [date, setDate] = useState(session.session_date);
  const [time, setTime] = useState(session.session_time.slice(0, 5));

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-sage/5 px-4 py-2.5 first:border-t-0">
      <Clock className="h-3.5 w-3.5 shrink-0 text-sage-dark dark:text-gold" />
      <span className="flex-1 font-sans text-xs text-ink/70 dark:text-offwhite/70">
        {session.label}
      </span>

      {editing ? (
        <>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-sage/20 bg-transparent px-2 py-1 font-sans text-xs text-ink dark:text-offwhite"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-lg border border-sage/20 bg-transparent px-2 py-1 font-sans text-xs text-ink dark:text-offwhite"
          />
          <button
            className="font-sans text-xs font-medium text-sage-dark dark:text-gold"
            onClick={() => {
              reschedule.mutate({ session, date, time });
              setEditing(false);
            }}
          >
            Salvar
          </button>
        </>
      ) : (
        <span className="font-sans text-xs font-medium text-ink dark:text-offwhite">
          {formatDateShort(session.session_date)} · {session.session_time.slice(0, 5)}
        </span>
      )}

      <span className={cn("rounded-full px-2 py-0.5 font-sans text-[10px] font-medium", statusColor(session.status))}>
        {session.status}
      </span>

      {!editing && session.status !== "cancelled" && (
        <button
          title={session.reschedule_count >= 1 ? "Reagendamento já utilizado" : "Reagendar"}
          disabled={session.reschedule_count >= 1}
          onClick={() => setEditing(true)}
          className="font-sans text-xs text-ink/50 underline decoration-dotted disabled:opacity-30 dark:text-offwhite/50"
        >
          Reagendar
        </button>
      )}
      {session.status !== "cancelled" && (
        <button
          onClick={() => cancelSession.mutate(session.id)}
          className="rounded-full p-1.5 text-red-500 hover:bg-red-50"
          title="Cancelar sessão"
        >
          <XCircle className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function OrderRow({ order, sessions }: { order: Order; sessions: OrderSession[] }) {
  const { confirmPayment, cancel } = useOrderMutations();
  const { data: plans } = useServicePlans();
  const [expanded, setExpanded] = useState(false);
  const plan = plans?.find((p) => p.key === order.service_plan_key);

  return (
    <div className="border-b border-sage/5 last:border-0">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3">
        <button onClick={() => setExpanded((v) => !v)} className="text-ink/50 dark:text-offwhite/50">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        <div className="min-w-[160px] flex-1">
          <p className="font-sans text-sm font-medium text-ink dark:text-offwhite">{order.name}</p>
          <p className="font-sans text-xs text-ink/50 dark:text-offwhite/50">{order.email}</p>
        </div>
        <span className="font-sans text-sm text-ink/80 dark:text-offwhite/80">
          {plan?.name ?? order.service_plan_key}
        </span>
        <span className="font-sans text-sm text-ink/80 dark:text-offwhite/80">
          {formatCurrencyBRL(order.amount_cents)}
        </span>
        <span className="font-sans text-xs uppercase text-ink/50 dark:text-offwhite/50">
          {order.payment_method}
        </span>
        <span className={cn("rounded-full px-2.5 py-1 font-sans text-xs font-medium", statusColor(order.status))}>
          {order.status}
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 font-sans text-xs font-medium",
            order.payment_status === "paid" ? "bg-sage/15 text-sage-dark" : "bg-ink/5 text-ink/60"
          )}
        >
          {order.payment_status}
        </span>
        <div className="flex items-center gap-1">
          <button
            title="Confirmar pagamento"
            disabled={order.payment_status === "paid"}
            onClick={() => confirmPayment.mutate(order.id)}
            className="rounded-full p-2 text-sage-dark hover:bg-sage/10 disabled:opacity-30 dark:text-gold"
          >
            <CheckCircle className="h-4 w-4" />
          </button>
          <button
            title="Cancelar pedido"
            disabled={order.status === "cancelled"}
            onClick={() => cancel.mutate(order.id)}
            className="rounded-full p-2 text-red-500 hover:bg-red-50 disabled:opacity-30"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mb-3 ml-9 mr-4 rounded-xl border border-sage/10 bg-sage/[0.03]">
          {sessions.map((session) => (
            <SessionRow key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}

export function OrdersTable() {
  const { data: orders, isLoading } = useOrders();
  const { data: sessionsByOrder } = useOrderSessionsGrouped();

  if (isLoading) return <LoadingSpinner />;

  if (!orders || orders.length === 0) {
    return (
      <p className="py-16 text-center font-sans text-sm text-ink/50 dark:text-offwhite/50">
        Nenhum pedido encontrado.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-sage/10 bg-white/70 dark:bg-white/5">
      <div className="min-w-[900px]">
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} sessions={sessionsByOrder?.[order.id] ?? []} />
        ))}
      </div>
    </div>
  );
}
