'use client'

import { useRef, useState, useCallback } from "react";
import type { ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Intensidad del tilt en grados. Default 6. */
  max?: number;
  /** Escala al hover. Default 1.02. */
  scale?: number;
  /** Glare effect (brillo que sigue el cursor). Default true. */
  glare?: boolean;
};

/**
 * Card con efecto 3D tilt suave que sigue el cursor.
 * Incluye glare opcional (brillo que sigue el cursor).
 */
export function TiltCard({ children, className, max = 6, scale = 1.02, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // x dentro del card
      const y = e.clientY - rect.top; // y dentro del card
      const px = x / rect.width; // 0..1
      const py = y / rect.height; // 0..1

      // Tilt: el card se inclina hacia donde está el cursor
      const tiltX = (py - 0.5) * -2 * max; // -max..max (eje X)
      const tiltY = (px - 0.5) * 2 * max; // -max..max (eje Y)

      setTransform(
        `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`
      );

      if (glare) {
        setGlarePos({
          x: px * 100,
          y: py * 100,
          opacity: 0.15,
        });
      }
    },
    [max, scale, glare]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setGlarePos({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform,
        transition: transform
          ? "transform 0.1s ease-out"
          : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        position: "relative",
      }}
    >
      {children}
      {/* Glare overlay — brillo sutil que sigue el cursor */}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 50%)`,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </div>
  );
}
