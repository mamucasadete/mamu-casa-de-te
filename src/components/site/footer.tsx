'use client'

import { Instagram, Facebook, Clock, Phone, MapPin, Mail, Heart } from "lucide-react";

const NAV = [
  { href: "#sobre", label: "Sobre MAMU" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#menu", label: "Menú" },
  { href: "#galeria", label: "Galería" },
  { href: "#eventos", label: "Eventos" },
  { href: "#como-llegar", label: "Cómo llegar" },
  { href: "#reservas", label: "Reservar" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#3D3530] text-[#F0E8D9] mt-auto">
      {/* Top decorative line */}
      <div className="h-1 bg-gradient-to-r from-[#8B7BA8] via-[#8FA586] to-[#A87D5E]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-mamu.png"
                alt="Logo de MAMU Casa de Té"
                className="h-14 w-14 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-semibold tracking-[0.18em] text-[#F0E8D9]">
                  MAMU
                </span>
                <span className="font-accent italic text-xs text-[#B5A8C9] -mt-0.5">
                  Casa de té · Meriendas de campo
                </span>
              </div>
            </div>
            <p className="mt-5 text-sm text-[#F0E8D9]/70 leading-relaxed max-w-xs">
              Una merienda entre flores de lavanda en Calmayo, Valle de Calamuchita.
              Slow living, sabores artesanales y mucho amor serrano.
            </p>

            {/* Social */}
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.instagram.com/mamu_casa_de_te/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de MAMU Casa de Té"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-[#8B7BA8] flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/AROMAHERBACALMAYO"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Aromahérba"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-[#8FA586] flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/5491157496667"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de MAMU Casa de Té"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.42 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-serif text-sm font-medium uppercase tracking-wider text-[#B5A8C9]">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#F0E8D9]/75 hover:text-[#F0E8D9] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-sm font-medium uppercase tracking-wider text-[#B5A8C9]">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-[#F0E8D9]/75">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#8FA586]" />
                <span>
                  Aromahérba · Calmayo<br/>
                  Calamuchita · Córdoba · AR
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#F0E8D9]/75">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#8FA586]" />
                <a href="tel:+541157496667" className="hover:text-[#F0E8D9] transition-colors">
                  11 5749 6667
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#F0E8D9]/75">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#8FA586]" />
                <a
                  href="mailto:hola@mamucasadete.com.ar"
                  className="hover:text-[#F0E8D9] transition-colors"
                >
                  hola@mamucasadete.com.ar
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#F0E8D9]/75">
                <Instagram className="h-4 w-4 flex-shrink-0 text-[#8FA586]" />
                <a
                  href="https://www.instagram.com/mamu_casa_de_te/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F0E8D9] transition-colors"
                >
                  @mamu_casa_de_te
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-serif text-sm font-medium uppercase tracking-wider text-[#B5A8C9]">
              Horarios
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-[#F0E8D9]/75">
                <Clock className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#8FA586]" />
                <div>
                  <p className="font-medium text-[#F0E8D9]">Fines de semana largos</p>
                  <p className="text-xs mt-0.5">De 10 a 18 horas</p>
                </div>
              </li>
              <li className="text-xs text-[#F0E8D9]/60 italic leading-relaxed">
                Para feriados, eventos privados y la Fiesta de la Cosecha de la Lavanda, consultá
                horarios especiales por WhatsApp o Instagram.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F0E8D9]/55">
          <p>
            © {new Date().getFullYear()} MAMU Casa de Té · Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1.5">
            Hecho con <Heart className="h-3 w-3 text-[#B85450] fill-current" /> en Calmayo, Córdoba
          </p>
        </div>
      </div>
    </footer>
  );
}
