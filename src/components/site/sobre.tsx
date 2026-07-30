'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LavenderDivider } from "./divider";
import { CountUp } from "./count-up";

const AROMA_IMG = "/images/predio-panoramica.jpg";
const TEA_POUR_IMG = "/images/taza-te.jpg";
const LOGO_SEAL = "/images/logo-mamu.png";

type SiteTexts = {
  aboutTitle?: string;
  aboutText1?: string;
  aboutText2?: string;
  stat1Value?: number;
  stat1Label?: string;
  stat2Value?: number;
  stat2Label?: string;
  stat3Value?: number;
  stat3Suffix?: string;
  stat3Label?: string;
};

export function SobreMamu() {
  const [texts, setTexts] = useState<SiteTexts>({});

  useEffect(() => {
    fetch("/api/site-texts")
      .then((res) => res.json())
      .then((data) => setTexts(data || {}))
      .catch(() => {});
  }, []);

  // Defaults (used while Sanity loads)
  const aboutTitle = texts.aboutTitle || "Un rincón de campo donde el tiempo se detiene";
  const aboutText1 = texts.aboutText1 || "MAMU nació como una invitación a merendar entre flores. En medio del cultivo de lavanda de Aromahérba —establecimiento serrano en Calmayo, Valle de Calamuchita— abrimos las puertas de nuestra casa de té para compartir lo que más amamos: el aroma de la lavanda recién cosechada, el pan tibio saliendo del horno y la conversación que se extiende hasta el atardecer.";
  const aboutText2 = texts.aboutText2 || "Cada merienda es una experiencia de slow living: infusiones preparadas con hierbas del lugar, waffles de lavanda recién hechos y postres de la casa que cambian con las estaciones. Todo pensado para que desconectes y te quedes un rato más.";
  const stat1 = { value: texts.stat1Value ?? 9, label: texts.stat1Label || "ediciones de la Fiesta de la Lavanda" };
  const stat2 = { value: texts.stat2Value ?? 100, label: texts.stat2Label || "lavanda cosechada en el campo" };
  const stat3 = { value: texts.stat3Value ?? 87, suffix: texts.stat3Suffix || " km", label: texts.stat3Label || "desde Córdoba capital" };

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
            className="relative order-2 lg:order-1 px-2 sm:px-0"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-float">
              <picture>
                <source type="image/avif" srcSet="/images/panoramica-rural.avif" />
                <source type="image/webp" srcSet="/images/panoramica-rural.webp" />
                <img
                  src="/images/panoramica-rural.jpg"
                  alt="Vista aérea del paisaje rural de Calmayo, Valle de Calamuchita, Córdoba — campos, caminos y montañas"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
            {/* Floating small image — merienda completa */}
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-8 w-36 h-44 sm:w-56 sm:h-64 rounded-2xl overflow-hidden shadow-lifted border-4 border-[#FBF6EE]">
              <picture>
                <source type="image/avif" srcSet="/images/merienda-campo.avif" />
                <source type="image/webp" srcSet="/images/merienda-campo.webp" />
                <img
                  src="/images/merienda-campo.jpg"
                  alt="Merienda de campo en MAMU Casa de Té — tetera de vidrio con té, pastel artesanal, reloj de arena y lavanda"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
            {/* Decorative badge with real logo */}
            <div className="absolute -top-4 -left-2 sm:-top-6 sm:-left-6 bg-[#FBF6EE] rounded-full h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center shadow-lifted rotate-[-8deg] border border-[#E0D4BD]">
              <img
                src={LOGO_SEAL}
                alt="Sello del logo de MAMU Casa de Té en Calmayo, Córdoba"
                className="h-20 w-20 sm:h-28 sm:w-28 object-contain"
              />
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
              {aboutTitle}
            </h2>

            <div className="mt-6 space-y-4 text-[#3D3530]/80 leading-relaxed">
              <p>
                <strong className="text-[#6D5D8A] font-semibold">MAMU</strong> {aboutText1.replace(/^MAMU\s+/, "")}
              </p>
              <p>
                {aboutText2}
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

            {/* Stats con contador animado */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[
                { end: stat1.value, prefix: "+", suffix: "", label: stat1.label },
                { end: stat2.value, prefix: "", suffix: "%", label: stat2.label },
                { end: stat3.value, prefix: "", suffix: stat3.suffix, label: stat3.label },
              ].map((stat) => (
                <div key={stat.label} className="px-2">
                  <CountUp
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2200}
                    className="font-serif text-2xl sm:text-3xl font-semibold text-[#6D5D8A] tabular-nums"
                  />
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
