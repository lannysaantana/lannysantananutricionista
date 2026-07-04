import { cn } from "@/lib/utils";
import type { AppointmentStatus, PaymentStatus } from "@/types/appointment";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-sage/15 text-sage-dark",
  completed: "bg-gold/15 text-gold",
  cancelled: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  completed: "Concluído",
  cancelled: "Cancelado",
};

const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  pending: "Pendente",
  paid: "Pago",
  failed: "Falhou",
  refunded: "Reembolsado",
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-medium",
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-medium",
        status === "paid" ? "bg-sage/15 text-sage-dark" : "bg-ink/5 text-ink/60"
      )}
    >
      {PAYMENT_LABELS[status]}
    </span>
  );
}
