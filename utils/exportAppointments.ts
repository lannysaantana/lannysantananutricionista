"use client";

import * as XLSX from "xlsx";
import type { Appointment } from "@/types/appointment";
import { PATIENT_OBJECTIVE_LABELS, CONSULTATION_TYPE_LABELS } from "@/types/booking";
import { formatCurrencyBRL, formatDateShort } from "./formatters";

function toRows(appointments: Appointment[]) {
  return appointments.map((a) => ({
    Nome: a.name,
    Idade: a.age,
    Telefone: a.phone,
    Email: a.email,
    Objetivo: PATIENT_OBJECTIVE_LABELS[a.objective] ?? a.objective,
    "Tipo de consulta": CONSULTATION_TYPE_LABELS[a.consultation_type] ?? a.consultation_type,
    Data: formatDateShort(a.appointment_date),
    Horário: a.appointment_time,
    Status: a.status,
    Pagamento: a.payment_status,
    Valor: formatCurrencyBRL(a.amount),
  }));
}

export function exportAppointmentsToExcel(appointments: Appointment[], filename = "pacientes.xlsx") {
  const worksheet = XLSX.utils.json_to_sheet(toRows(appointments));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pacientes");
  XLSX.writeFile(workbook, filename);
}

export function exportAppointmentsToCSV(appointments: Appointment[], filename = "pacientes.csv") {
  const worksheet = XLSX.utils.json_to_sheet(toRows(appointments));
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
