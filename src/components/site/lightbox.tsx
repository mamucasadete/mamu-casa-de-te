'use client'

import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type LightboxPhoto = {
  src: string;
  alt: string;
};

type LightboxProps = {
  photos: LightboxPhoto[];
  index: number;          // controlled by parent
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function Lightbox({ photos, index, isOpen, onClose, onIndexChange }: LightboxProps) {
  const total = photos.length;
  const touchStartXRef = useRef<number | null>(null);

  const goTo = useCallback(
    (newIdx: number) => {
      // wrap-around navigation
      const wrapped = ((newIdx % total) + total) % total;
      onIndexChange(wrapped);
    },
    [total, onIndexChange]
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Keyboard navigation: ESC to close, arrows to navigate
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll when lightbox is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goNext, goPrev]);

  // Touch swipe for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) goNext();
      else goPrev();
    }
    touchStartXRef.current = null;
  };

  if (!isOpen || total === 0) return null;

  const current = photos[index];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-[#3D3530]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Visor de imágenes — galería de MAMU Casa de Té"
        >
          {/* Top bar: counter + close */}
          <div
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[#FBF6EE]/80 text-sm font-accent italic">
              {index + 1} / {total}
            </span>
            <button
              onClick={onClose}
              aria-label="Cerrar visor"
              className="h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-[#FBF6EE] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Previous arrow (desktop) */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Foto anterior"
              className="absolute left-3 sm:left-6 z-20 h-12 w-12 rounded-full bg-white/10 hover:bg-[#6D5D8A] backdrop-blur-sm flex items-center justify-center text-[#FBF6EE] transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image with AnimatePresence for slide transition */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.picture
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="block"
              >
                <source
                  type="image/avif"
                  srcSet={current.src.replace(/\.jpg$/, ".avif")}
                />
                <source
                  type="image/webp"
                  srcSet={current.src.replace(/\.jpg$/, ".webp")}
                />
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
              </motion.picture>
            </AnimatePresence>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 text-center pb-2">
              <p className="font-accent italic text-[#FBF6EE]/85 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto px-4">
                {current.alt}
              </p>
            </div>
          </div>

          {/* Next arrow (desktop) */}
          {total > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Foto siguiente"
              className="absolute right-3 sm:right-6 z-20 h-12 w-12 rounded-full bg-white/10 hover:bg-[#6D5D8A] backdrop-blur-sm flex items-center justify-center text-[#FBF6EE] transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Hint bar (mobile) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:hidden">
            <span className="text-[#FBF6EE]/50 text-xs font-accent italic">
              Deslizá para navegar
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
