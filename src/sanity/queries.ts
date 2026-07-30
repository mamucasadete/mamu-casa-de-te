/**
 * Sanity queries — fetch data from Sanity CMS.
 *
 * These functions return the data in the same shape the components expect,
 * so swapping from hardcoded data to Sanity data is transparent.
 */
import { sanityClient } from "./client";

// ============================================================
// MENÚ
// ============================================================
export type MenuCategory =
  | "meriendas"
  | "waffles"
  | "tortas"
  | "postres-helados"
  | "infusiones";

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  tag?: string;
  available: boolean;
  order: number;
};

export type MenuByCategory = Record<string, MenuItem[]>;

const CATEGORY_LABELS: Record<MenuCategory, string> = {
  meriendas: "Meriendas de campo",
  waffles: "Waffles & postres",
  tortas: "Tortas",
  "postres-helados": "Postres helados",
  infusiones: "Infusiones",
};

// Order categories as they appear in the menu
const CATEGORY_ORDER: MenuCategory[] = [
  "meriendas",
  "waffles",
  "tortas",
  "postres-helados",
  "infusiones",
];

export async function getMenu(): Promise<MenuByCategory> {
  const items = await sanityClient.fetch<MenuItem[]>(
    `*[_type == "menuItem" && available == true] | order(category asc, order asc) {
      _id,
      name,
      description,
      price,
      category,
      tag,
      available,
      order
    }`
  );

  // Group by category
  const grouped: MenuByCategory = {};
  for (const cat of CATEGORY_ORDER) {
    const label = CATEGORY_LABELS[cat];
    grouped[label] = items.filter((item) => item.category === cat);
  }

  // Remove empty categories
  for (const key of Object.keys(grouped)) {
    if (grouped[key].length === 0) {
      delete grouped[key];
    }
  }

  return grouped;
}

// ============================================================
// FAQ
// ============================================================
export type FAQ = {
  _id: string;
  question: string;
  answer: string;
  order: number;
};

export async function getFAQs(): Promise<FAQ[]> {
  return sanityClient.fetch<FAQ[]>(
    `*[_type == "faq"] | order(order asc) {
      _id,
      question,
      answer,
      order
    }`
  );
}

// ============================================================
// HORARIOS
// ============================================================
export type Hours = {
  schedule: string;
  summerSchedule?: string;
  specialNote?: string;
};

export async function getHours(): Promise<Hours | null> {
  return sanityClient.fetch<Hours | null>(
    `*[_type == "hours" && _id == "horarios-actuales"][0] {
      schedule,
      summerSchedule,
      specialNote
    }`
  );
}

// ============================================================
// EVENTOS
// ============================================================
export type EventItem = {
  _id: string;
  title: string;
  date: string;
  description: string;
  cta?: string;
  image?: any;
  featured: boolean;
  accentColor: string;
  order: number;
};

export async function getEvents(): Promise<EventItem[]> {
  return sanityClient.fetch<EventItem[]>(
    `*[_type == "event"] | order(order asc) {
      _id,
      title,
      date,
      description,
      cta,
      image,
      featured,
      accentColor,
      order
    }`
  );
}

// ============================================================
// TEXTOS DEL SITIO
// ============================================================
export type SiteTexts = {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroPrimaryButton?: string;
  heroSecondaryButton?: string;
  aboutTitle?: string;
  aboutText1?: string;
  aboutText2?: string;
  stat1Value?: number;
  stat1Label?: string;
  stat2Value?: number;
  stat2Label?: string;
  stat3Value?: number;
  stat3Suffix?: string;
  stat3Label?: string;
  reservasTitle?: string;
  reservasDescription?: string;
  whatsappNumber?: string;
};

export async function getSiteTexts(): Promise<SiteTexts | null> {
  return sanityClient.fetch<SiteTexts | null>(
    `*[_type == "siteTexts" && _id == "textos-generales"][0] {
      heroBadge,
      heroTitle,
      heroSubtitle,
      heroPrimaryButton,
      heroSecondaryButton,
      aboutTitle,
      aboutText1,
      aboutText2,
      stat1Value,
      stat1Label,
      stat2Value,
      stat2Label,
      stat3Value,
      stat3Suffix,
      stat3Label,
      reservasTitle,
      reservasDescription,
      whatsappNumber
    }`
  );
}
