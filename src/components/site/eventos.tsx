'use client'

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Music, Flower2 } from "lucide-react";

const EVENTS = [
  {
    icon: Flower2,
    date: "Enero · Cada verano",
    title: "Fiesta de la Cosecha de la Lavanda",
    description:
      "El evento más esperado del año en Aromahérba. Una jornada de cosecha de lavanda al amanecer, feria de productores serranos, música en vivo y meriendas temáticas. Llegá temprano y llevate flores a casa.",
    cta: "Consulta fecha exacta",
    accent: "#8B7BA8",
    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?auto=format&fit=crop&w=1000&q=80",
    featured: true,
  },
  {
    icon: CalendarDays,
    date: "Abril · Anual",
    title: "Calmayo Gastronómico",
    description:
      "Una celebración del Valle de Calamuchita en la que MAMU participa junto a otros cocineros y productores locales. Menú especial de tres pasos con productos de la región.",
    cta: "Reservar mesa para el evento",
    accent: "#A87D5E",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
  },
  {
    icon: Music,
    date: "Fines de semana largos",
    title: "Música serrana al atardecer",
    description:
      "Cada vez que hay feriado prolongado, recibimos artistas locales que tocan folklore y música de autor mientras se sirve la merienda. Una pausa que se convierte en recuerdo.",
    cta: "Ver próximos fines de semana",
    accent: "#5F7558",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  },
];

export function Eventos() {
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

        <div className="mt-14 grid lg:grid-cols-3 gap-6 lg:gap-8">
          {EVENTS.map((event, idx) => {
            const Icon = event.icon;
            return (
              <motion.article
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl bg-[#FFFBF4] border border-[#E0D4BD] shadow-sm hover:shadow-xl transition-all duration-500 ${
                  event.featured ? "lg:row-span-2 lg:col-span-1" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${event.featured ? "aspect-[4/3] lg:aspect-[4/5]" : "aspect-[4/3]"}`}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3D3530]/85 via-[#3D3530]/30 to-transparent" />
                  <div
                    className="absolute top-4 left-4 h-11 w-11 rounded-full bg-[#FBF6EE] flex items-center justify-center shadow-md"
                    style={{ color: event.accent }}
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
                  <a
                    href="#reservas"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#6D5D8A] hover:text-[#5B4B78] transition-colors"
                  >
                    {event.cta}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

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
