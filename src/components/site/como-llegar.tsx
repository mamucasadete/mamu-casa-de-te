'use client'

import { motion } from "framer-motion";
import { MapPin, Car, Navigation, Clock } from "lucide-react";

const MAPS_QUERY = encodeURIComponent("Aromahérba, Calmayo, Córdoba, Argentina");

export function ComoLlegar() {
  return (
    <section id="como-llegar" className="relative py-20 lg:py-28 bg-[#FFFBF4]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="font-accent italic text-[#6D5D8A] text-xl">Cómo llegar</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#3D3530] text-balance">
            Te esperamos en Calmayo
          </h2>
          <p className="mt-5 text-[#3D3530]/75 leading-relaxed">
            En el corazón del Valle de Calamuchita, a 87 km al sur de Córdoba capital.
            Rodeado de sierras, arroyos y campos de lavanda — el viaje ya es parte de la merienda.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-3xl overflow-hidden shadow-lifted border border-[#E0D4BD] min-h-[400px] relative bg-[#EFE6D6]"
          >
            <iframe
              title="Mapa de ubicación de MAMU Casa de Té en Calmayo, Córdoba"
              src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="rounded-2xl bg-[#FFFBF4] border border-[#E0D4BD] p-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#6D5D8A] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#3D3530]">Dirección</h3>
                  <p className="mt-1 text-sm text-[#6B5F55] leading-relaxed">
                    Aromahérba · Calmayo<br/>
                    Valle de Calamuchita<br/>
                    Córdoba · Argentina
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#FFFBF4] border border-[#E0D4BD] p-6">
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-[#5F7558] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#3D3530]">Cómo llegar</h3>
                  <p className="mt-1 text-sm text-[#6B5F55] leading-relaxed">
                    Desde Córdoba capital: por Ruta 5 hasta Santa Rosa de Calamuchita y luego 16 km más hasta Calmayo.
                    Aproximadamente 1h 20 min en auto.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#FFFBF4] border border-[#E0D4BD] p-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#A87D5E] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#3D3530]">Horarios</h3>
                  <p className="mt-1 text-sm text-[#6B5F55] leading-relaxed">
                    <strong className="text-[#3D3530]">Viernes, sábados y domingos</strong><br/>
                    desde las 17 h hasta el atardecer.<br/>
                    <em className="text-xs">Eventos y feriados: horarios extendidos.</em>
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#5F7558] hover:bg-[#4F6349] text-[#FBF6EE] font-medium text-sm transition-colors shadow-sm"
            >
              <Navigation className="h-4 w-4" />
              Cómo llegar desde mi ubicación
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
