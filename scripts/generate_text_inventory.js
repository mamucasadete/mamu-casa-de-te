/**
 * Genera un documento Word (.docx) con el inventario completo de textos
 * del sitio web de MAMU Casa de Té.
 *
 * Estructura: por cada sección del sitio, una tabla con 3 columnas:
 *   | Tipo de texto | Texto actual | Texto nuevo (escribí acá) |
 *
 * La dueña completa la columna "Texto nuevo" y lo devuelve para aplicar cambios.
 */

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, HeadingLevel, AlignmentType, BorderStyle, ShadingType,
  PageOrientation, Header, Footer, PageNumber,
} = require("docx");
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports

// =========================================================================
// PALETA DE COLORES (misma que el sitio MAMU)
// =========================================================================
const P = {
  primary: "6D5D8A",     // lavanda profundo
  accent: "8B7BA8",      // lavanda medio
  soft: "EFE6D6",        // crema oscuro
  cream: "FBF6EE",       // crema
  earth: "3D3530",       // tierra
  gray: "6B5F55",        // gris cálido
  border: "E0D4BD",      // borde
  white: "FFFFFF",
};

// =========================================================================
// HELPERS
// =========================================================================

function cell(text, opts = {}) {
  const {
    bold = false,
    color = P.earth,
    size = 20, // 10pt
    bg = null,
    width = null,
    italic = false,
  } = opts;

  return new TableCell({
    width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    shading: bg ? { type: ShadingType.CLEAR, fill: bg, color: "auto" } : undefined,
    children: [
      new Paragraph({
        spacing: { line: 280, before: 0, after: 0 },
        children: [
          new TextRun({
            text: text || "",
            bold,
            italics: italic,
            color,
            size,
            font: { ascii: "Calibri", hAnsi: "Calibri" },
          }),
        ],
      }),
    ],
  });
}

// Celda grande para escribir texto nuevo (con borde + fondo claro)
function blankCell(opts = {}) {
  const { minHeight = 400 } = opts;
  return new TableCell({
    margins: { top: 160, bottom: 160, left: 160, right: 160 },
    shading: { type: ShadingType.CLEAR, fill: P.cream, color: "auto" },
    children: [
      new Paragraph({
        spacing: { line: 280, before: 0, after: 0 },
        children: [new TextRun({ text: "", size: 20 })],
      }),
    ],
  });
}

// Encabezado de tabla (3 columnas)
function headerRow() {
  return new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: [
      cell("Tipo de texto", { bold: true, color: P.cream, bg: P.primary, size: 20, width: 20 }),
      cell("Texto actual en el sitio", { bold: true, color: P.cream, bg: P.primary, size: 20, width: 40 }),
      cell("Texto nuevo (escribí acá)", { bold: true, color: P.cream, bg: P.primary, size: 20, width: 40 }),
    ],
  });
}

// Fila de texto: tipo + texto actual + celda en blanco
function textRow(tipo, texto, opts = {}) {
  const { minHeight = 400, isLong = false } = opts;
  return new TableRow({
    cantSplit: true,
    children: [
      cell(tipo, { bold: true, color: P.primary, size: 18, bg: P.soft }),
      cell(texto, { color: P.earth, size: 20 }),
      blankCell({ minHeight: isLong ? 800 : 400 }),
    ],
  });
}

// Heading 1 para sección
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 480, after: 240 },
    children: [
      new TextRun({
        text,
        bold: true,
        color: P.primary,
        size: 32, // 16pt
        font: { ascii: "Calibri", hAnsi: "Calibri" },
      }),
    ],
  });
}

// Subtítulo / nota
function note(text) {
  return new Paragraph({
    spacing: { before: 0, after: 200, line: 280 },
    children: [
      new TextRun({
        text,
        italics: true,
        color: P.gray,
        size: 18, // 9pt
        font: { ascii: "Calibri", hAnsi: "Calibri" },
      }),
    ],
  });
}

