'use client'

import { motion } from "framer-motion";
import { Cookie, Coffee, Flower2, Croissant } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { TiltCard } from "./tilt-card";

type Specialty = {
  icon: typeof Cookie;
  title: string;
  description: string;
  image?: string; // optional — if not provided, show elegant placeholder
  alt: string;
  accent: string;
};

const SPECIALTIES: Specialty[] = [
  {
    icon: Cookie,
    title: "Waffles de lavanda",
    description:
      "Nuestra estrella. Masa tibia con esencia de lavanda del campo, miel silvestre y frutas de estación. Servidos con crema chantilly infusionada.",
    image: "/images/waffle-lavanda.jpg",
    alt: "Waffle de lavanda con frutas, chocolate, nueces y flor comestible — especialidad de MAMU Casa de Té en Calmayo",
    accent: "#8B7BA8",
  },
  {
    icon: Coffee,
    title: "Infusiones de la casa",
    description:
      "Té negro con lavanda, manzanilla serrana, hierbas frescas del jardín. Teteras de vidrio que rinden tres tazas, servidas con miel pura.",
    image: "/images/taza-te.jpg",
    alt: "Tetera de vidrio con té rojo servido en taza, con panecillos artesanales — infusión de la casa en MAMU Calmayo",
    accent: "#5F7558",
  },
  {
    icon: Flower2,
    title: "Lavanda del campo",
    description:
      "Nuestra materia prima. Cosechada a mano en Aromahérba, la usamos en postres, infusiones y productos para llevar. Conocé el cultivo de cerca.",
    image: "/images/ramo-lavandas.jpg",
    alt: "Ramo de lavanda recién cosechada en el campo de Aromahérba, Calmayo — materia prima de MAMU Casa de Té",
    accent: "#A87D5E",
  },
  {
    icon: Croissant,
    title: "Panes & postres de estación",
    description:
      "Pan de campo con hierbas, focaccia de lavanda, scones tibios, tortas de lavanda y limón. Hechos a mano cada mañana, cambian con la temporada.",
    image: "/images/panes-postres.jpg",
    alt: "Tabla de panes artesanales, croissants, galletas y bollos con azúcar — repostería casera de MAMU Casa de Té",
    accent: "#C9A87C",
  },
];

export function Especialidades() {
  return (
    <section id="especialidades" className="relative py-20 lg:py-28 bg-[#FFFBF4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="font-accent italic text-[#6D5D8A] text-xl">Lo que hacemos</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#3D3530] text-balance">
            Especialidades con lavanda
          </h2>
          <p className="mt-5 text-[#3D3530]/75 leading-relaxed">
            Cada producto nace del cultivo de Aromahérba. La lavanda la cosechamos nosotras,
            las hierbas son del jardín y los postres se hornean el mismo día. Cuatro propuestas
            que definieron la identidad de MAMU.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALTIES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                delay={idx * 0.1}
                duration={0.7}
                className="[perspective:1000px]"
              >
                <TiltCard
                  max={8}
                  scale={1.03}
                  className="group relative overflow-hidden rounded-2xl bg-[#FFFBF4] border border-[#E0D4BD] shadow-card hover:shadow-float transition-shadow duration-500 h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {item.image ? (
                      <picture>
                        {/* AVIF first (best compression) */}
                        <source
                          type="image/avif"
                          srcSet={item.image.replace(/\.jpg$/, ".avif")}
                        />
                        {/* WebP lossless */}
                        <source
                          type="image/webp"
                          srcSet={item.image.replace(/\.jpg$/, ".webp")}
                        />
                        {/* Fallback JPG */}
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </picture>
                    ) : (
                      // Elegant placeholder for cards without photo yet
                      <div
                        className="h-full w-full flex flex-col items-center justify-center gap-3"
                        style={{
                          background: `linear-gradient(135deg, ${item.accent}15 0%, ${item.accent}25 100%)`,
                        }}
                      >
                        <div
                          className="h-16 w-16 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${item.accent}20`, color: item.accent }}
                        >
                          <Icon className="h-8 w-8" strokeWidth={1.5} />
                        </div>
                        <span className="font-accent italic text-xs text-[#6B5F55]/60">
                          Próximamente foto
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3D3530]/40 to-transparent" />
                    <div
                      className="absolute top-4 left-4 h-11 w-11 rounded-full bg-[#FBF6EE] flex items-center justify-center shadow-md"
                      style={{ color: item.accent }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-medium text-[#3D3530]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#6B5F55] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="font-accent italic text-[#6B5F55]">
            “Cada taza cuenta una historia de campo, sol y manos serranas.”
          </p>
        </div>
      </div>
    </section>
  );
}
