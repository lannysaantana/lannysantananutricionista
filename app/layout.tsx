import type { Metadata } from "next";
import { playfair, cormorant, poppins } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AssistenteLanny } from "@/components/chatbot/AssistenteLanny";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION, BUSINESS_INFO, BUSINESS_WHATSAPP } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Nutrição personalizada`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "nutricionista",
    "consulta nutricional",
    "teleconsulta",
    "plano alimentar",
    "reeducação alimentar",
    "emagrecimento saudável",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Nutrição personalizada para transformar sua saúde`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Nutrição personalizada`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

// NOTE: telephone/address/sameAs pull from lib/config.ts placeholders until
// the real business details are confirmed — no fabricated ratings/reviews
// are included here (aggregateRating requires real, collected reviews).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  email: BUSINESS_INFO.email,
  telephone: `+${BUSINESS_WHATSAPP}`,
  medicalSpecialty: "Nutrition",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: BUSINESS_INFO.city,
    addressRegion: BUSINESS_INFO.state,
    addressCountry: "BR",
  },
  sameAs: [BUSINESS_INFO.instagramUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-offwhite dark:bg-[#20241f] font-sans antialiased">
        <ThemeProvider>
          <QueryProvider>
            {children}
            <AssistenteLanny />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