// Párrafo de instrucciones
function paragraph(text, opts = {}) {
  const { bold = false, color = P.earth, size = 22 } = opts;
  return new Paragraph({
    spacing: { before: 0, after: 200, line: 312 },
    children: [
      new TextRun({
        text,
        bold,
        color,
        size,
        font: { ascii: "Calibri", hAnsi: "Calibri" },
      }),
    ],
  });
}

// Espacio entre secciones
function spacer() {
  return new Paragraph({ spacing: { before: 0, after: 0 }, children: [] });
}

// =========================================================================
// CONTENIDO: INVENTARIO POR SECCIÓN
// =========================================================================

const sections = [];

// ----- INTRODUCCIÓN -----
sections.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 120 },
    children: [
      new TextRun({
        text: "MAMU Casa de Té",
        bold: true,
        color: P.primary,
        size: 44, // 22pt
        font: { ascii: "Calibri", hAnsi: "Calibri" },
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 360 },
    children: [
      new TextRun({
        text: "Inventario de textos del sitio web",
        italics: true,
        color: P.gray,
        size: 28, // 14pt
        font: { ascii: "Calibri", hAnsi: "Calibri" },
      }),
    ],
  }),
  paragraph(
    "Este documento contiene todos los textos que aparecen en el sitio web de MAMU Casa de Té. El objetivo es que la dueña pueda revisar cada texto, modificarlo si lo desea y devolver el documento completado para aplicar los cambios.",
    { color: P.earth }
  ),
  paragraph("Cómo usarlo:", { bold: true, color: P.primary }),
  paragraph(
    "1. Cada sección del sitio tiene su propia tabla con 3 columnas: Tipo de texto, Texto actual (lo que dice hoy la web), y Texto nuevo (un espacio en blanco para escribir el cambio)."
  ),
  paragraph(
    "2. Si querés cambiar un texto, escribí la nueva versión en la columna \"Texto nuevo\"."
  ),
  paragraph(
    "3. Si un texto está bien como está, dejá la columna \"Texto nuevo\" en blanco — no lo voy a tocar."
  ),
  paragraph(
    "4. Si querés eliminar un texto por completo, escribí \"ELIMINAR\" en la columna \"Texto nuevo\"."
  ),
  paragraph(
    "5. Los precios del menú están todos listados — podés actualizarlos si cambiaron.",
    { color: P.earth }
  ),
  spacer(),
);

// ----- 1. HEADER (navegación) -----
sections.push(h1("1. Barra de navegación (header)"));
sections.push(note("Aparece fija arriba de cada página. En mobile se convierte en menú hamburguesa."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Logo - texto principal", "MAMU"),
      textRow("Logo - subtítulo", "Casa de té · Calmayo · Córdoba"),
      textRow("Botón reservar", "Reservar"),
      textRow("Link navegación 1", "Sobre MAMU"),
      textRow("Link navegación 2", "Especialidades"),
      textRow("Link navegación 3", "Menú"),
      textRow("Link navegación 4", "Galería"),
      textRow("Link navegación 5", "Eventos"),
      textRow("Link navegación 6", "Preguntas"),
      textRow("Link navegación 7", "Cómo llegar"),
    ],
  })
);

// ----- 2. HERO -----
sections.push(h1("2. Hero (pantalla principal)"));
sections.push(note("La primera pantalla que ve el visitante, con la foto del campo de lavanda al atardecer."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Badge superior", "Meriendas de campo · Calmayo · Córdoba"),
      textRow("Título principal (H1)", "Merendá en un campo de lavanda", { isLong: true }),
      textRow("Subtítulo / bajada", "Casa de té emplazada en Aromahérba, en el corazón del Valle de Calamuchita. Waffles de lavanda, infusiones y panes artesanales, servidos entre flores serranas.", { isLong: true }),
      textRow("Botón principal", "Reservá tu merienda"),
      textRow("Botón secundario", "Ver la carta"),
      textRow("Chip info horario", "Vie · Sáb · Dom — desde las 17 h"),
      textRow("Chip info ubicación", "Aromahérba · Calmayo · Calamuchita"),
    ],
  })
);

