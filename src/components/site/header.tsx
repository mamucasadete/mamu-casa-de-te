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
          ? "bg-background/95 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(109,93,138,0.25)] border-b border-[#E0D4BD]/60"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 group" aria-label="MAMU Casa de Té — Inicio">
            <div className="flex items-baseline">
              <span className="font-serif text-2xl lg:text-3xl font-semibold tracking-[0.2em] text-[#6D5D8A] group-hover:text-[#8B7BA8] transition-colors">
                MAMU
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight border-l border-[#E0D4BD] pl-2 ml-1">
              <span className="font-accent italic text-[11px] text-[#6B5F55]">Casa de té</span>
              <span className="font-accent italic text-[11px] text-[#6B5F55]">Calmayo · Córdoba</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[#3D3530]/80 hover:text-[#6D5D8A] transition-colors relative group"
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
                className="bg-[#6D5D8A] hover:bg-[#5B4B78] text-[#FBF6EE] shadow-sm rounded-full gap-2 px-5"
              >
                <CalendarHeart className="h-4 w-4" />
                Reservar
              </Button>
            </a>
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-[#3D3530] hover:bg-[#EFE6D6] rounded-md transition-colors"
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
