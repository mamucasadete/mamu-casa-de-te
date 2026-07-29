/**
 * Standalone Sanity Studio for MAMU Casa de Té
 *
 * Runs on port 3333 (separate from Next.js on port 3000).
 * This is the recommended approach to avoid Next.js 16 + Turbopack
 * compilation issues with embedded studios.
 *
 * Run with: cd studio && bun run dev
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "mamu-casa-de-te",
  title: "MAMU Casa de Té · Admin",

  projectId: "ne69571t",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("MAMU Casa de Té")
          .items([
            S.listItem()
              .title("📋 Menú")
              .child(S.documentTypeList("menuItem").title("Items del menú")),
            S.listItem()
              .title("🎉 Eventos")
              .child(S.documentTypeList("event").title("Eventos")),
            S.listItem()
              .title("❓ Preguntas Frecuentes")
              .child(S.documentTypeList("faq").title("Preguntas")),
            S.listItem()
              .title("📸 Galería de fotos")
              .child(S.documentTypeList("galleryPhoto").title("Fotos")),
            S.listItem()
              .title("🕐 Horarios")
              .child(
                S.document()
                  .schemaType("hours")
                  .documentId("horarios-actuales")
                  .title("Horarios de atención")
              ),
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