// ----- 3. SOBRE MAMU -----
sections.push(h1("3. Sobre MAMU (nuestra historia)"));
sections.push(note("Sección que cuenta la historia del proyecto y su relación con Aromahérba."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Subtítulo", "Nuestra historia"),
      textRow("Título (H2)", "Un rincón de campo donde el tiempo se detiene", { isLong: true }),
      textRow("Párrafo 1", "MAMU nació como una invitación a merendar entre flores. En medio del cultivo de lavanda de Aromahérba —establecimiento serrano en Calmayo, Valle de Calamuchita— abrimos las puertas de nuestra casa de té para compartir lo que más amamos: el aroma de la lavanda recién cosechada, el pan tibio saliendo del horno y la conversación que se extiende hasta el atardecer.", { isLong: true }),
      textRow("Párrafo 2", "Cada merienda es una experiencia de slow living: infusiones preparadas con hierbas del lugar, waffles de lavanda recién hechos y postres de la casa que cambian con las estaciones. Todo pensado para que desconectes y te quedes un rato más.", { isLong: true }),
      textRow("Bloque Aromahérba - título", "Aromahérba · Nuestra casa"),
      textRow("Bloque Aromahérba - descripción", "Establecimiento serrano dedicado al cultivo de lavanda, producción de aceites esenciales y perfumes. Sede de la Fiesta de la Cosecha de la Lavanda, un evento imperdible del verano cordobés.", { isLong: true }),
      textRow("Bloque Aromahérba - link", "Conocer más sobre Aromahérba"),
      textRow("Stat 1 - número", "+9"),
      textRow("Stat 1 - label", "ediciones de la Fiesta de la Lavanda"),
      textRow("Stat 2 - número", "100%"),
      textRow("Stat 2 - label", "lavanda cosechada en el campo"),
      textRow("Stat 3 - número", "87 km"),
      textRow("Stat 3 - label", "desde Córdoba capital"),
    ],
  })
);

// ----- 4. ESPECIALIDADES -----
sections.push(h1("4. Especialidades con lavanda"));
sections.push(note("Las 4 tarjetas que muestran los productos estrella de MAMU."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Subtítulo", "Lo que hacemos"),
      textRow("Título (H2)", "Especialidades con lavanda"),
      textRow("Descripción", "Cada producto nace del cultivo de Aromahérba. La lavanda la cosechamos nosotras, las hierbas son del jardín y los postres se hornean el mismo día. Cuatro propuestas que definieron la identidad de MAMU.", { isLong: true }),
      textRow("Card 1 - título", "Waffles de lavanda"),
      textRow("Card 1 - descripción", "Nuestra estrella. Masa tibia con esencia de lavanda del campo, miel silvestre y frutas de estación. Servidos con crema chantilly infusionada.", { isLong: true }),
      textRow("Card 2 - título", "Infusiones de la casa"),
      textRow("Card 2 - descripción", "Té negro con lavanda, manzanilla serrana, hierbas frescas del jardín. Teteras de vidrio que rinden tres tazas, servidas con miel pura.", { isLong: true }),
      textRow("Card 3 - título", "Lavanda del campo"),
      textRow("Card 3 - descripción", "Nuestra materia prima. Cosechada a mano en Aromahérba, la usamos en postres, infusiones y productos para llevar. Conocé el cultivo de cerca.", { isLong: true }),
      textRow("Card 4 - título", "Panes & postres de estación"),
      textRow("Card 4 - descripción", "Pan de campo con hierbas, focaccia de lavanda, scones tibios, tortas de lavanda y limón. Hechos a mano cada mañana, cambian con la temporada.", { isLong: true }),
      textRow("Cita final", "\u201CCada taza cuenta una historia de campo, sol y manos serranas.\u201D"),
    ],
  })
);

