'use client'

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  /** Delay en segundos para escalonar animaciones dentro del mismo grupo */
  delay?: number;
  /** Dirección de entrada */
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  /** Distancia a recorrer en la entrada (en px). Default 30. */
  distance?: number;
  /** Duración de la animación en segundos. Default 0.6. */
  duration?: number;
  /** Si la animación se ejecuta solo una vez (true) o cada vez que entra en viewport. Default true. */
  once?: boolean;
  /** Clase extra para el wrapper */
  className?: string;
  /** Tipo de elemento wrapper. Default div. */
  as?: "div" | "article" | "figure" | "span" | "li";
};

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.6,
  once = true,
  className,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: "-60px", // arranca la animación cuando el elemento está a 60px de entrar
  });

  // Definir el offset inicial según la dirección
  const initial: Record<string, number | string> = { opacity: 0 };
  if (direction === "up") initial.y = distance;
  if (direction === "down") initial.y = -distance;
  if (direction === "left") initial.x = distance;
  if (direction === "right") initial.x = -distance;
  if (direction === "scale") initial.scale = 0.92;
  if (direction === "fade") {
    // solo fade, sin movimiento
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // ease-out-expo — suave y premium
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
