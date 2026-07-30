/**
 * Sanity Studio configuration for MAMU Casa de Té
 *
 * The Studio is the admin panel where the owner edits:
 * - Menu items (prices, descriptions, tags)
 * - Events
 * - FAQ
 * - Hours
 * - Photos (uploaded and managed by the admin)
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "mamu-casa-de-te",
  title: "MAMU Casa de Té · Admin",

  // These come from .env.local — never hardcode them here
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "ne69571t",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("MAMU Casa de Té")
          .items([
            // ——— MENÚ ———
            S.listItem()
              .title("📋 Menú")
              .child(
                S.documentTypeList("menuItem")
                  .title("Items del menú")
                  .defaultOrdering([
                    { field: "category", direction: "asc" },
                    { field: "order", direction: "asc" },
                  ])
              ),

            // ——— EVENTOS ———
            S.listItem()
              .title("🎉 Eventos")
              .child(S.documentTypeList("event").title("Eventos")),

            // ——— FAQ ———
            S.listItem()
              .title("❓ Preguntas Frecuentes")
              .child(S.documentTypeList("faq").title("Preguntas")),

            // ——— GALERÍA ———
            S.listItem()
              .title("📸 Galería de fotos")
              .child(S.documentTypeList("galleryPhoto").title("Fotos")),

            // ——— HORARIOS (singleton) ———
            S.listItem()
              .title("🕐 Horarios")
              .child(
                S.document()
                  .schemaType("hours")
                  .documentId("horarios-actuales")
                  .title("Horarios de atención")
              ),

            // ——— TEXTOS GENERALES (singleton) ———
            S.listItem()
              .title("📝 Textos del sitio")
              .child(
                S.document()
                  .schemaType("siteTexts")
                  .documentId("textos-generales")
                  .title("Textos principales")
              ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
