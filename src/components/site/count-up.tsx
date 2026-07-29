'use client'

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CountUpProps = {
  /** Valor final (número). Para "100%" pasar 100, para "+9" pasar 9, para "87 km" pasar 87. */
  end: number;
  /** Prefijo opcional (ej: "+"). */
  prefix?: string;
  /** Sufijo opcional (ej: "%", " km"). */
  suffix?: string;
  /** Duración de la animación en ms. Default 2000. */
  duration?: number;
  /** Decimales a mostrar. Default 0. */
  decimals?: number;
  /** Clase para estilizar el número. */
  className?: string;
};

/**
 * Contador que anima desde 0 hasta `end` cuando entra en viewport.
 * Usa easeOutExpo para desacelerar al final (feeling premium).
 */
export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo: desacelera al final
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * end;
      setValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        setValue(end);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  // Formatear número con separadores de miles si corresponde
  const formatted = value.toLocaleString("es-AR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
