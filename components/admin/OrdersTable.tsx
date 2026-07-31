"use client";

import { useState } from "react";
import { differenceInYears } from "date-fns";
import { CheckCircle, XCircle, ChevronDown, ChevronUp, Clock, ClipboardList } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import {
  useOrderMutations,
  useOrderSessionsGrouped,
  useOrders,
  usePreConsultationFormsGrouped,
} from "@/hooks/useOrders";
import { useServicePlans } from "@/hooks/usePricing";
import { formatCurrencyBRL, formatDateShort } from "@/utils/formatters";
import { PATIENT_SEX_LABELS, PATIENT_OBJECTIVE_LABELS, type PatientSex } from "@/types/booking";
import { cn } from "@/lib/utils";
import type { Order, OrderSession, PreConsultationForm, PreConsultationResponses } from "@/types/order";

const PRE_CONSULTATION_LABELS: Record<keyof PreConsultationResponses, string> = {
  healthComplaints: "Queixas de saúde",
  diagnosedConditions: "Condições diagnosticadas",
  medicationsInUse: "Medicamentos em uso",
  allergiesOrIntolerances: "Alergias ou intolerâncias",
  familyHistory: "Histórico familiar",
  sleepQuality: "Qualidade do sono",
  waterIntakeLiters: "Ingestão de água",
  physicalActivity: "Atividade física",
  bowelHabits: "Hábito intestinal",
  previousDiets: "Dietas anteriores",
  mainGoalDescription: "Objetivo principal",
  breakfast: "Café da manhã",
  morningSnack: "Lanche da manhã",
  lunch: "Almoço",
  afternoonSnack: "Lanche da tarde",
  dinner: "Jantar",
  eveningSnack: "Ceia",
  additionalNotes: "Observações adicionais",
};

function PreConsultationSection({ form }: { form: PreConsultationForm | undefined }) {
  const [open, setOpen] = useState(false);

  if (!form) {
    return (
      <div className="flex items-center gap-2 border-t border-sage/5 px-4 py-3 font-sans text-xs text-ink/40 dark:text-offwhite/40">
        <ClipboardList className="h-3.5 w-3.5 shrink-0" />
        Pré-Consulta ainda não preenchida
      </div>
    );
  }

  return (
    <div className="border-t border-sage/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-3 font-sans text-xs font-medium text-ink dark:text-offwhite"
      >
        <ClipboardList className="h-3.5 w-3.5 shrink-0 text-sage-dark dark:text-gold" />
        Pré-Consulta (anamnese + recordatório)
        {open ? (
          <ChevronUp className="ml-auto h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="ml-auto h-3.5 w-3.5" />
        )}
      </button>
      {open && (
        <div className="grid grid-cols-1 gap-3 px-4 pb-4 sm:grid-cols-2">
          {(Object.keys(PRE_CONSULTATION_LABELS) as (keyof PreConsultationResponses)[]).map((key) => (
            <div key={key}>
              <p className="font-sans text-[10px] uppercase tracking-wide text-ink/40 dark:text-offwhite/40">
                {PRE_CONSULTATION_LABELS[key]}
              </p>
              <p className="whitespace-pre-wrap font-sans text-xs text-ink/80 dark:text-offwhite/80">
                {form.responses[key] || "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function patientAge(order: Order): number | null {
  if (order.birth_date) return differenceInYears(new Date(), new Date(`${order.birth_date}T00:00:00`));
  return order.age || null;
}

function PatientDetails({ order }: { order: Order }) {
  const age = patientAge(order);
  const rows: { label: string; value: string }[] = [
    { label: "Idade", value: age ? `${age} anos` : "—" },
    { label: "Sexo", value: order.sex ? (PATIENT_SEX_LABELS[order.sex as PatientSex] ?? order.sex) : "—" },
    {
      label: "Objetivo",
      value:
        order.objective === "outro" && order.other_objective
          ? order.other_objective
          : (PATIENT_OBJECTIVE_LABELS[order.objective] ?? "—"),
    },
    { label: "Telefone", value: order.phone || "—" },
    { label: "WhatsApp", value: order.whatsapp || "—" },
    {
      label: "Cidade/Estado",
      value: order.city || order.state ? `${order.city ?? "—"} / ${order.state ?? "—"}` : "—",
    },
    { label: "Profissão", value: order.profession || "—" },
    {
      label: "Altura/Peso",
      value:
        order.height_cm || order.weight_kg
          ? `${order.height_cm ? `${order.height_cm} cm` : "—"} / ${order.weight_kg ? `${order.weight_kg} kg` : "—"}`
          : "—",
    },
    { label: "Medicamentos em uso", value: order.medications_in_use || "—" },
    {
      label: "Usa GLP-1",
      value: order.uses_glp1 ? `Sim — ${order.glp1_medication || "não informado"}` : "Não",
    },
    { label: "Limitação física", value: order.has_locomotion_limitation ? "Sim" : "Não" },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-sage/10 px-4 py-3 sm:grid-cols-3">
      {rows.map((row) => (
        <div key={row.label}>
          <p className="font-sans text-[10px] uppercase tracking-wide text-ink/40 dark:text-offwhite/40">
            {row.label}
          </p>
          <p className="font-sans text-xs text-ink/80 dark:text-offwhite/80">{row.value}</p>
        </div>
      ))}
    </div>
  );
}

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

function OrderRow({
  order,
  sessions,
  preConsultationForm,
}: {
  order: Order;
  sessions: OrderSession[];
  preConsultationForm: PreConsultationForm | undefined;
}) {
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
          <p className="font-sans text-sm font-medium text-ink dark:text-offwhite">
            {order.name}
            {patientAge(order) && (
              <span className="ml-1.5 font-normal text-ink/50 dark:text-offwhite/50">
                · {patientAge(order)} anos
              </span>
            )}
          </p>
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
          <PatientDetails order={order} />
          {sessions.map((session) => (
            <SessionRow key={session.id} session={session} />
          ))}
          <PreConsultationSection form={preConsultationForm} />
        </div>
      )}
    </div>
  );
}

export function OrdersTable() {
  const { data: orders, isLoading } = useOrders();
  const { data: sessionsByOrder } = useOrderSessionsGrouped();
  const { data: preConsultationByOrder } = usePreConsultationFormsGrouped();

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
          <OrderRow
            key={order.id}
            order={order}
            sessions={sessionsByOrder?.[order.id] ?? []}
            preConsultationForm={preConsultationByOrder?.[order.id]}
          />
        ))}
      </div>
    </div>
  );
}
