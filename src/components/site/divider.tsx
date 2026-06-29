import { cn } from "@/lib/utils";

interface LavenderDividerProps {
  className?: string;
  withFlower?: boolean;
  label?: string;
}

export function LavenderDivider({ className, withFlower = false, label }: LavenderDividerProps) {
  if (withFlower || label) {
    return (
      <div className={cn("flex items-center justify-center gap-4 py-6", className)}>
        <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#8B7BA8]/60" />
        <span className="text-[#8B7BA8] text-2xl select-none" aria-hidden>
          {withFlower ? "❧" : "•"}
        </span>
        {label && (
          <span className="font-accent italic text-[#6D5D8A] text-lg">{label}</span>
        )}
        <span className="text-[#8B7BA8] text-2xl select-none" aria-hidden>
          {withFlower ? "❧" : "•"}
        </span>
        <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#8B7BA8]/60" />
      </div>
    );
  }
  return (
    <div className={cn("divider-lavender w-full max-w-xs mx-auto", className)} />
  );
}
