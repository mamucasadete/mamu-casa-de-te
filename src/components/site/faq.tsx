'use client'

import { motion } from "framer-motion";
import useSWR from "swr";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Clock, CalendarHeart, Flower2, Leaf, Route } from "lucide-react";

type FAQ = {
  _id: string;
  question: string;
  answer: string;
  order: number;
};

// Map icons by FAQ order (matches the original layout)
const FAQ_ICONS = [MapPin, Clock, CalendarHeart, Flower2, Leaf, Route];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function FAQ() {
  const { data: faqs, error, isLoading } = useSWR<FAQ[]>("/api/faq", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

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

        {isLoading && (
          <div className="mt-12 max-w-3xl mx-auto text-center py-8">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#8B7BA8] border-t-transparent" />
            <p className="mt-3 text-sm text-[#6B5F55] font-accent italic">Cargando preguntas...</p>
          </div>
        )}

        {error && (
          <div className="mt-12 max-w-3xl mx-auto text-center py-8">
            <p className="text-sm text-[#B85450]">
              No se pudieron cargar las preguntas. Por favor, recargá la página.
            </p>
          </div>
        )}

        {faqs && faqs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, idx) => {
                const Icon = FAQ_ICONS[idx % FAQ_ICONS.length];
                return (
                  <AccordionItem
                    key={faq._id}
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
        )}
      </div>
    </section>
  );
}
