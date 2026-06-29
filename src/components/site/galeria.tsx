'use client'

import { motion } from "framer-motion";
import { Camera } from "lucide-react";

type Photo = {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "normal";
};

const PHOTOS: Photo[] = [
  {
    src: "/images/ramo-lavandas.jpg",
    alt: "Ramo de lavandas recién cosechadas en el campo de Aromahérba",
    span: "tall",
  },
  {
    src: "/images/waffle-lavanda.jpg",
    alt: "Waffle de lavanda con frutas, chocolate y nueces — la estrella de MAMU",
  },
  {
    src: "/images/taza-te.jpg",
    alt: "Tetera de vidrio con té rojo, taza y panecillos artesanales",
  },
  {
    src: "/images/predio-panoramica.jpg",
    alt: "Vista panorámica del predio de Aromahérba en Calmayo, Córdoba",
    span: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    alt: "Panes artesanales recién horneados",
  },
  {
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    alt: "Postre de la casa con flores de lavanda",
  },
  {
    src: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=800&q=80",
    alt: "Campo de lavanda con sierras al fondo",
    span: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1572286258217-215cf8e16567?auto=format&fit=crop&w=800&q=80",
    alt: "Taza de té con flores de lavanda frescas",
  },
  {
    src: "https://images.unsplash.com/photo-1567538096631-e0cbf1212c34?auto=format&fit=crop&w=800&q=80",
    alt: "Mesa exterior con vista al campo",
  },
];

export function Galeria() {
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
            Así se vive una merienda en Aromahérba.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 [grid-auto-flow:dense]">
          {PHOTOS.map((photo, idx) => (
            <motion.figure
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl bg-[#EFE6D6] ${
                photo.span === "tall"
                  ? "row-span-2 aspect-[3/4] sm:aspect-auto"
                  : photo.span === "wide"
                  ? "col-span-2 aspect-[2/1] sm:aspect-[2/1]"
                  : "aspect-square"
              }`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D3530]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs sm:text-sm font-accent italic opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {photo.alt}
              </figcaption>
              <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-3.5 w-3.5 text-white" />
              </div>
            </motion.figure>
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
    </section>
  );
}
