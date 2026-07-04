"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addBlockedDate,
  listBlockedDates,
  listBusinessHours,
  removeBlockedDate,
  updateBusinessHours,
} from "@/services/availabilityService";
import type { BusinessHoursUpdate } from "@/types/availability";

const BUSINESS_HOURS_KEY = "business-hours";
const BLOCKED_DATES_KEY = "blocked-dates";

export function useBusinessHours() {
  return useQuery({ queryKey: [BUSINESS_HOURS_KEY], queryFn: listBusinessHours });
}

export function useUpdateBusinessHours() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (row: BusinessHoursUpdate) => updateBusinessHours(row),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BUSINESS_HOURS_KEY] }),
  });
}

export function useBlockedDates() {
  return useQuery({ queryKey: [BLOCKED_DATES_KEY], queryFn: listBlockedDates });
}

export function useBlockedDateMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [BLOCKED_DATES_KEY] });

  const add = useMutation({
    mutationFn: ({ date, reason }: { date: string; reason?: string }) =>
      addBlockedDate(date, reason),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: (date: string) => removeBlockedDate(date),
    onSuccess: invalidate,
  });

  return { add, remove };
}
