'use client'

import { motion } from "framer-motion";
import useSWR from "swr";
import { MapPin, Flower2 } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { TiltCard } from "./tilt-card";

type EventItem = {
  _id: string;
  title: string;
  date: string;
  description: string;
  cta?: string;
  image?: any;
  featured: boolean;
  accentColor: string;
  order: number;
};

// Image fallbacks by event ID (in case the photo isn't uploaded to Sanity yet)
const IMAGE_FALLBACKS: Record<string, string> = {
  "event-cosecha-lavanda": "/images/paseo-lavanda.jpg",
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Eventos() {
  const { data: events, error, isLoading } = useSWR<EventItem[]>("/api/events", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  return (
    <section id="eventos" className="relative bg-paper py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="font-accent italic text-[#6D5D8A] text-xl">Agenda serrana</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#3D3530] text-balance">
            Eventos y fechas especiales
          </h2>
          <p className="mt-5 text-[#3D3530]/75 leading-relaxed">
            Algunas fechas en las que MAMU se viste de fiesta. Reservá con anticipación:
            para los eventos grandes solemos llenar todas las mesas.
          </p>
        </motion.div>

        {isLoading && (
          <div className="mt-14 max-w-2xl mx-auto text-center py-8">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#8B7BA8] border-t-transparent" />
            <p className="mt-3 text-sm text-[#6B5F55] font-accent italic">Cargando eventos...</p>
          </div>
        )}

        {error && (
          <div className="mt-14 max-w-2xl mx-auto text-center py-8">
            <p className="text-sm text-[#B85450]">
              No se pudieron cargar los eventos. Por favor, recargá la página.
            </p>
          </div>
        )}

        {events && events.length > 0 && (
          <div className="mt-14 max-w-2xl mx-auto">
            {events.map((event, idx) => {
              const Icon = Flower2;
              // Use Sanity image if available, otherwise fallback to local
              const imageSrc = event.image
                ? event.image
                : IMAGE_FALLBACKS[event._id] || "/images/paseo-lavanda.jpg";
              return (
                <ScrollReveal
                  key={event._id}
                  direction="up"
                  delay={idx * 0.12}
                  duration={0.7}
                  className="[perspective:1000px]"
                >
                  <TiltCard
                    max={6}
                    scale={1.02}
                    className={`group relative overflow-hidden rounded-3xl bg-[#FFFBF4] border border-[#E0D4BD] shadow-card hover:shadow-float transition-shadow duration-500`}
                  >
                    <div className="relative overflow-hidden aspect-[4/3] lg:aspect-[4/5]">
                      {typeof imageSrc === "string" ? (
                        <picture>
                          <source type="image/avif" srcSet={imageSrc.replace(/\.jpg$/, ".avif")} />
                          <source type="image/webp" srcSet={imageSrc.replace(/\.jpg$/, ".webp")} />
                          <img
                            src={imageSrc}
                            alt={`${event.title} — MAMU Casa de Té en Calmayo, Córdoba`}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                        </picture>
                      ) : (
                        <img
                          src={imageSrc}
                          alt={`${event.title} — MAMU Casa de Té en Calmayo, Córdoba`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3D3530]/85 via-[#3D3530]/30 to-transparent" />
                      <div
                        className="absolute top-4 left-4 h-11 w-11 rounded-full bg-[#FBF6EE] flex items-center justify-center shadow-md"
                        style={{ color: event.accentColor || "#8B7BA8" }}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      {event.featured && (
                        <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#6D5D8A] text-[#FBF6EE] text-xs font-medium shadow-md">
                          Evento destacado
                        </span>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FBF6EE]">
                        <span className="font-accent italic text-sm opacity-90">{event.date}</span>
                        <h3 className="mt-1 font-serif text-xl lg:text-2xl font-medium leading-tight">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-[#6B5F55] leading-relaxed">
                        {event.description}
                      </p>
                      {event.cta && (
                        <a
                          href="#reservas"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#6D5D8A] hover:text-[#5B4B78] transition-colors"
                        >
                          {event.cta}
                          <span aria-hidden>→</span>
                        </a>
                      )}
                    </div>
                  </TiltCard>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-[#6D5D8A] to-[#5F7558] p-6 sm:p-8 text-center text-[#FBF6EE] shadow-lg"
        >
          <p className="font-accent italic text-lg sm:text-xl">
            ¿Querés enterarte antes que nadie de los próximos eventos?
          </p>
          <p className="mt-2 text-sm opacity-90">
            Seguinos en Instagram <strong>@mamu_casa_de_te</strong> — ahí anunciamos fechas y abrimos reservas.
          </p>
          <a
            href="https://www.instagram.com/mamu_casa_de_te/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm text-sm font-medium transition-colors border border-white/30"
          >
            <MapPin className="h-4 w-4" />
            Abrir Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
