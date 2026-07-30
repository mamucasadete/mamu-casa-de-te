/**
 * Migración inicial: carga todos los datos actuales del sitio a Sanity.
 *
 * Ejecutar con: bun run scripts/migrate-to-sanity.ts
 *
 * Esto crea los documentos en Sanity para que la dueña pueda editarlos
 * desde el panel admin (https://mamu-studio-psi.vercel.app).
 */

const SANITY_PROJECT_ID = "ne69571t";
const SANITY_DATASET = "production";
const SANITY_TOKEN = process.env.SANITY_API_TOKEN || "skNDZ5l4zjsXAImsG71ui8v7cTGSwZ99GBnvFxu0nN1SCHvJLNDKKp4ChhVy1uO3I6vE2GtGWA9NBaZ6c5oHBvzrJaajM4EIJ7A3Ymwn5C2pXotwWz9ImpnXrOZahAHpFThBfR0DtjSnki1yxI3ayKcDYVKsQWTT9fd9Jnf5WrW2t10P5kgd";

const API_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${SANITY_DATASET}`;

// Helper para crear documentos via mutation API
async function createDocuments(docs: any[]) {
  const mutations = docs.map((doc) => ({
    createOrReplace: {
      _id: doc._id,
      _type: doc._type,
      ...doc,
    },
  }));

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Sanity API error ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  return result;
}

// ============================================================
// DATOS A MIGRAR
// ============================================================

// 1. MENÚ — todas las categorías e items actuales
const menuItems = [
  // Meriendas de campo
  {
    _id: "menu-merienda-mamu",
    _type: "menuItem",
    name: "Merienda Mamu",
    description: "Blend aromaherba, acompañado con cuatro facturas de lavanda.",
    price: 15000,
    category: "meriendas",
    tag: "Para 2 personas",
    available: true,
    order: 1,
  },
  {
    _id: "menu-merienda-serrana",
    _type: "menuItem",
    name: "Merienda Serrana",
    description: "Café o té a elección, pan de campo con queso crema y mermelada.",
    price: 8000,
    category: "meriendas",
    available: true,
    order: 2,
  },
  {
    _id: "menu-merienda-chicos",
    _type: "menuItem",
    name: "Merienda para los más chicos",
    description: "Chocolate con leche, waffles con dulce de leche, crema y frutas.",
    price: 10000,
    category: "meriendas",
    tag: "Kids",
    available: true,
    order: 3,
  },
  {
    _id: "menu-picada-dulce",
    _type: "menuItem",
    name: "Picada dulce de lavanda",
    description: "Tabla con facturas de lavanda, budín, torta y dos infusiones a elección.",
    price: 20000,
    category: "meriendas",
    tag: "Para compartir",
    available: true,
    order: 4,
  },
  // Waffles & postres
  {
    _id: "menu-waffle-clasico",
    _type: "menuItem",
    name: "Waffle de lavanda clásico",
    description: "Masa de lavanda, dulce de leche, crema y frutas.",
    price: 6500,
    category: "waffles",
    tag: "La estrella",
    available: true,
    order: 1,
  },
  {
    _id: "menu-waffle-campo",
    _type: "menuItem",
    name: "Waffle del campo",
    description: "Masa de lavanda, jamón, queso y queso crema.",
    price: 7000,
    category: "waffles",
    available: true,
    order: 2,
  },
  // Tortas
  {
    _id: "menu-torta-lavanda-naranja",
    _type: "menuItem",
    name: "Torta de lavanda y naranja",
    description: "Bizcocho húmedo con glaseado de naranja y flores de lavanda fresca.",
    price: 6000,
    category: "tortas",
    available: true,
    order: 1,
  },
  // Postres helados
  {
    _id: "menu-postres-barroca",
    _type: "menuItem",
    name: "Postres de la BARROCA",
    description: "Cheesecake de oreo, cheesecake de frutos rojos, chocotorta, selva negra y tiramisú.",
    price: 5000,
    category: "postres-helados",
    available: true,
    order: 1,
  },
  // Infusiones
  {
    _id: "menu-te-lavanda",
    _type: "menuItem",
    name: "Té de lavanda Mamu",
    description: "Blend aromaherba, té negro, lavanda, pétalos de rosas y cáscara de naranja.",
    price: 5000,
    category: "infusiones",
    tag: "De la casa",
    available: true,
    order: 1,
  },
  {
    _id: "menu-cafe-serrano",
    _type: "menuItem",
    name: "Café serrano",
    description: "Café o café con leche.",
    price: 4500,
    category: "infusiones",
    available: true,
    order: 2,
  },
  {
    _id: "menu-chocolate-leche",
    _type: "menuItem",
    name: "Chocolate con leche",
    description: "Leche chocolatada fría o caliente.",
    price: 6000,
    category: "infusiones",
    available: true,
    order: 3,
  },
];

// 2. FAQ — 6 preguntas
const faqs = [
  {
    _id: "faq-1",
    _type: "faq",
    question: "¿Dónde queda MAMU Casa de Té?",
    answer:
      "Estamos ubicados en Aromahérba, un establecimiento serrano en Calmayo, Valle de Calamuchita, provincia de Córdoba, Argentina. A 87 km al sur de Córdoba capital y a 16 km de Santa Rosa de Calamuchita. Rodeados de campos de lavanda y sierras.",
    order: 1,
  },
  {
    _id: "faq-2",
    _type: "faq",
    question: "¿Cuáles son los horarios de atención?",
    answer:
      "Durante el año abrimos los fines de semana largos de 9 a 18 horas. En enero y febrero abrimos los días jueves, viernes, sábados y domingos de 9 a 20 horas. Te recomendamos consultar por WhatsApp antes de viajar para confirmar.",
    order: 2,
  },
  {
    _id: "faq-3",
    _type: "faq",
    question: "¿Necesito reserva previa?",
    answer:
      "Para los fines de semana y eventos especiales te recomendamos reservar con anticipación, especialmente si son más de 4 personas. Podés reservar por WhatsApp al 11 5749 6667 o completando el formulario de reservas en esta página. Para grupos menores de día de semana, escribinos y coordinamos.",
    order: 3,
  },
  {
    _id: "faq-4",
    _type: "faq",
    question: "¿Cuál es la especialidad de MAMU?",
    answer:
      "Nuestra especialidad son los waffles de lavanda, hechos con esencia de lavanda cosechada en Aromahérba. También ofrecemos té de lavanda de la casa, panes saborizados con hierbas del jardín, scones tibios y postres de estación que cambian con lo que da el campo.",
    order: 4,
  },
  {
    _id: "faq-5",
    _type: "faq",
    question: "¿Tienen opciones veganas o sin gluten?",
    answer:
      "Sí, contamos con opciones veganas y sin gluten (sin TACC). Te pedimos que nos avises al reservar para prepararte algo especial. También tenemos leche vegetal para infusiones y café sin cargo adicional.",
    order: 5,
  },
  {
    _id: "faq-6",
    _type: "faq",
    question: "¿Cómo llego a Calmayo desde Córdoba capital?",
    answer:
      "Desde Córdoba capital, tomá la Ruta 5 hacia el sur hasta Santa Rosa de Calamuchita y luego continuá 16 km más hasta Calmayo. El viaje en auto toma aproximadamente 1 hora 20 minutos. El camino está pavimentado y es accesible todo el año. En la sección 'Cómo llegar' de esta web tenés un mapa interactivo.",
    order: 6,
  },
];

// 3. HORARIOS (singleton)
const hours = {
  _id: "horarios-actuales",
  _type: "hours",
  schedule: "Fines de semana largos de 10 a 18 horas",
  summerSchedule: "Jueves a domingo de 9 a 20 horas (enero y febrero)",
  specialNote: "Eventos y feriados: horarios extendidos.",
};

// 4. EVENTO — Fiesta de la Cosecha
const events = [
  {
    _id: "event-cosecha-lavanda",
    _type: "event",
    title: "Fiesta de la Cosecha de la Lavanda",
    date: "Enero · Cada verano",
    description:
      "El evento más esperado del año en Aromahérba. Una jornada de cosecha de lavanda al amanecer, feria de productores serranos, música en vivo y meriendas temáticas. Llegá temprano y llevate flores a casa.",
    cta: "Consulta fecha exacta",
    featured: true,
    accentColor: "#8B7BA8",
    order: 1,
  },
];

// 5. TEXTOS DEL SITIO (singleton)
const siteTexts = {
  _id: "textos-generales",
  _type: "siteTexts",
  // Hero
  heroBadge: "Casa de té · Calmayo · Córdoba",
  heroTitle: "Merendá en un campo de lavanda",
  heroSubtitle:
    "Casa de té emplazada en Aromahérba, en el corazón del Valle de Calamuchita. Waffles de lavanda, infusiones y panes artesanales, servidos entre flores serranas.",
  heroPrimaryButton: "Reservá tu merienda",
  heroSecondaryButton: "Ver la carta",
  // Sobre MAMU
  aboutTitle: "Un rincón de campo donde el tiempo se detiene",
  aboutText1:
    "MAMU nació como una invitación a merendar entre flores. En medio del cultivo de lavanda de Aromahérba —establecimiento serrano en Calmayo, Valle de Calamuchita— abrimos las puertas de nuestra casa de té para compartir lo que más amamos: el aroma de la lavanda recién cosechada, el pan tibio saliendo del horno y la conversación que se extiende hasta el atardecer.",
  aboutText2:
    "Cada merienda es una experiencia de slow living: infusiones preparadas con hierbas del lugar, waffles de lavanda recién hechos y postres de la casa que cambian con las estaciones. Todo pensado para que desconectes y te quedes un rato más.",
  // Stats
  stat1Value: 9,
  stat1Label: "ediciones de la Fiesta de la Lavanda",
  stat2Value: 100,
  stat2Label: "lavanda cosechada en el campo",
  stat3Value: 87,
  stat3Suffix: " km",
  stat3Label: "desde Córdoba capital",
  // Reservas
  reservasTitle: "Un lugar entre las flores te espera",
  reservasDescription:
    "Para asegurarte una mesa los fines de semana o para eventos especiales, te recomendamos reservar con anticipación. Completá el formulario y te abrimos WhatsApp con el mensaje listo para enviar.",
  // WhatsApp
  whatsappNumber: "5491157496667",
};

// ============================================================
// EJECUTAR MIGRACIÓN
// ============================================================
async function migrate() {
  console.log("🚀 Iniciando migración a Sanity...\n");

  const allDocs = [
    ...menuItems,
    ...faqs,
    hours,
    ...events,
    siteTexts,
  ];

  console.log(`📋 Total de documentos a crear: ${allDocs.length}`);
  console.log(`   - ${menuItems.length} items del menú`);
  console.log(`   - ${faqs.length} preguntas FAQ`);
  console.log(`   - 1 documento de horarios`);
  console.log(`   - ${events.length} evento(s)`);
  console.log(`   - 1 documento de textos del sitio\n`);

  try {
    // Migrar en lotes de 10 para no saturar la API
    const batchSize = 10;
    for (let i = 0; i < allDocs.length; i += batchSize) {
      const batch = allDocs.slice(i, i + batchSize);
      console.log(`⏳ Subiendo lote ${Math.floor(i / batchSize) + 1}...`);
      await createDocuments(batch);
      console.log(`✅ Lote ${Math.floor(i / batchSize) + 1} subido (${batch.length} docs)`);
    }

    console.log("\n🎉 ¡Migración completada con éxito!");
    console.log("\n📌 La dueña puede ver y editar todo desde:");
    console.log("   https://mamu-studio-psi.vercel.app");
  } catch (error) {
    console.error("\n❌ Error en la migración:", error);
    process.exit(1);
  }
}

migrate();
