import type { Metadata, Viewport } from "next";
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
  title: {
    default: "MAMU Casa de Té · Meriendas de Campo en Calmayo, Córdoba",
    template: "%s · MAMU Casa de Té",
  },
  description:
    "Casa de té y meriendas de campo en Aromahérba, Calmayo (Valle de Calamuchita, Córdoba). Especialidades con lavanda: waffles, infusiones y panes artesanales. Viernes a domingo desde las 17 h. Reservá tu mesa.",
  applicationName: "MAMU Casa de Té",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
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
    "meriendas Calamuchita",
    "qué hacer en Calmayo",
    "campo de lavanda Argentina",
    "Calmayo Córdoba turismo",
    "casa de té con lavanda",
  ],
  authors: [{ name: "MAMU Casa de Té", url: SITE_URL }],
  creator: "MAMU Casa de Té",
  publisher: "MAMU Casa de Té",
  category: "food",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "es-AR": SITE_URL,
      "es": SITE_URL,
    },
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: "MAMU Casa de Té · Meriendas de Campo con Lavanda en Calmayo, Córdoba",
    description:
      "Merendá en un campo de lavanda en Calmayo, Córdoba. Waffles de lavanda, infusiones y panes artesanales. Abierto viernes, sábado y domingo desde las 17 h. Reservá tu mesa por WhatsApp.",
    url: SITE_URL,
    siteName: "MAMU Casa de Té",
    locale: "es_AR",
    alternateLocale: ["es_ES", "es_MX"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MAMU Casa de Té — Meriendas de Campo con Lavanda en Calmayo, Córdoba",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mamu_casa_de_te",
    creator: "@mamu_casa_de_te",
    title: "MAMU Casa de Té · Meriendas de Campo en Calmayo, Córdoba",
    description:
      "Merendá en un campo de lavanda en Calmayo, Córdoba. Especialidades con lavanda, viernes a domingo desde las 17 h.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/images/favicon.png", sizes: "512x512" }],
    shortcut: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "GOOGLE_VERIFICATION_CODE_HERE",
  },
  other: {
    "theme-color": "#6D5D8A",
    "msapplication-TileColor": "#6D5D8A",
    "format-detection": "telephone=yes",
    "geo.region": "AR-X",
    "geo.placename": "Calmayo, Córdoba",
    "geo.position": "-32.21;-64.55",
    "ICBM": "-32.21, -64.55",
    "author": "MAMU Casa de Té",
    "language": "Spanish",
    "rating": "general",
    "distribution": "global",
    "revisit-after": "7 days",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF6EE" },
    { media: "(prefers-color-scheme: dark)", color: "#6D5D8A" },
  ],
};

// ============================
// Structured Data (JSON-LD)
// ============================

// 1. LocalBusiness / CafeOrCoffeeShop — el negocio principal
const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["CafeOrCoffeeShop", "Restaurant", "TouristAttraction"],
  "@id": `${SITE_URL}/#business`,
  name: "MAMU Casa de Té",
  alternateName: "Mamu Meriendas de Campo",
  description:
    "Casa de té y meriendas de campo con especialidades de lavanda en Aromahérba, Calmayo, Córdoba. Waffles de lavanda, infusiones y panes artesanales.",
  url: SITE_URL,
  telephone: "+541157496667",
  email: "hola@mamucasadete.com.ar",
  image: [
    `${SITE_URL}/images/predio-panoramica.jpg`,
    `${SITE_URL}/images/waffle-lavanda.jpg`,
    `${SITE_URL}/images/taza-te.jpg`,
    `${SITE_URL}/images/ramo-lavandas.jpg`,
    `${SITE_URL}/og-image.png`,
  ],
  logo: `${SITE_URL}/images/logo-mamu.png`,
  priceRange: "$$",
  currenciesAccepted: "ARS",
  paymentAccepted: "Efectivo, Transferencia",
  servesCuisine: ["Té", "Meriendas", "Repostería artesanal", "Especialidades de lavanda", "Comida de campo"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Calmayo",
    addressRegion: "Córdoba",
    addressCountry: "AR",
    streetAddress: "Aromahérba, Calmayo",
    postalCode: "X5194",
    addressFull: "Aromahérba, Calmayo, Valle de Calamuchita, Córdoba, Argentina",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -32.21,
    longitude: -64.55,
  },
  hasMap: `https://www.google.com/maps?q=${encodeURIComponent("Aromahérba, Calmayo, Córdoba, Argentina")}`,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  specialOpeningHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      description: "Enero y febrero: abrimos jueves, viernes, sábados y domingos de 9 a 20 horas.",
      validFrom: "2026-01-01",
      validThrough: "2026-02-28",
    },
    {
      "@type": "OpeningHoursSpecification",
      description: "Feriados y Fiesta de la Cosecha de la Lavanda: horarios extendidos, consultar.",
      validFrom: "2026-01-01",
      validThrough: "2026-12-31",
    },
  ],
  sameAs: [
    "https://www.instagram.com/mamu_casa_de_te/",
    "https://www.facebook.com/AROMAHERBACALMAYO",
    "https://www.aromaherba.com.ar/",
  ],
  parentOrganization: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#parent-org`,
    name: "Aromahérba",
    url: "https://www.aromaherba.com.ar",
    description:
      "Establecimiento serrano en Calmayo dedicado al cultivo de lavanda, aceites esenciales y perfumes. Sede de la Fiesta de la Cosecha de la Lavanda.",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Carolina M.",
      },
      reviewBody: "Un paraíso serrano. Los waffles de lavanda son únicos y la atención es amorosa. Volvería mil veces.",
      datePublished: "2025-12-10",
    },
    {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Federico A.",
      },
      reviewBody: "Excelente para una merienda de campo. El té de lavanda y los panes recién horneados, imperdibles.",
      datePublished: "2025-11-22",
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "MenuItem",
        name: "Merienda Mamu",
        description: "Tetera de té de lavanda (3 tazas), 2 scones tibios con mermelada y 2 porciones de torta de la casa.",
      },
      price: "8500",
      priceCurrency: "ARS",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "MenuItem",
        name: "Waffle de lavanda clásico",
        description: "Masa de lavanda, miel silvestre, crema chantilly infusionada y frutos rojos.",
      },
      price: "4800",
      priceCurrency: "ARS",
    },
  ],
  hasMenu: {
    "@type": "Menu",
    name: "Carta de MAMU Casa de Té",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Meriendas de campo",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Merienda Mamu",
            description: "Tetera de té de lavanda, 2 scones tibios y 2 porciones de torta.",
            offers: { "@type": "Offer", price: "8500", priceCurrency: "ARS" },
          },
          {
            "@type": "MenuItem",
            name: "Merienda Serrana",
            description: "Café o té, pan de campo con miel y queso, torta de lavanda y limón.",
            offers: { "@type": "Offer", price: "5800", priceCurrency: "ARS" },
          },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Waffles & postres",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Waffle de lavanda clásico",
            description: "Masa de lavanda, miel silvestre, crema y frutos rojos.",
            offers: { "@type": "Offer", price: "4800", priceCurrency: "ARS" },
          },
          {
            "@type": "MenuItem",
            name: "Torta de lavanda y limón",
            description: "Bizcocho húmedo con glaseado de limón y flores frescas.",
            offers: { "@type": "Offer", price: "3400", priceCurrency: "ARS" },
          },
        ],
      },
    ],
  },
};

