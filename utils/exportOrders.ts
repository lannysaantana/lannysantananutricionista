"use client";

import * as XLSX from "xlsx";
import type { Order } from "@/types/order";
import { formatCurrencyBRL, formatDateShort } from "./formatters";

function toRows(orders: Order[]) {
  return orders.map((o) => ({
    Nome: o.name,
    Idade: o.age,
    Telefone: o.phone,
    Email: o.email,
    Plano: o.service_plan_key,
    Pagamento: o.payment_method,
    Status: o.status,
    "Status pagamento": o.payment_status,
    Valor: formatCurrencyBRL(o.amount_cents),
    "Criado em": formatDateShort(o.created_at.slice(0, 10)),
  }));
}

export function exportOrdersToExcel(orders: Order[], filename = "pedidos.xlsx") {
  const worksheet = XLSX.utils.json_to_sheet(toRows(orders));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");
  XLSX.writeFile(workbook, filename);
}

export function exportOrdersToCSV(orders: Order[], filename = "pedidos.csv") {
  const worksheet = XLSX.utils.json_to_sheet(toRows(orders));
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
