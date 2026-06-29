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
      description: "Tetera de té de lavanda (3 tazas), 2 scones tibios con mermelada y 2 porciones de torta de la casa.",
      price: "$ 8.500",
      tag: "Para 2 personas",
    },
    {
      name: "Merienda Serrana",
      description: "Café o té a elección, pan de campo con miel y queso, porción de torta de lavanda y limón.",
      price: "$ 5.800",
    },
    {
      name: "Merienda para los más chicos",
      description: "Chocolate con leche, waffle simple con dulce de leche y jugo de naranja natural.",
      price: "$ 4.200",
      tag: "Kids",
    },
    {
      name: "Picada dulce de lavanda",
      description: "Tabla con budín, brownie, scones, frutas de estación, miel y dos infusiones a elección.",
      price: "$ 7.600",
      tag: "Para compartir",
    },
  ],
  "Waffles & postres": [
    {
      name: "Waffle de lavanda clásico",
      description: "Masa de lavanda, miel silvestre, crema chantilly infusionada y frutos rojos.",
      price: "$ 4.800",
      tag: "La estrella",
    },
    {
      name: "Waffle del campo",
      description: "Con dulce de leche, banana, almendras tostadas y crema.",
      price: "$ 5.200",
    },
    {
      name: "Torta de lavanda y limón",
      description: "Bizcocho húmedo con glaseado de limón y flores de lavanda fresca.",
      price: "$ 3.400",
    },
    {
      name: "Brownie con nuez",
      description: "Brownie casero tibio con helado de crema americana y dulce de leche.",
      price: "$ 3.800",
    },
    {
      name: "Cheesecake de miel",
      description: "Tarta tibia de queso con miel de lavanda y coulis de frutos rojos.",
      price: "$ 4.100",
    },
  ],
  "Infusiones": [
    {
      name: "Té de lavanda Mamu",
      description: "Té negro con flores de lavanda cosechadas en el campo. Tetera para 3 tazas.",
      price: "$ 2.800",
      tag: "De la casa",
    },
    {
      name: "Manzanilla serrana",
      description: "Hierbas secas del jardín. Suave, ideal para la siesta.",
      price: "$ 2.400",
    },
    {
      name: "Hierbas del campo",
      description: "Mezcla de peperina, menta y poleo. Típica de las sierras de Córdoba.",
      price: "$ 2.400",
    },
    {
      name: "Café serrano",
      description: "Café de tetera, espresso o lagrima. Leche vegetal sin cargo.",
      price: "$ 1.900",
    },
    {
      name: "Chocolate con leche",
      description: "Chocolate tibio espeso con crema chantilly. Para los días frescos.",
      price: "$ 2.600",
    },
  ],
  "Para llevar": [
    {
      name: "Sobres de té de lavanda",
      description: "Caja con 10 saquitos. Llevate el aroma de MAMU a casa.",
      price: "$ 3.500",
    },
    {
      name: "Miel de lavanda",
      description: "Frasco de 250 g. Miel pura infusionada con flores de Aromahérba.",
      price: "$ 4.200",
      tag: "Edición limitada",
    },
    {
      name: "Scones para llevar",
      description: "Media docena de scones recién horneados con mermelada a elección.",
      price: "$ 3.800",
    },
    {
      name: "Aceite esencial de lavanda",
      description: "10 ml puro de Aromahérba. Aromaterapia y uso cosmético.",
      price: "$ 6.500",
      tag: "De Aromahérba",
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

        <LavenderDivider className="my-10" label="meriendas · waffles · tés · para llevar" />

        <Tabs value={active} onValueChange={setActive} className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto bg-[#FFFBF4] border border-[#E0D4BD] rounded-full p-1.5 gap-1">
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
