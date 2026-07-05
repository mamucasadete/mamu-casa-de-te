'use client'

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarHeart, MapPin, Clock, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_ALT = "Campo de lavanda en flor al atardecer en Calmayo, Valle de Calamuchita, Córdoba — bicicleta blanca entre las flores";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // useScroll nos da el progreso del scroll dentro de la sección del hero (0 al inicio, 1 al final)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax: la imagen de fondo se mueve hacia abajo más lento que el contenido
  // (efecto profundidad). Máximo 15% del alto del hero.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  // Parallax inverso sutil para el contenido (se va más rápido que el scroll, da sensación 3D)
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  // El contenido también se va haciendo más opaco/transparente al hacer scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // La decoración SVG se mueve más lento (lejos)
  const decoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  // El gradiente oscuro se intensifica al hacer scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  // El indicador de scroll se va desvaneciendo
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ position: "relative" }}
    >
      {/* Background con parallax — la imagen se mueve más lento que el scroll */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: 1.18 }}>
        <picture>
          {/* Mobile: smaller image for fast loading on phones */}
          <source
            media="(max-width: 768px)"
            type="image/webp"
            srcSet="/images/hero-campo-lavanda-mobile.webp"
          />
          {/* Retina displays: 2x resolution */}
          <source
            media="(min-width: 769px) and (-webkit-min-device-pixel-ratio: 2)"
            type="image/webp"
            srcSet="/images/hero-campo-lavanda-2x.webp"
          />
          {/* Standard desktop: AVIF first (best compression) */}
          <source
            type="image/avif"
            srcSet="/images/hero-campo-lavanda.avif"
          />
          {/* Then WebP lossless (max quality) */}
          <source
            type="image/webp"
            srcSet="/images/hero-campo-lavanda.webp"
          />
          {/* Fallback: JPG q95 4:4:4 for older browsers */}
          <img
            src="/images/hero-campo-lavanda.jpg"
            alt={HERO_ALT}
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
        </picture>
      </motion.div>

      {/* Overlays con gradiente — se mantienen fijos para no romper legibilidad */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#3D3530]/55 via-[#3D3530]/35 to-[#3D3530]/75"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#6D5D8A]/30 via-transparent to-transparent" />

      {/* Decoración SVG esquina superior derecha — parallax sutil (lejos) */}
      <motion.div
        className="absolute top-24 right-6 hidden lg:block opacity-50 z-[5]"
        style={{ y: decoY }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="animate-sway">
          <g stroke="#FBF6EE" strokeWidth="1.2" strokeLinecap="round" fill="none">
            <path d="M60 110 Q 60 60 60 20" />
            <path d="M60 30 Q 40 25 35 40 Q 50 45 60 35" fill="#B5A8C9" fillOpacity="0.4" />
            <path d="M60 30 Q 80 25 85 40 Q 70 45 60 35" fill="#B5A8C9" fillOpacity="0.4" />
            <path d="M60 50 Q 40 45 35 60 Q 50 65 60 55" fill="#B5A8C9" fillOpacity="0.5" />
            <path d="M60 50 Q 80 45 85 60 Q 70 65 60 55" fill="#B5A8C9" fillOpacity="0.5" />
            <path d="M60 70 Q 40 65 35 80 Q 50 85 60 75" fill="#B5A8C9" fillOpacity="0.6" />
            <path d="M60 70 Q 80 65 85 80 Q 70 85 60 75" fill="#B5A8C9" fillOpacity="0.6" />
          </g>
        </svg>
      </motion.div>

      {/* Contenido del hero — parallax inverso (se va más rápido) + fade out */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center text-[#FBF6EE]"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-xs sm:text-sm font-accent italic tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B5A8C9] animate-pulse" />
            Meriendas de campo · Calmayo · Córdoba
          </span>

          <h1 className="mt-6 font-serif font-medium text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance text-shadow-soft">
            Merendá en un
            <span className="block italic font-accent mt-2 bg-gradient-to-r from-[#E8DCC4] via-[#B5A8C9] to-[#9DB5A0] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(109,93,138,0.3)]">
              campo de lavanda
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-[#FBF6EE]/90 font-light leading-relaxed">
            Casa de té emplazada en <strong className="font-medium">Aromahérba</strong>, en el corazón del Valle de Calamuchita.
            Waffles de lavanda, infusiones y panes artesanales, servidos entre flores serranas.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="#reservas" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="btn-shine w-full sm:w-auto bg-[#6D5D8A] hover:bg-[#5B4B78] text-[#FBF6EE] rounded-full gap-2 px-8 h-12 text-base shadow-lg"
              >
                <CalendarHeart className="h-5 w-5" />
                Reservá tu merienda
              </Button>
            </a>
            <a href="#menu" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-[#FBF6EE] border-white/40 rounded-full px-8 h-12 text-base"
              >
                Ver la carta
              </Button>
            </a>
          </div>

          {/* Quick info chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-[#FBF6EE]/85"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Clock className="h-4 w-4 text-[#B5A8C9]" />
              Vie · Sáb · Dom — desde las 17 h
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <MapPin className="h-4 w-4 text-[#B5A8C9]" />
              Aromahérba · Calmayo · Calamuchita
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — se desvanece al hacer scroll */}
      <motion.a
        href="#sobre"
        aria-label="Desplazarse a la siguiente sección"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#FBF6EE]/70 hover:text-[#FBF6EE] transition-colors animate-float"
        style={{ opacity: scrollCueOpacity }}
      >
        <ArrowDown className="h-6 w-6" />
      </motion.a>
    </section>
  );
}
