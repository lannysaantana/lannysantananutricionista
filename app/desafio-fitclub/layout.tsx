import { clubDisplay, clubSans } from "@/lib/fonts";

export default function DesafioFitClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${clubDisplay.variable} ${clubSans.variable} min-h-screen bg-club-black font-club-sans`}>
      {children}
    </div>
  );
}
