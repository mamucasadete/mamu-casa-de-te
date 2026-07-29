'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LavenderDivider } from "./divider";

type MenuItem = {
  name: string;
  description?: string;
  price: string;
  tag?: string;
};

const MENU: Record<string, MenuItem[]> = {
  "Meriendas de campo": [
    {
      name: "Merienda Mamu",
      description: "Blend aromaherba, acompañado con cuatro facturas de lavanda.",
      price: "$ 15.000",
      tag: "Para 2 personas",
    },
    {
      name: "Merienda Serrana",
      description: "Café o té a elección, pan de campo con queso crema y mermelada.",
      price: "$ 8.000",
    },
    {
      name: "Merienda para los más chicos",
      description: "Chocolate con leche, waffles con dulce de leche, crema y frutas.",
      price: "$ 10.000",
      tag: "Kids",
    },
    {
      name: "Picada dulce de lavanda",
      description: "Tabla con facturas de lavanda, budín, torta y dos infusiones a elección.",
      price: "$ 20.000",
      tag: "Para compartir",
    },
  ],
  "Waffles & postres": [
    {
      name: "Waffle de lavanda clásico",
      description: "Masa de lavanda, dulce de leche, crema y frutas.",
      price: "$ 6.500",
      tag: "La estrella",
    },
    {
      name: "Waffle del campo",
      description: "Masa de lavanda, jamón, queso y queso crema.",
      price: "$ 7.000",
    },
  ],
  "Tortas": [
    {
      name: "Torta de lavanda y naranja",
      description: "Bizcocho húmedo con glaseado de naranja y flores de lavanda fresca.",
      price: "$ 6.000",
    },
  ],
  "Postres helados": [
    {
      name: "Postres de la BARROCA",
      description: "Cheesecake de oreo, cheesecake de frutos rojos, chocotorta, selva negra y tiramisú.",
      price: "$ 5.000",
    },
  ],
  "Infusiones": [
    {
      name: "Té de lavanda Mamu",
      description: "Blend aromaherba, té negro, lavanda, pétalos de rosas y cáscara de naranja.",
      price: "$ 5.000",
      tag: "De la casa",
    },
    {
      name: "Café serrano",
      description: "Café o café con leche.",
      price: "$ 4.500",
    },
    {
      name: "Chocolate con leche",
      description: "Leche chocolatada fría o caliente.",
      price: "$ 6.000",
    },
  ],
};

const TABS = Object.keys(MENU);

export function MenuSection() {
  const [active, setActive] = useState(TABS[0]);

  return (
    <section id="menu" className="relative bg-paper py-20 lg:py-28">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-[#B5A8C9]/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full bg-[#8FA586]/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="font-accent italic text-[#6D5D8A] text-xl">La carta</span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#3D3530] text-balance">
            Nuestra merienda de campo
          </h2>
          <p className="mt-5 text-[#3D3530]/75 leading-relaxed">
            Precios orientativos en pesos argentinos. La carta de postres y tortas cambia con las
            estaciones y lo que nos inspira esa semana. Consultá por opciones sin TACC y veganas.
          </p>
        </motion.div>

        <LavenderDivider className="my-10" label="meriendas · waffles · tortas · postres · infusiones" />

        <Tabs value={active} onValueChange={setActive} className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto bg-[#FFFBF4] border border-[#E0D4BD] rounded-full p-1.5 gap-1">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-full text-xs sm:text-sm font-medium data-[state=active]:bg-[#6D5D8A] data-[state=active]:text-[#FBF6EE] data-[state=active]:shadow-sm px-3 py-2.5 transition-all"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="grid sm:grid-cols-2 gap-4 sm:gap-5"
                >
                  {MENU[tab].map((item) => (
                    <div
                      key={item.name}
                      className="group flex gap-4 p-5 rounded-2xl bg-[#FFFBF4] border border-[#E0D4BD]/70 hover:border-[#8B7BA8]/50 hover:shadow-md transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3 flex-wrap">
                          <h3 className="font-serif text-lg font-medium text-[#3D3530]">
                            {item.name}
                          </h3>
                          <span className="font-serif text-lg font-semibold text-[#6D5D8A] whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                        {item.description && (
                          <p className="mt-1.5 text-sm text-[#6B5F55] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        {item.tag && (
                          <span className="mt-2 inline-block text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full bg-[#EFE6D6] text-[#6D5D8A] border border-[#E0D4BD]">
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center text-sm text-[#6B5F55]">
          <p>
            Consultá por <strong className="font-medium text-[#6D5D8A]">opciones veganas, sin gluten
            y alergias alimentarias</strong>. Avisanos al reservar.
          </p>
        </div>
      </div>
    </section>
  );
}
