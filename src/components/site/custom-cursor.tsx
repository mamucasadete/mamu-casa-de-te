'use client'

import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Hook para suscribirse a una media query sin causar renders en cascada.
 * Usa useSyncExternalStore (patrón recomendado por React 18+).
 */
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches, // client snapshot
    () => false // server snapshot (no cursor en SSR)
  );
}

/**
 * Cursor personalizado con dos elementos:
 * - Punto lavanda pequeño que sigue el cursor exactamente
 * - Círculo lavanda grande que sigue con leve delay (efecto "trailing")
 *
 * Solo se activa en dispositivos con cursor fino (desktop).
 * Se oculta en mobile automáticamente.
 * Al hover sobre elementos interactivos, el círculo se agranda.
 */
export function CustomCursor() {
  const isEnabled = useMediaQuery("(pointer: fine)");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Detectar si el cursor está sobre un elemento interactivo
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], [role="link"], label, summary, .btn-shine, .group'
      ) !== null;
      setIsHovering(isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isEnabled]);

  // Trailing suave con requestAnimationFrame
  useEffect(() => {
    if (!isEnabled) return;
    let raf: number;
    const animate = () => {
      setTrailingPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [position, isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Punto central — sigue el cursor exactamente */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] top-0 left-0 rounded-full mix-blend-difference"
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "#B5A8C9",
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s, width 0.2s, height 0.2s, background-color 0.2s",
        }}
      />
      {/* Círculo trailing — sigue con delay suave */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] top-0 left-0 rounded-full border border-[#8B7BA8]"
        style={{
          width: isHovering ? "56px" : "32px",
          height: isHovering ? "56px" : "32px",
          transform: `translate(${trailingPosition.x - (isHovering ? 28 : 16)}px, ${
            trailingPosition.y - (isHovering ? 28 : 16)
          }px)`,
          opacity: isVisible ? (isHovering ? 0.6 : 0.4) : 0,
          transition: "opacity 0.2s, width 0.2s, height 0.2s, background-color 0.2s",
          backgroundColor: isHovering ? "rgba(139, 123, 168, 0.1)" : "transparent",
          backdropFilter: "blur(1px)",
        }}
      />
    </>
  );
}
