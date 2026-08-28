import type { Metadata } from "next";
import { Anton, Montserrat } from "next/font/google";
import { BrandedLoader } from "@/components/BrandedLoader";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { RevealObserver } from "@/components/RevealObserver";
import { company } from "@/data/site";
import "./globals.css";

const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-loaded",
  display: "swap",
});

const body = Montserrat({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://constructioninnovatech.com"),
  title: {
    default: "Construction Innovatech | Entrepreneur général à Québec",
    template: "%s | Construction Innovatech",
  },
  description:
    "Construction neuve, rénovation et agrandissement dans la grande région de Québec. Plus de 20 ans d’expérience et 2000 projets livrés.",
  openGraph: {
    title: "Construction Innovatech",
    description: "Votre entrepreneur en construction et rénovation dans la région de Québec.",
    locale: "fr_CA",
    type: "website",
    images: ["/img/hero-accueil.jpg"],
  },
};

// Sets the `js` flag before first paint. Without it the reveal styles land
// after hydration and already-painted content visibly blinks out then back in.
const NO_FLASH = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.name,
    url: company.url,
    telephone: company.phone,
    email: company.email,
    image: `${company.url}/img/hero-accueil.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.addressLine1,
      addressLocality: "Québec",
      addressRegion: "QC",
      postalCode: "G1H 2Z8",
      addressCountry: "CA",
    },
    areaServed: "Grande région de Québec",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:30",
        closes: "17:00",
      },
    ],
  };

  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <BrandedLoader />
        <a className="skip-link" href="#main-content">Aller au contenu</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileCallBar />
        <RevealObserver />
      </body>
    </html>
  );
}
