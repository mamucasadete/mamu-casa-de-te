'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LavenderDivider } from "./divider";

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tag?: string;
  available: boolean;
  order: number;
};

type MenuByCategory = Record<string, MenuItem[]>;

// Formatear precio ARS: 15000 → "$ 15.000"
function formatPrice(price: number): string {
  return `$ ${price.toLocaleString("es-AR")}`;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function MenuSection() {
  const [active, setActive] = useState<string>("");

  // Fetch menu from Sanity via API route
  const { data: menu, error, isLoading } = useSWR<MenuByCategory>("/api/menu", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // 1 minute cache
  });

  // Set first category as active when menu loads
  const categories = menu ? Object.keys(menu) : [];
  const currentActive = active || categories[0] || "";

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

        {/* Loading state */}
        {isLoading && (
          <div className="max-w-5xl mx-auto text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#8B7BA8] border-t-transparent" />
            <p className="mt-4 text-sm text-[#6B5F55] font-accent italic">Cargando el menú...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="max-w-5xl mx-auto text-center py-12">
            <p className="text-sm text-[#B85450]">
              No se pudo cargar el menú en este momento. Por favor, recargá la página.
            </p>
          </div>
        )}

        {/* Menu content */}
        {menu && categories.length > 0 && (
          <Tabs
            value={currentActive}
            onValueChange={setActive}
            className="max-w-5xl mx-auto"
          >
            <TabsList
              className="grid w-full h-auto bg-[#FFFBF4] border border-[#E0D4BD] rounded-2xl sm:rounded-full p-1.5 gap-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            >
              {categories.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-full sm:rounded-full text-xs sm:text-sm font-medium data-[state=active]:bg-[#6D5D8A] data-[state=active]:text-[#FBF6EE] data-[state=active]:shadow-sm px-2 sm:px-3 py-2 sm:py-2.5 transition-all whitespace-nowrap"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentActive}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="grid sm:grid-cols-2 gap-4 sm:gap-5"
                  >
                    {menu[tab].map((item) => (
                      <div
                        key={item._id}
                        className="group flex gap-4 p-5 rounded-2xl bg-[#FFFBF4] border border-[#E0D4BD]/70 hover:border-[#8B7BA8]/50 hover:shadow-md transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-3 flex-wrap">
                            <h3 className="font-serif text-lg font-medium text-[#3D3530]">
                              {item.name}
                            </h3>
                            <span className="font-serif text-lg font-semibold text-[#6D5D8A] whitespace-nowrap">
                              {formatPrice(item.price)}
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
        )}

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
