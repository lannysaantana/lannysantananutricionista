"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelAppointment,
  confirmAppointmentPayment,
  listAppointments,
  updateAppointment,
} from "@/services/appointmentService";
import type { Appointment, AppointmentFilters } from "@/types/appointment";

const QUERY_KEY = "appointments";

export function useAppointments(filters: AppointmentFilters) {
  return useQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: () => listAppointments(filters),
  });
}

export function useAppointmentMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });

  const update = useMutation({
    mutationFn: ({ id, changes }: { id: string; changes: Partial<Appointment> }) =>
      updateAppointment(id, changes),
    onSuccess: invalidate,
  });

  const cancel = useMutation({
    mutationFn: (id: string) => cancelAppointment(id),
    onSuccess: invalidate,
  });

  const confirmPayment = useMutation({
    mutationFn: (id: string) => confirmAppointmentPayment(id),
    onSuccess: invalidate,
  });

  return { update, cancel, confirmPayment };
}
