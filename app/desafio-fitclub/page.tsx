import type { Metadata } from "next";
import { ChallengeHeader } from "@/components/fitclub/ChallengeHeader";
import { ChallengeHero } from "@/components/fitclub/ChallengeHero";
import { AboutChallenge } from "@/components/fitclub/AboutChallenge";
import { ScoringSystem } from "@/components/fitclub/ScoringSystem";
import { Prizes } from "@/components/fitclub/Prizes";
import { Rules } from "@/components/fitclub/Rules";
import { ChallengeTestimonials } from "@/components/fitclub/ChallengeTestimonials";
import { SignupSection } from "@/components/fitclub/SignupSection";
import { ChallengeFooter } from "@/components/fitclub/ChallengeFooter";
import { WhatsAppFloat } from "@/components/landing/WhatsAppFloat";
import { StickySignupButton } from "@/components/fitclub/StickySignupButton";

export const metadata: Metadata = {
  title: "Desafio Fit Club — 21 Dias",
  description:
    "21 dias de foco, constância e acompanhamento para emagrecer ou ganhar massa muscular, com cardápio individualizado, ranking diário e premiação.",
  openGraph: {
    title: "Desafio Fit Club — 21 Dias",
    description:
      "21 dias de foco, constância e acompanhamento para emagrecer ou ganhar massa muscular, com cardápio individualizado, ranking diário e premiação.",
  },
};

export default function DesafioFitClubPage() {
  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      <ChallengeHeader />
      <ChallengeHero />
      <AboutChallenge />
      <ScoringSystem />
      <Prizes />
      <Rules />
      <ChallengeTestimonials />
      <SignupSection />
      <ChallengeFooter />
      <WhatsAppFloat />
      <StickySignupButton />
    </main>
  );
}
