'use client'

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface LavenderDividerProps {
  className?: string;
  withFlower?: boolean;
  label?: string;
}

/**
 * Divisor decorativo con rama de lavanda SVG que se "dibuja" al entrar en viewport.
 * Usa stroke-dashoffset animado para efecto hand-drawn.
 */
export function LavenderDivider({ className, withFlower = false, label }: LavenderDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (withFlower || label) {
    return (
      <div ref={ref} className={cn("flex items-center justify-center gap-4 py-6", className)}>
        {/* Línea izquierda — se dibuja de derecha a izquierda */}
        <motion.svg
          width="80"
          height="20"
          viewBox="0 0 80 20"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.path
            d="M 80 10 L 8 10"
            stroke="#8B7BA8"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Pequeñas espigas de lavanda en la línea */}
          {[20, 35, 50, 65].map((x, i) => (
            <motion.circle
              key={x}
              cx={x}
              cy={10}
              r="1.5"
              fill="#B5A8C9"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.7 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
            />
          ))}
        </motion.svg>

        {/* Flor / espiga central de lavanda — aparece con scale */}
        <motion.div
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: -90, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex items-center gap-1"
        >
          <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
            {/* Tallo */}
            <path d="M 12 30 L 12 12" stroke="#5F7558" strokeWidth="1.2" strokeLinecap="round" />
            {/* Espigas de lavanda (3 flores apiladas) */}
            <ellipse cx="12" cy="6" rx="3.5" ry="5" fill="#8B7BA8" />
            <ellipse cx="9" cy="9" rx="2.5" ry="4" fill="#B5A8C9" />
            <ellipse cx="15" cy="9" rx="2.5" ry="4" fill="#B5A8C9" />
            <ellipse cx="10" cy="13" rx="2" ry="3" fill="#6D5D8A" />
            <ellipse cx="14" cy="13" rx="2" ry="3" fill="#6D5D8A" />
            {/* Hojitas */}
            <path d="M 12 18 Q 8 19 7 22" stroke="#5F7558" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            <path d="M 12 18 Q 16 19 17 22" stroke="#5F7558" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>

        {label && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="font-accent italic text-[#6D5D8A] text-lg"
          >
            {label}
          </motion.span>
        )}

        {/* Flor / espiga derecha */}
        {label && (
          <motion.div
            initial={{ scale: 0, rotate: 90, opacity: 0 }}
            animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          >
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
              <path d="M 12 30 L 12 12" stroke="#5F7558" strokeWidth="1.2" strokeLinecap="round" />
              <ellipse cx="12" cy="6" rx="3.5" ry="5" fill="#8B7BA8" />
              <ellipse cx="9" cy="9" rx="2.5" ry="4" fill="#B5A8C9" />
              <ellipse cx="15" cy="9" rx="2.5" ry="4" fill="#B5A8C9" />
              <ellipse cx="10" cy="13" rx="2" ry="3" fill="#6D5D8A" />
              <ellipse cx="14" cy="13" rx="2" ry="3" fill="#6D5D8A" />
              <path d="M 12 18 Q 8 19 7 22" stroke="#5F7558" strokeWidth="0.8" fill="none" strokeLinecap="round" />
              <path d="M 12 18 Q 16 19 17 22" stroke="#5F7558" strokeWidth="0.8" fill="none" strokeLinecap="round" />
            </svg>
          </motion.div>
        )}

        {/* Línea derecha */}
        <motion.svg
          width="80"
          height="20"
          viewBox="0 0 80 20"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.path
            d="M 0 10 L 72 10"
            stroke="#8B7BA8"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          />
          {[15, 30, 45, 60].map((x, i) => (
            <motion.circle
              key={x}
              cx={x}
              cy={10}
              r="1.5"
              fill="#B5A8C9"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 0.7 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
            />
          ))}
        </motion.svg>
      </div>
    );
  }

  // Versión simple sin flor
  return (
    <div ref={ref} className={cn("flex items-center justify-center py-2", className)}>
      <motion.svg
        width="240"
        height="20"
        viewBox="0 0 240 20"
        fill="none"
      >
        <motion.line
          x1="0"
          y1="10"
          x2="240"
          y2="10"
          stroke="#8B7BA8"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {[40, 80, 120, 160, 200].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={10}
            r="1.5"
            fill="#B5A8C9"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.6 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
