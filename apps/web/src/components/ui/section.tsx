import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-[var(--space-section)]", className)}
      {...props}
    />
  );
}