// ----- 5. MENÚ -----
sections.push(h1("5. Menú / Carta"));
sections.push(note("Todos los items del menú con precios en pesos argentinos. Actualizá precios y descripciones si hace falta."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Subtítulo", "La carta"),
      textRow("Título (H2)", "Nuestra merienda de campo"),
      textRow("Descripción", "Precios orientativos en pesos argentinos. La carta de postres y tortas cambia con las estaciones y lo que nos inspira esa semana. Consultá por opciones sin TACC y veganas.", { isLong: true }),
      textRow("Divisor", "meriendas · waffles · tés · para llevar"),
      textRow("Nota final menú", "Consultá por opciones veganas, sin gluten y alergias alimentarias. Avisanos al reservar.", { isLong: true }),
    ],
  })
);

// Tabla específica para items del menú
sections.push(spacer());
sections.push(note("Items del menú (cambiar nombres, descripciones, precios y tags según corresponda):"));

const menuItems = [
  // Meriendas de campo
  ["Meriendas de campo", "Merienda Mamu", "Tetera de té de lavanda (3 tazas), 2 scones tibios con mermelada y 2 porciones de torta de la casa.", "$ 8.500", "Para 2 personas"],
  ["Meriendas de campo", "Merienda Serrana", "Café o té a elección, pan de campo con miel y queso, porción de torta de lavanda y limón.", "$ 5.800", ""],
  ["Meriendas de campo", "Merienda para los más chicos", "Chocolate con leche, waffle simple con dulce de leche y jugo de naranja natural.", "$ 4.200", "Kids"],
  ["Meriendas de campo", "Picada dulce de lavanda", "Tabla con budín, brownie, scones, frutas de estación, miel y dos infusiones a elección.", "$ 7.600", "Para compartir"],
  // Waffles & postres
  ["Waffles & postres", "Waffle de lavanda clásico", "Masa de lavanda, miel silvestre, crema chantilly infusionada y frutos rojos.", "$ 4.800", "La estrella"],
  ["Waffles & postres", "Waffle del campo", "Con dulce de leche, banana, almendras tostadas y crema.", "$ 5.200", ""],
  ["Waffles & postres", "Torta de lavanda y limón", "Bizcocho húmedo con glaseado de limón y flores de lavanda fresca.", "$ 3.400", ""],
  ["Waffles & postres", "Brownie con nuez", "Brownie casero tibio con helado de crema americana y dulce de leche.", "$ 3.800", ""],
  ["Waffles & postres", "Cheesecake de miel", "Tarta tibia de queso con miel de lavanda y coulis de frutos rojos.", "$ 4.100", ""],
  // Infusiones
  ["Infusiones", "Té de lavanda Mamu", "Té negro con flores de lavanda cosechadas en el campo. Tetera para 3 tazas.", "$ 2.800", "De la casa"],
  ["Infusiones", "Manzanilla serrana", "Hierbas secas del jardín. Suave, ideal para la siesta.", "$ 2.400", ""],
  ["Infusiones", "Hierbas del campo", "Mezcla de peperina, menta y poleo. Típica de las sierras de Córdoba.", "$ 2.400", ""],
  ["Infusiones", "Café serrano", "Café de tetera, espresso o lagrima. Leche vegetal sin cargo.", "$ 1.900", ""],
  ["Infusiones", "Chocolate con leche", "Chocolate tibio espeso con crema chantilly. Para los días frescos.", "$ 2.600", ""],
  // Para llevar
  ["Para llevar", "Sobres de té de lavanda", "Caja con 10 saquitos. Llevate el aroma de MAMU a casa.", "$ 3.500", ""],
  ["Para llevar", "Miel de lavanda", "Frasco de 250 g. Miel pura infusionada con flores de Aromahérba.", "$ 4.200", "Edición limitada"],
  ["Para llevar", "Scones para llevar", "Media docena de scones recién horneados con mermelada a elección.", "$ 3.800", ""],
  ["Para llevar", "Aceite esencial de lavanda", "10 ml puro de Aromahérba. Aromaterapia y uso cosmético.", "$ 6.500", "De Aromahérba"],
];

sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        cantSplit: true,
        children: [
          cell("Categoría", { bold: true, color: P.cream, bg: P.primary, size: 18, width: 15 }),
          cell("Nombre", { bold: true, color: P.cream, bg: P.primary, size: 18, width: 18 }),
          cell("Descripción", { bold: true, color: P.cream, bg: P.primary, size: 18, width: 32 }),
          cell("Precio", { bold: true, color: P.cream, bg: P.primary, size: 18, width: 10 }),
          cell("Tag (opcional)", { bold: true, color: P.cream, bg: P.primary, size: 18, width: 10 }),
          cell("Texto nuevo (si cambia)", { bold: true, color: P.cream, bg: P.primary, size: 18, width: 15 }),
        ],
      }),
      ...menuItems.map(item => new TableRow({
        cantSplit: true,
        children: [
          cell(item[0], { bold: true, color: P.primary, size: 16, bg: P.soft }),
          cell(item[1], { bold: true, color: P.earth, size: 18 }),
          cell(item[2], { color: P.earth, size: 18 }),
          cell(item[3], { color: P.primary, size: 18, bold: true }),
          cell(item[4] || "—", { color: P.gray, size: 16, italic: true }),
          cell("", { bg: P.cream }),
        ],
      })),
    ],
  })
);

// ----- 6. GALERÍA -----
sections.push(h1("6. Galería — Postales de MAMU"));
sections.push(note("Sección con la grilla de fotos. Solo se editan los textos, no las fotos."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Subtítulo", "Postales de MAMU"),
      textRow("Título (H2)", "Un domingo en el campo"),
      textRow("Descripción", "Lavanda en flor, tazas humeantes, mesas al aire libre y el rumor del viento serrano. Así se vive una merienda en Aromahérba.", { isLong: true }),
      textRow("Link a Instagram", "Ver más fotos en Instagram @mamu_casa_de_te →"),
    ],
  })
);

// ----- 7. EVENTOS -----
sections.push(h1("7. Eventos y fechas especiales"));
sections.push(note("Las 3 tarjetas de eventos + el banner final con CTA a Instagram."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Subtítulo", "Agenda serrana"),
      textRow("Título (H2)", "Eventos y fechas especiales"),
      textRow("Descripción", "Algunas fechas en las que MAMU se viste de fiesta. Reservá con anticipación: para los eventos grandes solemos llenar todas las mesas.", { isLong: true }),
      textRow("Badge evento destacado", "Evento destacado"),
      // Evento 1
      textRow("Evento 1 - fecha", "Enero · Cada verano"),
      textRow("Evento 1 - título", "Fiesta de la Cosecha de la Lavanda"),
      textRow("Evento 1 - descripción", "El evento más esperado del año en Aromahérba. Una jornada de cosecha de lavanda al amanecer, feria de productores serranos, música en vivo y meriendas temáticas. Llegá temprano y llevate flores a casa.", { isLong: true }),
      textRow("Evento 1 - CTA", "Consulta fecha exacta"),
      // Evento 2
      textRow("Evento 2 - fecha", "Abril · Anual"),
      textRow("Evento 2 - título", "Calmayo Gastronómico"),
      textRow("Evento 2 - descripción", "Una celebración del Valle de Calamuchita en la que MAMU participa junto a otros cocineros y productores locales. Menú especial de tres pasos con productos de la región.", { isLong: true }),
      textRow("Evento 2 - CTA", "Reservar mesa para el evento"),
      // Evento 3
      textRow("Evento 3 - fecha", "Fines de semana largos"),
      textRow("Evento 3 - título", "Música serrana al atardecer"),
      textRow("Evento 3 - descripción", "Cada vez que hay feriado prolongado, recibimos artistas locales que tocan folklore y música de autor mientras se sirve la merienda. Una pausa que se convierte en recuerdo.", { isLong: true }),
      textRow("Evento 3 - CTA", "Ver próximos fines de semana"),
      // Banner
      textRow("Banner - pregunta", "¿Querés enterarte antes que nadie de los próximos eventos?"),
      textRow("Banner - descripción", "Seguinos en Instagram @mamu_casa_de_te — ahí anunciamos fechas y abrimos reservas.", { isLong: true }),
      textRow("Banner - botón", "Abrir Instagram"),
    ],
  })
);

