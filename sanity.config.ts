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
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { media } from "sanity-plugin-media";

export default defineConfig({
  name: "mamu-casa-de-te",
  title: "MAMU Casa de Té · Admin",

  // These come from .env.local — never hardcode them here
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "YOUR_PROJECT_ID",
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
                S.list()
                  .title("Categorías del menú")
                  .items([
                    S.listItem()
                      .title("Meriendas de campo")
                      .child(
                        S.documentList()
                          .title("Items")
                          .filter('_type == "menuItem" && category == "meriendas"')
                      ),
                    S.listItem()
                      .title("Waffles & postres")
                      .child(
                        S.documentList()
                          .title("Items")
                          .filter('_type == "menuItem" && category == "waffles"')
                      ),
                    S.listItem()
                      .title("Tortas")
                      .child(
                        S.documentList()
                          .title("Items")
                          .filter('_type == "menuItem" && category == "tortas"')
                      ),
                    S.listItem()
                      .title("Postres helados")
                      .child(
                        S.documentList()
                          .title("Items")
                          .filter('_type == "menuItem" && category == "postres-helados"')
                      ),
                    S.listItem()
                      .title("Infusiones")
                      .child(
                        S.documentList()
                          .title("Items")
                          .filter('_type == "menuItem" && category == "infusiones"')
                      ),
                  ])
              ),

            // ——— EVENTOS ———
            S.listItem()
              .title("🎉 Eventos")
              .child(
                S.documentTypeList("event").title("Eventos")
              ),

            // ——— FAQ ———
            S.listItem()
              .title("❓ Preguntas Frecuentes")
              .child(
                S.documentTypeList("faq").title("Preguntas")
              ),

            // ——— GALERÍA ———
            S.listItem()
              .title("📸 Galería de fotos")
              .child(
                S.documentTypeList("galleryPhoto").title("Fotos")
              ),

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

            S.divider(),

            // ——— MEDIA LIBRARY ———
            S.listItem()
              .title("🖼️ Biblioteca de imágenes")
              .child(
                S.component()
                  .title("Media")
                  .component(media)
              ),
          ]),
    }),
    visionTool(),
    media(),
  ],

  schema: {
    types: schemaTypes,
  },
});
