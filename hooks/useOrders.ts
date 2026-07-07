"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelOrder,
  confirmOrderPayment,
  listAllSessionsGrouped,
  listOrders,
  rescheduleOrderSession,
  updateOrderSession,
} from "@/services/orderService";
import type { OrderSession } from "@/types/order";

const ORDERS_KEY = "orders";
const SESSIONS_KEY = "order-sessions";

export function useOrders() {
  return useQuery({ queryKey: [ORDERS_KEY], queryFn: listOrders });
}

export function useOrderSessionsGrouped() {
  return useQuery({ queryKey: [SESSIONS_KEY], queryFn: listAllSessionsGrouped });
}

export function useOrderMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [ORDERS_KEY] });
    queryClient.invalidateQueries({ queryKey: [SESSIONS_KEY] });
  };

  const confirmPayment = useMutation({
    mutationFn: (id: string) => confirmOrderPayment(id),
    onSuccess: invalidate,
  });

  const cancel = useMutation({
    mutationFn: (id: string) => cancelOrder(id),
    onSuccess: invalidate,
  });

  const cancelSession = useMutation({
    mutationFn: (sessionId: string) => updateOrderSession(sessionId, { status: "cancelled" }),
    onSuccess: invalidate,
  });

  const reschedule = useMutation({
    mutationFn: ({ session, date, time }: { session: OrderSession; date: string; time: string }) =>
      rescheduleOrderSession(session, date, time),
    onSuccess: invalidate,
  });

  return { confirmPayment, cancel, cancelSession, reschedule };
}
