import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const SITE_URL = "https://mamu-casa-de-te.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MAMU Casa de Té · Meriendas de Campo en Calmayo, Córdoba",
  description:
    "Casa de té y meriendas de campo en Aromahérba, Calmayo (Valle de Calamuchita, Córdoba). Especialidades con lavanda: waffles, infusiones y panes artesanales. Viernes a domingo desde las 17 h. Reservá tu mesa.",
  keywords: [
    "casa de té Córdoba",
    "meriendas de campo Calmayo",
    "Aromahérba",
    "lavanda Córdoba",
    "Calamuchita",
    "waffles de lavanda",
    "té artesanal Córdoba",
    "merienda serrana",
    "casa de té Calamuchita",
    "Mamu Casa de Té",
    "turismo Calmayo",
    "Fiesta de la Cosecha de Lavanda",
  ],
  authors: [{ name: "MAMU Casa de Té" }],
  creator: "MAMU Casa de Té",
  publisher: "MAMU Casa de Té",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "MAMU Casa de Té · Meriendas de Campo con Lavanda",
    description:
      "Merendá en un campo de lavanda en Calmayo, Córdoba. Waffles de lavanda, infusiones y panes artesanales. Viernes a domingo desde las 17 h.",
    url: SITE_URL,
    siteName: "MAMU Casa de Té",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MAMU Casa de Té — Meriendas de Campo en Calmayo, Córdoba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAMU Casa de Té · Meriendas de Campo en Calmayo",
    description:
      "Merendá en un campo de lavanda en Calmayo, Córdoba. Especialidades con lavanda, viernes a domingo desde las 17 h.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "food",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "MAMU Casa de Té",
  alternateName: "Mamu Meriendas de Campo",
  description:
    "Casa de té y meriendas de campo con especialidades de lavanda en Aromahérba, Calmayo, Córdoba.",
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  telephone: "+541157496667",
  priceRange: "$$",
  servesCuisine: ["Té", "Meriendas", "Repostería artesanal", "Especialidades de lavanda"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calmayo",
    addressRegion: "Córdoba",
    addressCountry: "AR",
    streetAddress: "Aromahérba, Calmayo",
    postalCode: "X5194",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -32.21,
    longitude: -64.55,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday", "Sunday"],
      opens: "17:00",
      closes: "21:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/mamu_casa_de_te/",
    "https://www.facebook.com/AROMAHERBACALMAYO",
    "https://www.aromaherba.com.ar/",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "Aromahérba",
    url: "https://www.aromaherba.com.ar",
    description:
      "Establecimiento serrano en Calmayo dedicado al cultivo de lavanda, aceites esenciales y perfumes. Sede de la Fiesta de la Cosecha de la Lavanda.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${cormorant.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
