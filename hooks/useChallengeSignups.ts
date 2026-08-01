"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listChallengeAnamneseGrouped,
  listChallengeSignups,
  updateChallengeSignup,
} from "@/services/challengeService";
import type { ChallengeSignup } from "@/types/challenge";

const SIGNUPS_KEY = "challenge-signups";
const ANAMNESE_KEY = "challenge-anamnese";

export function useChallengeSignups() {
  return useQuery({ queryKey: [SIGNUPS_KEY], queryFn: listChallengeSignups });
}

export function useChallengeAnamneseGrouped() {
  return useQuery({ queryKey: [ANAMNESE_KEY], queryFn: listChallengeAnamneseGrouped });
}

export function useChallengeSignupMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [SIGNUPS_KEY] });

  const markPaid = useMutation({
    mutationFn: (id: string) => updateChallengeSignup(id, { payment_status: "paid" }),
    onSuccess: invalidate,
  });

  const updateSignup = useMutation({
    mutationFn: ({ id, changes }: { id: string; changes: Partial<ChallengeSignup> }) =>
      updateChallengeSignup(id, changes),
    onSuccess: invalidate,
  });

  return { markPaid, updateSignup };
}