// ----- 8. CÓMO LLEGAR -----
sections.push(h1("8. Cómo llegar"));
sections.push(note("Sección con el mapa y la información de ubicación, dirección, ruta y horarios."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Subtítulo", "Cómo llegar"),
      textRow("Título (H2)", "Te esperamos en Calmayo"),
      textRow("Descripción", "En el corazón del Valle de Calamuchita, a 87 km al sur de Córdoba capital. Rodeado de sierras, arroyos y campos de lavanda — el viaje ya es parte de la merienda.", { isLong: true }),
      textRow("Bloque dirección - título", "Dirección"),
      textRow("Bloque dirección - contenido", "Aromahérba · Calmayo / Valle de Calamuchita / Córdoba · Argentina", { isLong: true }),
      textRow("Bloque ruta - título", "Cómo llegar"),
      textRow("Bloque ruta - contenido", "Desde Córdoba capital: por Ruta 5 hasta Santa Rosa de Calamuchita y luego 16 km más hasta Calmayo. Aproximadamente 1h 20 min en auto.", { isLong: true }),
      textRow("Bloque horarios - título", "Horarios"),
      textRow("Bloque horarios - contenido", "Viernes, sábados y domingos / desde las 17 h hasta el atardecer. / Eventos y feriados: horarios extendidos.", { isLong: true }),
      textRow("Botón", "Cómo llegar desde mi ubicación"),
    ],
  })
);

// ----- 9. FAQ -----
sections.push(h1("9. Preguntas Frecuentes (FAQ)"));
sections.push(note("Las preguntas frecuentes que se ven desplegables. Cada una es importante para SEO."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Subtítulo", "Preguntas frecuentes"),
      textRow("Título (H2)", "Lo que más nos consultan"),
      textRow("Descripción", "Antes de escribirnos, quizás tu duda ya está resuelta acá. Y si no, escribínos por WhatsApp que respondemos rápido.", { isLong: true }),
      // FAQ 1
      textRow("Pregunta 1", "¿Dónde queda MAMU Casa de Té?"),
      textRow("Respuesta 1", "Estamos ubicados en Aromahérba, un establecimiento serrano en Calmayo, Valle de Calamuchita, provincia de Córdoba, Argentina. A 87 km al sur de Córdoba capital y a 16 km de Santa Rosa de Calamuchita. Rodeados de campos de lavanda y sierras.", { isLong: true }),
      // FAQ 2
      textRow("Pregunta 2", "¿Cuáles son los horarios de atención?"),
      textRow("Respuesta 2", "Abrimos los días viernes, sábados y domingos desde las 17 h hasta el atardecer. En feriados y durante la Fiesta de la Cosecha de la Lavanda (enero) tenemos horarios extendidos. Te recomendamos consultar por WhatsApp antes de viajar para confirmar.", { isLong: true }),
      // FAQ 3
      textRow("Pregunta 3", "¿Necesito reserva previa?"),
      textRow("Respuesta 3", "Para los fines de semana y eventos especiales te recomendamos reservar con anticipación, especialmente si son más de 4 personas. Podés reservar por WhatsApp al 11 5749 6667 o completando el formulario de reservas en esta página. Para grupos menores de día de semana, escribinos y coordinamos.", { isLong: true }),
      // FAQ 4
      textRow("Pregunta 4", "¿Cuál es la especialidad de MAMU?"),
      textRow("Respuesta 4", "Nuestra especialidad son los waffles de lavanda, hechos con esencia de lavanda cosechada en Aromahérba. También ofrecemos té de lavanda de la casa, panes saborizados con hierbas del jardín, scones tibios y postres de estación que cambian con lo que da el campo.", { isLong: true }),
      // FAQ 5
      textRow("Pregunta 5", "¿Tienen opciones veganas o sin gluten?"),
      textRow("Respuesta 5", "Sí, contamos con opciones veganas y sin gluten (sin TACC). Te pedimos que nos avises al reservar para prepararte algo especial. También tenemos leche vegetal para infusiones y café sin cargo adicional.", { isLong: true }),
      // FAQ 6
      textRow("Pregunta 6", "¿Cómo llego a Calmayo desde Córdoba capital?"),
      textRow("Respuesta 6", "Desde Córdoba capital, tomá la Ruta 5 hacia el sur hasta Santa Rosa de Calamuchita y luego continuá 16 km más hasta Calmayo. El viaje en auto toma aproximadamente 1 hora 20 minutos. El camino está pavimentado y es accesible todo el año. En la sección 'Cómo llegar' de esta web tenés un mapa interactivo.", { isLong: true }),
      // Cierre
      textRow("Cierre FAQ - texto", "¿Te quedaron otras dudas?"),
      textRow("Cierre FAQ - link", "Escribinos por WhatsApp →"),
    ],
  })
);

