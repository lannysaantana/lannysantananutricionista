import type { Metadata } from "next";
import { AnamneseForm } from "@/components/fitclub/AnamneseForm";

export const metadata: Metadata = {
  title: "Anamnese — Desafio Fit Club",
  robots: { index: false, follow: false },
};

export default async function DesafioFitClubAnamnesePage({
  params,
}: {
  params: Promise<{ signupId: string }>;
}) {
  const { signupId } = await params;

  return (
    <main className="min-h-screen px-5 py-12 sm:py-16">
      <AnamneseForm signupId={signupId} />
    </main>
  );
}
