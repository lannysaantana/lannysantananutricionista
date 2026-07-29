"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const COLUMNS = ["Consulta Online", "Plano Plus", "GLP-1 Suporte Metabólico"];

const ROWS: { label: string; values: [boolean, boolean, boolean] }[] = [
  { label: "Consulta completa com Bioimpedância 3D", values: [true, true, true] },
  { label: "Plano alimentar personalizado", values: [true, true, true] },
  { label: "Orientação sobre suplementação", values: [true, true, true] },
  { label: "Lista de substituições alimentares", values: [true, true, true] },
  { label: "Retorno incluso", values: [false, true, true] },
  { label: "Nova avaliação com Bioimpedância 3D", values: [false, true, true] },
  { label: "Suporte via WhatsApp", values: [true, true, true] },
  { label: "Check-ins semanais", values: [false, true, true] },
  { label: "Orientação para viagens e alimentação fora de casa", values: [false, true, true] },
  { label: "Cupons exclusivos", values: [true, true, true] },
  { label: "Acesso ao LannyFitClub", values: [false, true, true] },
  { label: "Estratégias específicas para uso de GLP-1", values: [false, false, true] },
];

export function PlanComparison() {
  return (
    <section id="comparativo" className="scroll-mt-20 bg-beige/60 px-5 py-20 dark:bg-white/[0.03] sm:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl text-ink dark:text-offwhite sm:text-4xl">
            Compare os planos
          </h2>
          <p className="mt-3 font-subtitle text-lg italic text-ink/60 dark:text-offwhite/60">
            Veja lado a lado o que cada acompanhamento inclui.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-3xl border border-sage/10 bg-white/70 shadow-soft dark:bg-white/5"
        >
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-sage/10">
                <th className="px-5 py-4 text-left font-sans text-sm font-medium text-ink/60 dark:text-offwhite/60">
                  Benefício
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-4 text-center font-display text-base text-ink dark:text-offwhite"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, index) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-b border-sage/5 last:border-0",
                    index % 2 === 1 && "bg-sage/[0.03]"
                  )}
                >
                  <td className="px-5 py-3.5 font-sans text-sm text-ink/80 dark:text-offwhite/80">
                    {row.label}
                  </td>
                  {row.values.map((included, i) => (
                    <td key={i} className="px-4 py-3.5 text-center">
                      {included ? (
                        <Check className="mx-auto h-5 w-5 text-sage-dark dark:text-gold" strokeWidth={2} />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-ink/20 dark:text-offwhite/20" strokeWidth={2} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
