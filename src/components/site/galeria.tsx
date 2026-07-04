'use client'

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Camera, ImageIcon, Maximize2 } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { Lightbox } from "./lightbox";

type Photo = {
  src?: string; // optional — if undefined, show elegant placeholder
  alt: string;
  span?: "tall" | "wide" | "normal";
};

// Only real photos for now. Empty slots show elegant placeholders until user provides more.
const PHOTOS: Photo[] = [
  {
    src: "/images/ramo-lavandas.jpg",
    alt: "Ramo de lavandas recién cosechadas en el campo de Aromahérba, Calmayo, Córdoba",
    span: "tall",
  },
  {
    src: "/images/waffle-lavanda.jpg",
    alt: "Waffle de lavanda con frutas, chocolate y nueces — especialidad de MAMU Casa de Té en Calmayo",
  },
  {
    src: "/images/taza-te.jpg",
    alt: "Tetera de vidrio con té rojo, taza y panecillos artesanales servidos en MAMU Casa de Té",
  },
  {
    src: "/images/panes-postres.jpg",
    alt: "Tabla de panes artesanales, croissants y bollos con azúcar — repostería de MAMU Casa de Té",
    span: "wide",
  },
  {
    src: "/images/panoramica-rural.jpg",
    alt: "Vista aérea del paisaje rural de Calmayo, Valle de Calamuchita, Córdoba — campos, caminos y montañas",
  },
  {
    src: "/images/hero-campo-lavanda.jpg",
    alt: "Campo de lavanda en flor al atardecer en Calmayo, Valle de Calamuchita, Córdoba",
    span: "tall",
  },
  {
    src: "/images/merienda-campo.jpg",
    alt: "Merienda de campo servida en MAMU Casa de Té — tetera de vidrio con té, pastel artesanal, reloj de arena y frasco con lavanda",
  },
  {
    src: "/images/patio-nocturno.jpg",
    alt: "Patio exterior de MAMU Casa de Té al atardecer — mesas con mantel blanco, luces colgantes en el árbol y carpa",
    span: "wide",
  },
  {
    src: "/images/interior-1.jpg",
    alt: "Interior de MAMU Casa de Té — mesas con mantel blanco, pared de ladrillo, estantería con productos y mostrador",
    span: "wide",
  },
  {
    src: "/images/interior-2.jpg",
    alt: "Salón interior de MAMU Casa de Té — mesas, sillas de madera, sofá turquesa y cuadros en pared de ladrillo",
    span: "wide",
  },
];

export function Galeria() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Solo las fotos con src se pueden abrir en el lightbox.
  // Mapeamos el índice de la grilla al índice del lightbox.
  const lightboxPhotos = useMemo(
    () => PHOTOS.filter((p): p is Photo & { src: string } => Boolean(p.src)),
    []
  );

  // Para abrir el lightbox desde una foto de la grilla, buscamos su índice dentro de lightboxPhotos
  const openLightbox = (photo: Photo) => {
    if (!photo.src) return;
    const idx = lightboxPhotos.findIndex((p) => p.src === photo.src);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  return (
    <section id="galeria" className="relative py-20 lg:py-28 bg-[#FFFBF4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="font-accent italic text-[#6D5D8A] text-xl">Postales de MAMU</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#3D3530] text-balance">
            Un domingo en el campo
          </h2>
          <p className="mt-5 text-[#3D3530]/75 leading-relaxed">
            Lavanda en flor, tazas humeantes, mesas al aire libre y el rumor del viento serrano.
            Así se vive una merienda en Aromahérba. Tocá una foto para verla en grande.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 [grid-auto-flow:dense]">
          {PHOTOS.map((photo, idx) => (
            <ScrollReveal
              key={idx}
              as="figure"
              direction="up"
              delay={(idx % 4) * 0.08} // staggering por columna para efecto cascada
              duration={0.7}
              className={`group relative overflow-hidden rounded-2xl ${
                photo.span === "tall"
                  ? "row-span-2 aspect-[3/4] sm:aspect-auto"
                  : photo.span === "wide"
                  ? "col-span-2 aspect-[2/1] sm:aspect-[2/1]"
                  : "aspect-square"
              } ${photo.src ? "bg-[#EFE6D6] cursor-pointer" : "bg-gradient-to-br from-[#EFE6D6] to-[#E8DCC4] border border-dashed border-[#D5C7A8]"}`}
            >
              {photo.src ? (
                <button
                  type="button"
                  onClick={() => openLightbox(photo)}
                  aria-label={`Ampliar foto: ${photo.alt}`}
                  className="absolute inset-0 w-full h-full block text-left"
                >
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={photo.src.replace(/\.jpg$/, ".avif")}
                    />
                    <source
                      type="image/webp"
                      srcSet={photo.src.replace(/\.jpg$/, ".webp")}
                    />
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D3530]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs sm:text-sm font-accent italic opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {photo.alt}
                  </figcaption>
                  {/* Badge "ampliar" */}
                  <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="h-4 w-4 text-white" />
                  </div>
                  {/* Camera badge para indicar que es clickeable */}
                  <div className="absolute top-3 left-3 h-7 w-7 rounded-full bg-[#6D5D8A]/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="h-3.5 w-3.5 text-white" />
                  </div>
                </button>
              ) : (
                // Elegant placeholder for photos coming soon
                <div className="h-full w-full flex flex-col items-center justify-center gap-3 px-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-[#FBF6EE]/60 flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-[#A89A7E]" strokeWidth={1.5} />
                  </div>
                  <span className="font-accent italic text-xs text-[#A89A7E] leading-tight">
                    {photo.alt}
                  </span>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com/mamu_casa_de_te/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#6D5D8A] hover:text-[#5B4B78] font-medium text-sm transition-colors"
          >
            Ver más fotos en Instagram
            <span className="text-base" aria-hidden>@mamu_casa_de_te →</span>
          </a>
        </div>
      </div>

      {/* Lightbox modal — abre al clickear una foto */}
      <Lightbox
        photos={lightboxPhotos}
        index={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
