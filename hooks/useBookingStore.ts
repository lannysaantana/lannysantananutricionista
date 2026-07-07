"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  INITIAL_BOOKING_DATA,
  type BookingFormData,
  type BookingStep,
} from "@/types/booking";
import type { PendingSession, ServicePlanKey } from "@/types/order";
import { getPackageSessions, usesInPersonVisits } from "@/lib/packages";

interface BookingStore {
  data: BookingFormData;
  step: BookingStep;
  history: BookingStep[];

  setField: <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) => void;
  goTo: (step: BookingStep) => void;
  /** Advances through the simple linear prefix (nome → ... → servico). */
  next: () => void;
  back: () => void;
  reset: () => void;

  /** Step 'servico' → decides whether 'limitacao' is needed. */
  chooseService: (plan: ServicePlanKey) => void;
  /** Step 'limitacao' → resolves the final plan and moves on. */
  answerLimitation: (hasLimitation: boolean) => void;
  /** Step 'pacote' → sets the tier, builds the session list, moves on. */
  choosePacoteTier: (tier: BookingFormData["tier"]) => void;
  /** Step 'pagamento_metodo' → moves to scheduling. */
  choosePaymentMethod: (method: NonNullable<BookingFormData["paymentMethod"]>) => void;
  /** Schedules the session currently being booked; advances or finishes. */
  scheduleCurrentSession: (date: string, time: string) => void;
  /** Goes back one session within the multi-session scheduling step. */
  backOneSession: () => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      data: INITIAL_BOOKING_DATA,
      step: "nome",
      history: [],

      setField: (key, value) =>
        set((state) => ({ data: { ...state.data, [key]: value } })),

      goTo: (step) =>
        set((state) => ({ step, history: [...state.history, state.step] })),

      next: () => {
        const LINEAR_PREFIX: BookingStep[] = [
          "nome",
          "idade",
          "telefone",
          "email",
          "objetivo",
          "servico",
        ];
        const { step, history } = get();
        const idx = LINEAR_PREFIX.indexOf(step);
        const nextStep = idx >= 0 ? LINEAR_PREFIX[idx + 1] : undefined;
        if (nextStep) set({ step: nextStep, history: [...history, step] });
      },

      back: () => {
        const { step, data, history } = get();

        if (step === "agenda_sessoes" && data.currentSessionIndex > 0) {
          set({ data: { ...data, currentSessionIndex: data.currentSessionIndex - 1 } });
          return;
        }

        const prevHistory = [...history];
        const prevStep = prevHistory.pop();
        if (prevStep) set({ step: prevStep, history: prevHistory });
      },

      reset: () => set({ data: INITIAL_BOOKING_DATA, step: "nome", history: [] }),

      chooseService: (plan) => {
        const { data, step, history } = get();
        const nextData = { ...data, selectedPlan: plan };

        if (usesInPersonVisits(plan)) {
          set({ data: nextData, step: "limitacao", history: [...history, step] });
        } else {
          set({
            data: { ...nextData, resolvedPlan: plan },
            step: "pacote",
            history: [...history, step],
          });
        }
      },

      answerLimitation: (hasLimitation) => {
        const { data, step, history } = get();
        const resolvedPlan: ServicePlanKey = hasLimitation ? "teleconsulta" : (data.selectedPlan ?? "presencial");
        set({
          data: { ...data, hasLocomotionLimitation: hasLimitation, resolvedPlan },
          step: "pacote",
          history: [...history, step],
        });
      },

      choosePacoteTier: (tier) => {
        const { data, step, history } = get();
        if (!data.resolvedPlan) return;
        const sessions: PendingSession[] = getPackageSessions(data.resolvedPlan, tier);
        set({
          data: { ...data, tier, sessions, currentSessionIndex: 0 },
          step: "pagamento_metodo",
          history: [...history, step],
        });
      },

      choosePaymentMethod: (method) => {
        const { data, step, history } = get();
        set({
          data: { ...data, paymentMethod: method },
          step: "agenda_sessoes",
          history: [...history, step],
        });
      },

      scheduleCurrentSession: (date, time) => {
        const { data, step, history } = get();
        const sessions = data.sessions.map((s, i) =>
          i === data.currentSessionIndex ? { ...s, date, time } : s
        );
        const nextIndex = data.currentSessionIndex + 1;

        if (nextIndex >= sessions.length) {
          set({
            data: { ...data, sessions, currentSessionIndex: nextIndex },
            step: "politicas",
            history: [...history, step],
          });
        } else {
          set({ data: { ...data, sessions, currentSessionIndex: nextIndex } });
        }
      },

      backOneSession: () => {
        const { data } = get();
        if (data.currentSessionIndex > 0) {
          set({ data: { ...data, currentSessionIndex: data.currentSessionIndex - 1 } });
        }
      },
    }),
    {
      name: "lanny-booking-wizard",
      // Bump whenever BookingFormData/BookingStep shape changes — mismatched
      // persisted state (e.g. from before the package-based flow) would
      // otherwise silently desync the wizard instead of just resetting.
      version: 2,
      migrate: () => ({ data: INITIAL_BOOKING_DATA, step: "nome", history: [] }),
    }
  )
);
