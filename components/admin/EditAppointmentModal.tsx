"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppointmentMutations } from "@/hooks/useAppointments";
import type { Appointment, AppointmentStatus } from "@/types/appointment";

interface Props {
  appointment: Appointment | null;
  onClose: () => void;
}

export function EditAppointmentModal({ appointment, onClose }: Props) {
  const { update } = useAppointmentMutations();
  const [form, setForm] = useState<Partial<Appointment>>({});

  const current = { ...appointment, ...form };

  async function handleSave() {
    if (!appointment) return;
    try {
      await update.mutateAsync({ id: appointment.id, changes: form });
      onClose();
    } catch (err) {
      console.error("Falha ao salvar agendamento:", err);
    }
  }

  return (
    <AnimatePresence>
      {appointment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-offwhite p-6 shadow-card dark:bg-[#20241f]"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-xl text-ink dark:text-offwhite">
                Editar agendamento
              </h3>
              <button onClick={onClose} aria-label="Fechar">
                <X className="h-5 w-5 text-ink/60 dark:text-offwhite/60" />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Nome"
                defaultValue={current.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
              <Input
                placeholder="Telefone"
                defaultValue={current.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              />
              <Input
                type="email"
                placeholder="E-mail"
                defaultValue={current.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <div className="flex gap-3">
                <Input
                  type="date"
                  defaultValue={current.appointment_date}
                  onChange={(e) => setForm((f) => ({ ...f, appointment_date: e.target.value }))}
                />
                <Input
                  type="time"
                  defaultValue={current.appointment_time}
                  onChange={(e) => setForm((f) => ({ ...f, appointment_time: e.target.value }))}
                />
              </div>
              <select
                defaultValue={current.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value as AppointmentStatus }))
                }
                className="w-full rounded-xl border border-sage/20 bg-white/80 px-5 py-3 font-sans text-ink outline-none focus:border-gold dark:bg-white/5 dark:text-offwhite"
              >
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="completed">Concluído</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            <Button className="mt-6 w-full" loading={update.isPending} onClick={handleSave}>
              Salvar alterações
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
