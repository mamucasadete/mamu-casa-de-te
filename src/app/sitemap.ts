import type { MetadataRoute } from "next";

const SITE_URL = "https://mamucasadete.com.ar";

// Las secciones de la single-page site, tratadas como anchors con prioridad SEO
const SECTIONS = [
  { path: "/", section: "", priority: 1.0, changeFreq: "weekly" as const },
  { path: "/#sobre", section: "sobre", priority: 0.9, changeFreq: "monthly" as const },
  { path: "/#especialidades", section: "especialidades", priority: 0.9, changeFreq: "monthly" as const },
  { path: "/#menu", section: "menu", priority: 0.9, changeFreq: "weekly" as const },
  { path: "/#galeria", section: "galeria", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/#eventos", section: "eventos", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/#como-llegar", section: "como-llegar", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/#reservas", section: "reservas", priority: 0.9, changeFreq: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return SECTIONS.map((section) => ({
    url: `${SITE_URL}${section.path}`,
    lastModified: now,
    changeFrequency: section.changeFreq,
    priority: section.priority,
  }));
}
