'use client'

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Spring suaviza el movimiento de la barra
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#6D5D8A] via-[#8B7BA8] to-[#5F7558]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