// ----- 10. RESERVAS -----
sections.push(h1("10. Reservas (formulario)"));
sections.push(note("La sección donde los clientes completan el formulario de reserva que se envía por WhatsApp."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Subtítulo", "Reservá tu mesa"),
      textRow("Título (H2)", "Un lugar entre las flores te espera"),
      textRow("Descripción", "Para asegurarte una mesa los fines de semana o para eventos especiales, te recomendamos reservar con anticipación. Completá el formulario y te abrimos WhatsApp con el mensaje listo para enviar.", { isLong: true }),
      textRow("Bloque disponibilidad - título", "Disponibilidad"),
      textRow("Bloque disponibilidad - contenido", "Vie · Sáb · Dom desde las 17 h. Para eventos o grupos de más de 6 personas, consultá por horarios especiales.", { isLong: true }),
      textRow("Bloque teléfono - título", "También podés reservar por teléfono"),
      textRow("Bloque teléfono - número", "11 5749 6667"),
      // Form labels
      textRow("Label campo nombre", "Nombre y apellido *"),
      textRow("Placeholder nombre", "Tu nombre"),
      textRow("Label campo teléfono", "Teléfono"),
      textRow("Placeholder teléfono", "Ej: 11 5555 5555"),
      textRow("Label campo email", "Email"),
      textRow("Placeholder email", "tu@email.com"),
      textRow("Label campo fecha", "Fecha *"),
      textRow("Label campo personas", "Personas *"),
      textRow("Placeholder personas", "Cantidad"),
      textRow("Label campo hora", "Hora *"),
      textRow("Placeholder hora", "Elegí un horario"),
      textRow("Label campo comentarios", "Comentarios"),
      textRow("Placeholder comentarios", "Algún pedido especial: opciones veganas, sin gluten, mesa al aire libre, mesa para un evento...", { isLong: true }),
      textRow("Botón submit", "Enviar reserva por WhatsApp"),
      textRow("Nota inferior", "Al enviar, vas a pasar a WhatsApp con el mensaje pre-armado. La confirmación final de la reserva la hacen las chicas de MAMU.", { isLong: true }),
      // Toast messages
      textRow("Toast éxito - título", "Reserva lista para enviar"),
      textRow("Toast éxito - descripción", "Te estamos abriendo WhatsApp con el mensaje preparado. Tocá enviar para confirmar.", { isLong: true }),
      textRow("Toast error - título", "Faltan datos"),
      textRow("Toast error - descripción", "Completa nombre, fecha, hora y cantidad de personas.", { isLong: true }),
    ],
  })
);

// ----- 11. MENSAJES DE WHATSAPP -----
sections.push(h1("11. Mensajes pre-armados de WhatsApp"));
sections.push(note("Los mensajes que se generan automáticamente cuando alguien toca un botón de WhatsApp."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Botón flotante - tooltip", "Reservá por WhatsApp"),
      textRow("Botón flotante - mensaje", "Hola MAMU! Me gustaría hacer una reserva 🌿"),
      textRow("Formulario reservas - mensaje", "¡Hola MAMU! 🌿 Quisiera hacer una reserva: [siguen los datos del formulario] / ¿Tienen disponibilidad? ¡Gracias!", { isLong: true }),
      textRow("FAQ link - mensaje", "Hola MAMU! Tengo una consulta"),
    ],
  })
);

