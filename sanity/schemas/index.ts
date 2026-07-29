/**
 * Schema definitions for MAMU Casa de Té Sanity Studio.
 *
 * Each schema = a type of content the owner can edit from the admin panel.
 */

// ——— MENU ITEM ———
const menuItem = {
  name: "menuItem",
  title: "Item del menú",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nombre",
      type: "string",
      description: "Ej: Merienda Mamu, Waffle de lavanda clásico...",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 3,
      description: "Una frase corta que ponga agua a la boca.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Precio (en ARS, sin $)",
      type: "number",
      description: "Solo el número, ej: 15000 (se mostrará como $ 15.000).",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Meriendas de campo", value: "meriendas" },
          { title: "Waffles & postres", value: "waffles" },
          { title: "Tortas", value: "tortas" },
          { title: "Postres helados", value: "postres-helados" },
          { title: "Infusiones", value: "infusiones" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tag",
      title: "Etiqueta especial (opcional)",
      type: "string",
      description: "Ej: 'La estrella', 'Para 2 personas', 'Kids', 'Para compartir'.",
    },
    {
      name: "available",
      title: "Disponible",
      type: "boolean",
      initialValue: true,
      description: "Desmarcar si temporalmente no está disponible.",
    },
    {
      name: "order",
      title: "Orden (menor = primero)",
      type: "number",
      initialValue: 0,
      description: "Para ordenar los items dentro de cada categoría.",
    },
  ],
  orderings: [
    {
      title: "Por orden manual",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Por precio (asc)",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "tag",
    },
    prepare(selection) {
      const { title, price } = selection;
      return {
        title: title,
        subtitle: `$ ${price?.toLocaleString("es-AR") || ""}`,
      };
    },
  },
};

// ——— EVENT ———
const event = {
  name: "event",
  title: "Evento",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título del evento",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Fecha / período",
      type: "string",
      description: "Ej: 'Enero · Cada verano', 'Fines de semana largos'.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cta",
      title: "Texto del botón / CTA",
      type: "string",
      description: "Ej: 'Consulta fecha exacta', 'Reservar mesa'.",
    },
    {
      name: "image",
      title: "Imagen del evento",
      type: "image",
      options: { hotspot: true },
      description: "Foto que se muestra en la card del evento.",
    },
    {
      name: "featured",
      title: "Evento destacado",
      type: "boolean",
      initialValue: false,
      description: "Marcar si es el evento principal.",
    },
    {
      name: "accentColor",
      title: "Color de acento (hex)",
      type: "string",
      description: "Ej: #8B7BA8 (lavanda), #5F7558 (verde campo).",
      initialValue: "#8B7BA8",
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: "Por orden manual",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
    },
  },
};

// ——— FAQ ———
const faq = {
  name: "faq",
  title: "Pregunta frecuente",
  type: "document",
  fields: [
    {
      name: "question",
      title: "Pregunta",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "answer",
      title: "Respuesta",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: "Por orden manual",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "question",
    },
  },
};

// ——— GALLERY PHOTO ———
const galleryPhoto = {
  name: "galleryPhoto",
  title: "Foto de galería",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: "Subir foto nueva. Se optimiza automáticamente.",
    },
    {
      name: "alt",
      title: "Descripción de la foto (alt text)",
      type: "string",
      description: "Texto que se muestra cuando la imagen no carga. Importante para SEO y accesibilidad.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "caption",
      title: "Pie de foto (visible al hacer hover)",
      type: "string",
      description: "Texto itálico que aparece al pasar el mouse.",
    },
    {
      name: "span",
      title: "Tamaño en la grilla",
      type: "string",
      options: {
        list: [
          { title: "Normal (cuadrada)", value: "normal" },
          { title: "Alta (vertical)", value: "tall" },
          { title: "Ancha (horizontal)", value: "wide" },
        ],
        layout: "radio",
      },
      initialValue: "normal",
    },
    {
      name: "order",
      title: "Orden",
      type: "number",
      initialValue: 0,
      description: "Menor número = aparece primero.",
    },
    {
      name: "active",
      title: "Visible en la galería",
      type: "boolean",
      initialValue: true,
      description: "Desmarcar para ocultar temporalmente sin borrar.",
    },
  ],
  orderings: [
    {
      title: "Por orden manual",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
    },
  },
};

