import type { TimeSlot } from "@/types/booking";
import { format, isWeekend } from "date-fns";
import {
  getBookedTimes,
  listBlockedDates,
  listBusinessHours,
} from "@/services/availabilityService";

/**
 * Calendar provider contract. Implement this interface to plug in a real
 * scheduling backend (Google Calendar, Calendly, ...) without touching any
 * UI code — the booking wizard only talks to `calendarService` below.
 */
export interface CalendarProvider {
  /** Returns bookable slots for the given ISO date (YYYY-MM-DD). */
  getSlotsForDate(date: string): Promise<TimeSlot[]>;
  /** Returns which dates in a month have at least one open slot. */
  getAvailableDatesInMonth(year: number, month: number): Promise<string[]>;
  /** Reserves a slot; returns the provider's event/booking id. */
  reserveSlot(slot: TimeSlot, appointmentId: string): Promise<{ externalEventId: string }>;
}

/** Minutes since midnight for a Postgres "HH:mm:ss" time string. */
function timeToMinutes(time: string): number {
  const parts = time.split(":");
  const h = Number(parts[0] ?? 0);
  const m = Number(parts[1] ?? 0);
  return h * 60 + m;
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Real availability, driven by the `business_hours` and `blocked_dates`
 * tables (editable from /admin/configuracoes) plus already-booked
 * appointments — no fixed/hardcoded schedule.
 */
class SupabaseCalendarProvider implements CalendarProvider {
  async getSlotsForDate(date: string): Promise<TimeSlot[]> {
    const weekday = new Date(`${date}T00:00:00`).getDay();

    const [hours, blocked, bookedTimes] = await Promise.all([
      listBusinessHours(),
      listBlockedDates(),
      getBookedTimes(date),
    ]);

    const dayHours = hours.find((h) => h.weekday === weekday);
    const isBlocked = blocked.some((b) => b.date === date);
    if (!dayHours || !dayHours.is_open || isBlocked) return [];

    const isToday = date === format(new Date(), "yyyy-MM-dd");
    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    const bookedSet = new Set(bookedTimes.map((t) => t.slice(0, 5)));

    const start = timeToMinutes(dayHours.start_time);
    const end = timeToMinutes(dayHours.end_time);
    const step = dayHours.slot_duration_minutes;

    const slots: TimeSlot[] = [];
    for (let minutes = start; minutes + step <= end; minutes += step) {
      const time = minutesToTime(minutes);
      const isPast = isToday && minutes <= nowMinutes;
      slots.push({
        id: `${date}-${time}`,
        date,
        time,
        available: !bookedSet.has(time) && !isPast,
      });
    }
    return slots;
  }

  async getAvailableDatesInMonth(year: number, month: number): Promise<string[]> {
    const [hours, blocked] = await Promise.all([listBusinessHours(), listBlockedDates()]);
    const openWeekdays = new Set(hours.filter((h) => h.is_open).map((h) => h.weekday));
    const blockedSet = new Set(blocked.map((b) => b.date));

    const dates: string[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date(new Date().toDateString());

    for (let day = 1; day <= daysInMonth; day++) {
      const current = new Date(year, month, day);
      if (current < today) continue;
      if (!openWeekdays.has(current.getDay())) continue;
      const iso = format(current, "yyyy-MM-dd");
      if (blockedSet.has(iso)) continue;
      dates.push(iso);
    }
    return dates;
  }

  async reserveSlot(slot: TimeSlot, appointmentId: string) {
    // Availability is derived live from `appointments`, so no separate
    // reservation record is needed — the created appointment IS the hold.
    return { externalEventId: `supabase_${appointmentId}_${slot.id}` };
  }
}

const WORK_HOURS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

/**
 * Deterministic mock provider — no Supabase connection required. Useful for
 * local development without credentials configured.
 */
class MockCalendarProvider implements CalendarProvider {
  async getSlotsForDate(date: string): Promise<TimeSlot[]> {
    const d = new Date(`${date}T00:00:00`);
    if (isWeekend(d)) return [];

    const seed = d.getDate() + d.getMonth() * 31;
    return WORK_HOURS.map((time, i) => ({
      id: `${date}-${time}`,
      date,
      time,
      available: (seed + i) % 3 !== 0,
    }));
  }

  async getAvailableDatesInMonth(year: number, month: number): Promise<string[]> {
    const dates: string[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const current = new Date(year, month, day);
      if (isWeekend(current)) continue;
      if (current < new Date(new Date().toDateString())) continue;
      dates.push(format(current, "yyyy-MM-dd"));
    }
    return dates;
  }

  async reserveSlot(slot: TimeSlot, appointmentId: string) {
    return { externalEventId: `mock_${appointmentId}_${slot.id}` };
  }
}

/**
 * Google Calendar provider skeleton. Requires GOOGLE_CALENDAR_CLIENT_ID,
 * GOOGLE_CALENDAR_CLIENT_SECRET, GOOGLE_CALENDAR_REFRESH_TOKEN and
 * GOOGLE_CALENDAR_ID (see .env.example). Wire up `googleapis` here.
 */
class GoogleCalendarProvider implements CalendarProvider {
  async getSlotsForDate(): Promise<TimeSlot[]> {
    throw new Error(
      "GoogleCalendarProvider not implemented yet. Set NEXT_PUBLIC_CALENDAR_PROVIDER=supabase or finish the integration in services/calendarService.ts."
    );
  }
  async getAvailableDatesInMonth(): Promise<string[]> {
    throw new Error("GoogleCalendarProvider not implemented yet.");
  }
  async reserveSlot(): Promise<{ externalEventId: string }> {
    throw new Error("GoogleCalendarProvider not implemented yet.");
  }
}

/**
 * Calendly provider skeleton. Requires CALENDLY_API_KEY and
 * CALENDLY_EVENT_TYPE_URI (see .env.example).
 */
class CalendlyProvider implements CalendarProvider {
  async getSlotsForDate(): Promise<TimeSlot[]> {
    throw new Error("CalendlyProvider not implemented yet.");
  }
  async getAvailableDatesInMonth(): Promise<string[]> {
    throw new Error("CalendlyProvider not implemented yet.");
  }
  async reserveSlot(): Promise<{ externalEventId: string }> {
    throw new Error("CalendlyProvider not implemented yet.");
  }
}

function resolveProvider(): CalendarProvider {
  const provider = process.env.NEXT_PUBLIC_CALENDAR_PROVIDER;
  switch (provider) {
    case "mock":
      return new MockCalendarProvider();
    case "google":
      return new GoogleCalendarProvider();
    case "calendly":
      return new CalendlyProvider();
    default:
      return new SupabaseCalendarProvider();
  }
}

export const calendarService = resolveProvider();