// ----- 12. FOOTER -----
sections.push(h1("12. Footer (pie de página)"));
sections.push(note("El pie con el branding, navegación, contacto y horarios."));
sections.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      left: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      right: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: P.border },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: P.border },
    },
    rows: [
      headerRow(),
      textRow("Marca - nombre", "MAMU"),
      textRow("Marca - tagline", "Casa de té · Meriendas de campo"),
      textRow("Marca - descripción", "Una merienda entre flores de lavanda en Calmayo, Valle de Calamuchita. Slow living, sabores artesanales y mucho amor serrano.", { isLong: true }),
      textRow("Columna navegación - título", "Navegación"),
      textRow("Columna contacto - título", "Contacto"),
      textRow("Contacto - dirección", "Aromahérba · Calmayo / Calamuchita · Córdoba · AR", { isLong: true }),
      textRow("Contacto - teléfono", "11 5749 6667"),
      textRow("Contacto - email", "hola@mamucasadete.com.ar"),
      textRow("Contacto - Instagram", "@mamu_casa_de_te"),
      textRow("Columna horarios - título", "Horarios"),
      textRow("Horarios - días", "Viernes · Sábado · Domingo"),
      textRow("Horarios - detalle", "desde las 17 h"),
      textRow("Horarios - nota", "Para feriados, eventos privados y la Fiesta de la Cosecha de la Lavanda, consultá horarios especiales por WhatsApp o Instagram.", { isLong: true }),
      textRow("Copyright", "© 2026 MAMU Casa de Té · Todos los derechos reservados."),
      textRow("Créditos", "Hecho con ❤ en Calmayo, Córdoba"),
    ],
  })
);

// ----- CIERRE -----
sections.push(spacer());
sections.push(
  new Paragraph({
    spacing: { before: 480, after: 120 },
    children: [
      new TextRun({
        text: "¡Listo!",
        bold: true,
        color: P.primary,
        size: 32,
        font: { ascii: "Calibri", hAnsi: "Calibri" },
      }),
    ],
  })
);
sections.push(
  paragraph(
    "Una vez que completes la columna \"Texto nuevo\" con los cambios que quieras, devolveme este documento y voy a aplicar todas las modificaciones al sitio web. Si tenés dudas sobre algún texto o querés agregar contenido nuevo (por ejemplo, un nuevo evento o un item del menú), agregalo al final de la sección correspondiente con una nota.",
    { color: P.earth }
  )
);

// =========================================================================
// DOCUMENTO FINAL
// =========================================================================

const doc = new Document({
  creator: "MAMU Casa de Té",
  title: "Inventario de textos - MAMU Casa de Té",
  description: "Listado completo de textos del sitio web para revisión de la dueña",
  styles: {
    default: {
      document: {
        run: { font: { ascii: "Calibri", hAnsi: "Calibri" }, size: 22, color: P.earth },
        paragraph: { spacing: { line: 312 } },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT },
          margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "MAMU Casa de Té — Inventario de textos",
                  italics: true,
                  color: P.gray,
                  size: 16,
                  font: { ascii: "Calibri", hAnsi: "Calibri" },
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  children: ["Página ", PageNumber.CURRENT, " de ", PageNumber.TOTAL_PAGES],
                  color: P.gray,
                  size: 16,
                  font: { ascii: "Calibri", hAnsi: "Calibri" },
                }),
              ],
            }),
          ],
        }),
      },
      children: sections,
    },
  ],
});

const OUTPUT_PATH = "/home/z/my-project/download/MAMU-Inventario-Textos.docx";

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUTPUT_PATH, buf);
  console.log(`✅ Documento generado: ${OUTPUT_PATH}`);
  console.log(`   Tamaño: ${(buf.length / 1024).toFixed(1)} KB`);
});
