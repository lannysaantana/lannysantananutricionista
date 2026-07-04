"use client";

import { FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { exportAppointmentsToCSV, exportAppointmentsToExcel } from "@/utils/exportAppointments";
import type { Appointment } from "@/types/appointment";

export function ExportButtons({ appointments }: { appointments: Appointment[] }) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={appointments.length === 0}
        onClick={() => exportAppointmentsToExcel(appointments)}
      >
        <FileSpreadsheet className="h-4 w-4" />
        Excel
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={appointments.length === 0}
        onClick={() => exportAppointmentsToCSV(appointments)}
      >
        <FileText className="h-4 w-4" />
        CSV
      </Button>
    </div>
  );
}
