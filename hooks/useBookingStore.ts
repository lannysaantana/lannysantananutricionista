"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  INITIAL_BOOKING_DATA,
  type BookingFormData,
  type BookingStep,
} from "@/types/booking";

interface BookingStore {
  data: BookingFormData;
  step: BookingStep;
  setField: <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) => void;
  goTo: (step: BookingStep) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
}

/**
 * Linear order used for the "back" button. Forward navigation is dynamic
 * (see `next`) because the "limitacao" answer skips the consultation-type
 * step and forces teleconsulta.
 */
const STEP_ORDER: BookingStep[] = [
  "nome",
  "idade",
  "telefone",
  "email",
  "objetivo",
  "limitacao",
  "tipo_consulta",
  "agenda",
  "resumo",
];

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      data: INITIAL_BOOKING_DATA,
      step: "nome",

      setField: (key, value) =>
        set((state) => ({ data: { ...state.data, [key]: value } })),

      goTo: (step) => set({ step }),

      next: () => {
        const { step, data } = get();

        if (step === "limitacao" && data.hasLimitation === true) {
          set({ step: "agenda", data: { ...data, consultationType: "teleconsulta" } });
          return;
        }

        const currentIndex = STEP_ORDER.indexOf(step);
        const nextStep = STEP_ORDER[currentIndex + 1];
        if (nextStep) set({ step: nextStep });
      },

      back: () => {
        const { step, data } = get();

        if (step === "agenda" && data.hasLimitation === true) {
          set({ step: "limitacao" });
          return;
        }

        const currentIndex = STEP_ORDER.indexOf(step);
        const prevStep = STEP_ORDER[currentIndex - 1];
        if (prevStep) set({ step: prevStep });
      },

      reset: () => set({ data: INITIAL_BOOKING_DATA, step: "nome" }),
    }),
    { name: "lanny-booking-wizard" }
  )
);