// 2. WebSite schema (para sitelinks search box)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "MAMU Casa de Té",
  description: "Meriendas de campo con lavanda en Calmayo, Córdoba",
  publisher: { "@id": `${SITE_URL}/#business` },
  inLanguage: "es-AR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// 3. FAQPage schema (rich snippets de preguntas frecuentes)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Dónde queda MAMU Casa de Té?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MAMU Casa de Té está ubicada en Aromahérba, establecimiento serrano en Calmayo, Valle de Calamuchita, provincia de Córdoba, Argentina. A 87 km al sur de Córdoba capital.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuáles son los horarios de atención?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Abrimos los días viernes, sábados y domingos desde las 17 h hasta el atardecer. En feriados y durante la Fiesta de la Cosecha de la Lavanda (enero) tenemos horarios extendidos. Te recomendamos consultar por WhatsApp antes de viajar.",
      },
    },
    {
      "@type": "Question",
      name: "¿Necesito reserva previa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para los fines de semana y eventos especiales te recomendamos reservar con anticipación. Podés reservar por WhatsApp al 11 5749 6667 o usando el formulario de reservas en esta web.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuál es la especialidad de MAMU?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nuestra especialidad son los waffles de lavanda, hechos con esencia de lavanda cosechada en Aromahérba. También ofrecemos té de lavanda, panes saborizados y postres de estación.",
      },
    },
    {
      "@type": "Question",
      name: "¿Tienen opciones veganas o sin gluten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, contamos con opciones veganas y sin gluten. Te pedimos avisarnos al reservar para prepararte algo especial.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo llego a Calmayo desde Córdoba capital?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Desde Córdoba capital, tomá la Ruta 5 hacia Santa Rosa de Calamuchita y luego 16 km más hasta Calmayo. El viaje en auto toma aproximadamente 1 hora 20 minutos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuándo es la Fiesta de la Cosecha de la Lavanda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La Fiesta de la Cosecha de la Lavanda se realiza cada verano en Aromahérba, generalmente los primeros días de enero. Es un evento único con cosecha, feria de productores y meriendas temáticas. Consultá fecha exacta por Instagram @mamu_casa_de_te.",
      },
    },
  ],
};

// 4. BreadcrumbList
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${SITE_URL}/#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Casa de Té",
      item: `${SITE_URL}/#sobre`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Menú",
      item: `${SITE_URL}/#menu`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Reservas",
      item: `${SITE_URL}/#reservas`,
    },
  ],
};

// 5. Event — Fiesta de la Cosecha de la Lavanda
const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${SITE_URL}/#event-lavanda`,
  name: "Fiesta de la Cosecha de la Lavanda 2026",
  description:
    "Jornada de cosecha de lavanda al amanecer en Aromahérba, con feria de productores serranos, música en vivo y meriendas temáticas.",
  image: `${SITE_URL}/images/ramo-lavandas.jpg`,
  startDate: "2026-01-04T08:00:00-03:00",
  endDate: "2026-01-04T18:00:00-03:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Aromahérba",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calmayo",
      addressRegion: "Córdoba",
      addressCountry: "AR",
      streetAddress: "Aromahérba, Calmayo",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Aromahérba",
    url: "https://www.aromaherba.com.ar",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "ARS",
    availability: "https://schema.org/InStock",
    url: SITE_URL,
    validFrom: "2025-10-01",
  },
};

// Combine all schemas
const allSchemas = [businessSchema, websiteSchema, faqSchema, breadcrumbSchema, eventSchema];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="alternate" type="application/rss+xml" title="MAMU Casa de Té" href="/feed.xml" />
        <meta name="google-site-verification" content="GOOGLE_VERIFICATION_CODE_HERE" />
        {allSchemas.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
