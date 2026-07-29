'use client'

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Clock, CalendarHeart, Flower2, Leaf, Route } from "lucide-react";

const FAQS = [
  {
    icon: MapPin,
    question: "¿Dónde queda MAMU Casa de Té?",
    answer:
      "Estamos ubicados en Aromahérba, un establecimiento serrano en Calmayo, Valle de Calamuchita, provincia de Córdoba, Argentina. A 87 km al sur de Córdoba capital y a 16 km de Santa Rosa de Calamuchita. Rodeados de campos de lavanda y sierras.",
  },
  {
    icon: Clock,
    question: "¿Cuáles son los horarios de atención?",
    answer:
      "Durante el año abrimos los fines de semana largos de 9 a 18 horas. En enero y febrero abrimos los días jueves, viernes, sábados y domingos de 9 a 20 horas. Te recomendamos consultar por WhatsApp antes de viajar para confirmar.",
  },
  {
    icon: CalendarHeart,
    question: "¿Necesito reserva previa?",
    answer:
      "Para los fines de semana y eventos especiales te recomendamos reservar con anticipación, especialmente si son más de 4 personas. Podés reservar por WhatsApp al 11 5749 6667 o completando el formulario de reservas en esta página. Para grupos menores de día de semana, escribinos y coordinamos.",
  },
  {
    icon: Flower2,
    question: "¿Cuál es la especialidad de MAMU?",
    answer:
      "Nuestra especialidad son los waffles de lavanda, hechos con esencia de lavanda cosechada en Aromahérba. También ofrecemos té de lavanda de la casa, panes saborizados con hierbas del jardín, scones tibios y postres de estación que cambian con lo que da el campo.",
  },
  {
    icon: Leaf,
    question: "¿Tienen opciones veganas o sin gluten?",
    answer:
      "Sí, contamos con opciones veganas y sin gluten (sin TACC). Te pedimos que nos avises al reservar para prepararte algo especial. También tenemos leche vegetal para infusiones y café sin cargo adicional.",
  },
  {
    icon: Route,
    question: "¿Cómo llego a Calmayo desde Córdoba capital?",
    answer:
      "Desde Córdoba capital, tomá la Ruta 5 hacia el sur hasta Santa Rosa de Calamuchita y luego continuá 16 km más hasta Calmayo. El viaje en auto toma aproximadamente 1 hora 20 minutos. El camino está pavimentado y es accesible todo el año. En la sección 'Cómo llegar' de esta web tenés un mapa interactivo.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative bg-paper py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="font-accent italic text-[#6D5D8A] text-xl">Preguntas frecuentes</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#3D3530] text-balance">
            Lo que más nos consultan
          </h2>
          <p className="mt-5 text-[#3D3530]/75 leading-relaxed">
            Antes de escribirnos, quizás tu duda ya está resuelta acá. Y si no, escribínos por
            WhatsApp que respondemos rápido.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, idx) => {
              const Icon = faq.icon;
              return (
                <AccordionItem
                  key={faq.question}
                  value={`item-${idx}`}
                  className="bg-[#FFFBF4] border border-[#E0D4BD] rounded-2xl px-5 sm:px-6 shadow-sm data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline py-5 group">
                    <div className="flex items-start gap-3 text-left">
                      <div className="flex-shrink-0 mt-0.5 h-8 w-8 rounded-full bg-[#EFE6D6] flex items-center justify-center group-data-[state=open]:bg-[#6D5D8A] transition-colors">
                        <Icon className="h-4 w-4 text-[#6D5D8A] group-data-[state=open]:text-[#FBF6EE] transition-colors" />
                      </div>
                      <span className="font-serif text-base sm:text-lg font-medium text-[#3D3530] pr-2">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#6B5F55] leading-relaxed pb-5 pl-11 pr-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <div className="mt-8 text-center text-sm text-[#6B5F55]">
            ¿Te quedaron otras dudas?{" "}
            <a
              href="https://wa.me/5491157496667?text=Hola%20MAMU!%20Tengo%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#6D5D8A] hover:text-[#5B4B78] underline-offset-2 hover:underline"
            >
              Escribinos por WhatsApp →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
