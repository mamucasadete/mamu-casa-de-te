'use client'

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5491157496667";
const DEFAULT_MSG = "Hola MAMU! Me gustaría hacer una reserva 🌿";

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MSG)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar por WhatsApp"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span className="hidden sm:inline-block bg-white text-[#3D3530] text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-[#E0D4BD]">
        Reservá por WhatsApp
      </span>
      <span className="relative flex items-center justify-center bg-[#25D366] hover:bg-[#1FB855] transition-colors rounded-full h-14 w-14 shadow-xl">
        <MessageCircle className="h-7 w-7 text-white" strokeWidth={2.2} />
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#6D5D8A] rounded-full border-2 border-white animate-pulse" />
      </span>
    </a>
  );
}
