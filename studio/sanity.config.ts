/**
 * Standalone Sanity Studio for MAMU Casa de Té
 *
 * Deployed as a static site on Vercel at: mamu-studio.vercel.app
 * The owner logs in with mamucasadete@gmail.com to edit:
 * - Menu items (prices, descriptions, tags)
 * - Events
 * - FAQ
 * - Hours
 * - Photos (uploaded by admin)
 * - Site texts (hero, about, etc.)
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "mamu-casa-de-te",
  title: "MAMU Casa de Té · Admin",

  projectId: "ne69571t",
  dataset: "production",

  //basePath: "/studio", // uncomment if deployed under a subpath

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("MAMU Casa de Té")
          .items([
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
