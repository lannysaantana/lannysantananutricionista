export type BusinessHours = {
  weekday: number; // 0 = Sunday ... 6 = Saturday
  is_open: boolean;
  start_time: string; // "HH:mm:ss"
  end_time: string; // "HH:mm:ss"
  slot_duration_minutes: number;
  updated_at: string;
};

export type BusinessHoursUpdate = Pick<
  BusinessHours,
  "weekday" | "is_open" | "start_time" | "end_time" | "slot_duration_minutes"
>;

export type BlockedDate = {
  date: string; // ISO date "yyyy-MM-dd"
  reason: string | null;
  created_at: string;
};

export const WEEKDAY_LABELS: Record<number, string> = {
  0: "Domingo",
  1: "Segunda-feira",
  2: "Terça-feira",
  3: "Quarta-feira",
  4: "Quinta-feira",
  5: "Sexta-feira",
  6: "Sábado",
};

export const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
