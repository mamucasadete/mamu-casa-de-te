'use client'

import { motion } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";
import { LavenderDivider } from "./divider";

const AROMA_IMG =
  "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=1200&q=80";
const TEA_POUR_IMG =
  "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=1000&q=80";

export function SobreMamu() {
  return (
    <section id="sobre" className="relative bg-paper py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src={AROMA_IMG}
                alt="Campo de lavanda de Aromahérba en Calmayo, Córdoba"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating small image */}
            <div className="absolute -bottom-8 -right-4 sm:-right-8 w-40 h-48 sm:w-56 sm:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-[#FBF6EE]">
              <img
                src={TEA_POUR_IMG}
                alt="Té de lavanda servido en taza artesanal"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -top-4 -left-4 bg-[#6D5D8A] text-[#FBF6EE] rounded-full h-24 w-24 flex flex-col items-center justify-center text-center shadow-lg rotate-[-8deg]">
              <Leaf className="h-5 w-5 mb-1" />
              <span className="font-accent italic text-[10px] leading-tight px-2">Desde el<br/>campo</span>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="font-accent italic text-[#6D5D8A] text-xl">Nuestra historia</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#3D3530] leading-tight text-balance">
              Un rincón de campo donde el tiempo se detiene
            </h2>

            <div className="mt-6 space-y-4 text-[#3D3530]/80 leading-relaxed">
              <p>
                <strong className="text-[#6D5D8A] font-semibold">MAMU</strong> nació como una invitación a
                merendar entre flores. En medio del cultivo de lavanda de
                <strong className="text-[#5F7558] font-semibold"> Aromahérba</strong> —establecimiento
                serrano en Calmayo, Valle de Calamuchita— abrimos las puertas de nuestra casa de té
                para compartir lo que más amamos: el aroma de la lavanda recién cosechada, el pan
                tibio saliendo del horno y la conversación que se extiende hasta el atardecer.
              </p>
              <p>
                Cada merienda es una experiencia de <em className="font-accent">slow living</em>:
                infusiones preparadas con hierbas del lugar, waffles de lavanda recién hechos y
                postres de la casa que cambian con las estaciones. Todo pensado para que desconectes
                y te quedes un rato más.
              </p>
            </div>

            {/* Aromahérba callout */}
            <div className="mt-8 rounded-2xl border border-[#E0D4BD] bg-[#FFFBF4] p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-12 w-12 rounded-full bg-[#EFE6D6] flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[#6D5D8A]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#3D3530]">
                    Aromahérba · Nuestra casa
                  </h3>
                  <p className="mt-1.5 text-sm text-[#6B5F55] leading-relaxed">
                    Establecimiento serrano dedicado al cultivo de lavanda, producción de aceites
                    esenciales y perfumes. Sede de la Fiesta de la Cosecha de la Lavanda, un evento
                    imperdible del verano cordobés.
                  </p>
                  <a
                    href="https://www.aromaherba.com.ar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#6D5D8A] hover:text-[#5B4B78] transition-colors"
                  >
                    Conocer más sobre Aromahérba
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { value: "+9", label: "ediciones de la Fiesta de la Lavanda" },
                { value: "100%", label: "lavanda cosechada en el campo" },
                { value: "87 km", label: "desde Córdoba capital" },
              ].map((stat) => (
                <div key={stat.label} className="px-2">
                  <div className="font-serif text-2xl sm:text-3xl font-semibold text-[#6D5D8A]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-[#6B5F55] leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <LavenderDivider withFlower className="mt-20" />
    </section>
  );
}
