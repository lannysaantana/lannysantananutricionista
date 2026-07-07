"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPaymentSettings,
  listServicePlans,
  updateCardSurcharge,
  updateServicePlan,
} from "@/services/pricingService";
import type { ServicePlanUpdate } from "@/types/order";

const PLANS_KEY = "service-plans";
const PAYMENT_SETTINGS_KEY = "payment-settings";

export function useServicePlans(activeOnly = false) {
  return useQuery({
    queryKey: [PLANS_KEY, activeOnly],
    queryFn: () => listServicePlans(activeOnly),
  });
}

export function useUpdateServicePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (row: ServicePlanUpdate) => updateServicePlan(row),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PLANS_KEY] }),
  });
}

export function usePaymentSettings() {
  return useQuery({ queryKey: [PAYMENT_SETTINGS_KEY], queryFn: getPaymentSettings });
}

export function useUpdateCardSurcharge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (percent: number) => updateCardSurcharge(percent),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PAYMENT_SETTINGS_KEY] }),
  });
}
