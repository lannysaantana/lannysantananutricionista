import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Differentials } from "@/components/landing/Differentials";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Services } from "@/components/landing/Services";
import { AboutMe } from "@/components/landing/AboutMe";
import { Results } from "@/components/landing/Results";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppFloat } from "@/components/landing/WhatsAppFloat";
import { StickyBookButton } from "@/components/landing/StickyBookButton";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-20 lg:pb-0">
      <Header />
      <Hero />
      <Differentials />
      <HowItWorks />
      <Services />
      <AboutMe />
      <Results />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
      <StickyBookButton />
    </main>
  );
}
