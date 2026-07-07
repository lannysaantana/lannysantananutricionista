"use client";

import { useQuery } from "@tanstack/react-query";
import { hasPreviousOrder } from "@/services/pricingService";

/** True once we know this e-mail has never ordered before (safe default: false while loading). */
export function useIsNewPatient(email: string) {
  const query = useQuery({
    queryKey: ["patient-history", email],
    queryFn: () => hasPreviousOrder(email),
    enabled: Boolean(email),
  });

  return { isNewPatient: query.data === false, isLoading: query.isLoading };
}