// ——— HOURS (singleton) ———
const hours = {
  name: "hours",
  title: "Horarios de atención",
  type: "document",
  fields: [
    {
      name: "schedule",
      title: "Horario durante el año",
      type: "string",
      description: "Ej: 'Fines de semana largos de 10 a 18 horas'.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "summerSchedule",
      title: "Horario de enero y febrero",
      type: "string",
      description: "Ej: 'Jueves a domingo de 9 a 20 horas'.",
    },
    {
      name: "specialNote",
      title: "Nota especial (feriados, eventos)",
      type: "string",
      description: "Ej: 'Eventos y feriados: horarios extendidos'.",
    },
  ],
  preview: {
    select: {
      title: "schedule",
    },
  },
};

// ——— SITE TEXTS (singleton) ———
const siteTexts = {
  name: "siteTexts",
  title: "Textos del sitio",
  type: "document",
  fields: [
    // Hero
    {
      name: "heroBadge",
      title: "📌 Hero — Badge superior",
      type: "string",
      description: "Ej: 'Casa de té · Calmayo · Córdoba'.",
    },
    {
      name: "heroTitle",
      title: "📌 Hero — Título principal",
      type: "string",
      description: "Ej: 'Merendá en un campo de lavanda'.",
    },
    {
      name: "heroSubtitle",
      title: "📌 Hero — Subtítulo",
      type: "text",
      rows: 3,
    },
    {
      name: "heroPrimaryButton",
      title: "📌 Hero — Botón principal",
      type: "string",
      initialValue: "Reservá tu merienda",
    },
    {
      name: "heroSecondaryButton",
      title: "📌 Hero — Botón secundario",
      type: "string",
      initialValue: "Ver la carta",
    },

    // Sobre MAMU
    {
      name: "aboutTitle",
      title: "🌱 Sobre MAMU — Título",
      type: "string",
    },
    {
      name: "aboutText1",
      title: "🌱 Sobre MAMU — Párrafo 1",
      type: "text",
      rows: 5,
    },
    {
      name: "aboutText2",
      title: "🌱 Sobre MAMU — Párrafo 2",
      type: "text",
      rows: 4,
    },

    // Stats
    {
      name: "stat1Value",
      title: "📊 Stat 1 — Número",
      type: "number",
      description: "Ej: 9 (se mostrará como +9).",
    },
    {
      name: "stat1Label",
      title: "📊 Stat 1 — Etiqueta",
      type: "string",
    },
    {
      name: "stat2Value",
      title: "📊 Stat 2 — Número",
      type: "number",
      description: "Ej: 100 (se mostrará como 100%).",
    },
    {
      name: "stat2Label",
      title: "📊 Stat 2 — Etiqueta",
      type: "string",
    },
    {
      name: "stat3Value",
      title: "📊 Stat 3 — Número",
      type: "number",
    },
    {
      name: "stat3Suffix",
      title: "📊 Stat 3 — Sufijo",
      type: "string",
      description: "Ej: ' km'.",
    },
    {
      name: "stat3Label",
      title: "📊 Stat 3 — Etiqueta",
      type: "string",
    },

    // Reservas
    {
      name: "reservasTitle",
      title: "📝 Reservas — Título",
      type: "string",
    },
    {
      name: "reservasDescription",
      title: "📝 Reservas — Descripción",
      type: "text",
      rows: 3,
    },

    // WhatsApp
    {
      name: "whatsappNumber",
      title: "📱 WhatsApp — Número (con código país, sin +)",
      type: "string",
      description: "Ej: 5491157496667.",
    },
  ],
  preview: {
    select: {
      title: "heroTitle",
    },
  },
};

export const schemaTypes = [menuItem, event, faq, galleryPhoto, hours, siteTexts];
