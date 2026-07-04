"use client";

import { useQuery } from "@tanstack/react-query";
import { calendarService } from "@/services/calendarService";

export function useAvailableDatesInMonth(year: number, month: number) {
  return useQuery({
    queryKey: ["available-dates", year, month],
    queryFn: () => calendarService.getAvailableDatesInMonth(year, month),
  });
}

export function useSlotsForDate(date: string | null) {
  return useQuery({
    queryKey: ["slots", date],
    queryFn: () => calendarService.getSlotsForDate(date as string),
    enabled: Boolean(date),
  });
}
