'use client'

import { useEffect, useState } from "react";
import { Menu, X, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre MAMU" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#menu", label: "Menú" },
  { href: "#galeria", label: "Galería" },
  { href: "#eventos", label: "Eventos" },
  { href: "#faq", label: "Preguntas" },
  { href: "#como-llegar", label: "Cómo llegar" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-[#E0D4BD]/60"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 lg:h-24 items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 sm:gap-3.5 group" aria-label="MAMU Casa de Té — Inicio">
            <img
              src="/images/logo-mamu.png"
              alt="Logo de MAMU Casa de Té"
              className={`h-16 w-16 lg:h-20 lg:w-20 object-contain transition-all duration-500 group-hover:scale-105 ${
                scrolled ? "" : "drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)] brightness-0 invert"
              }`}
              style={scrolled ? {} : { filter: "brightness(0) invert(1)" }}
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`font-serif text-2xl sm:text-3xl lg:text-[2rem] font-semibold tracking-[0.18em] transition-colors ${
                  scrolled
                    ? "text-[#3D3530] group-hover:text-[#6D5D8A]"
                    : "text-[#FBF6EE] text-shadow-soft"
                }`}
              >
                MAMU
              </span>
              <span
                className={`font-accent italic text-[11px] sm:text-xs lg:text-sm -mt-0.5 transition-colors ${
                  scrolled ? "text-[#6B5F55]" : "text-[#FBF6EE]/80"
                }`}
              >
                Casa de té · Calmayo · Córdoba
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors relative group ${
                  scrolled
                    ? "text-[#3D3530]/80 hover:text-[#6D5D8A]"
                    : "text-[#FBF6EE]/90 hover:text-[#FBF6EE] text-shadow-soft"
                }`}
              >
                {link.label}
                <span className="absolute bottom-1 left-3 right-3 h-px bg-[#8B7BA8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#reservas" className="hidden sm:inline-flex">
              <Button
                size="sm"
                className={`shadow-sm rounded-full gap-2 px-5 transition-colors ${
                  scrolled
                    ? "bg-[#6D5D8A] hover:bg-[#5B4B78] text-[#FBF6EE]"
                    : "bg-[#FBF6EE] hover:bg-[#F0E8D9] text-[#6D5D8A]"
                }`}
              >
                <CalendarHeart className="h-4 w-4" />
                Reservar
              </Button>
            </a>
            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 rounded-md transition-colors ${
                scrolled
                  ? "text-[#3D3530] hover:bg-[#EFE6D6]"
                  : "text-[#FBF6EE] hover:bg-white/10"
              }`}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-[#E0D4BD]">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base font-medium text-[#3D3530] hover:bg-[#EFE6D6] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservas"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-[#6D5D8A] text-[#FBF6EE] rounded-md text-center font-medium"
            >
              Reservar mesa
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
