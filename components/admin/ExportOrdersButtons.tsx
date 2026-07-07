"use client";

import { FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { exportOrdersToCSV, exportOrdersToExcel } from "@/utils/exportOrders";
import type { Order } from "@/types/order";

export function ExportOrdersButtons({ orders }: { orders: Order[] }) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={orders.length === 0}
        onClick={() => exportOrdersToExcel(orders)}
      >
        <FileSpreadsheet className="h-4 w-4" />
        Excel
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={orders.length === 0}
        onClick={() => exportOrdersToCSV(orders)}
      >
        <FileText className="h-4 w-4" />
        CSV
      </Button>
    </div>
  );
}
