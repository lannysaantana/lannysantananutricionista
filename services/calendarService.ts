import type { TimeSlot } from "@/types/booking";
import { addDays, format, isWeekend } from "date-fns";

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

const WORK_HOURS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

/**
 * Deterministic mock provider used until a real integration is connected.
 * Weekends are closed; each remaining weekday exposes a pseudo-random
 * subset of the standard work hours as "available" so the calendar UI has
 * something realistic to render in development.
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
    const first = new Date(year, month, 1);
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
    // TODO: replace with a real reservation once a provider is wired up.
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
      "GoogleCalendarProvider not implemented yet. Set NEXT_PUBLIC_CALENDAR_PROVIDER=mock or finish the integration in services/calendarService.ts."
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
    case "google":
      return new GoogleCalendarProvider();
    case "calendly":
      return new CalendlyProvider();
    default:
      return new MockCalendarProvider();
  }
}

export const calendarService = resolveProvider();
