import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

const titleClass = {
  h1: "font-serif text-display text-balance",
  h2: "font-serif text-title text-balance",
  h3: "font-serif text-heading text-balance",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  as = "h2",
  className,
}: SectionHeadingProps) {
  const Title = as;

  return (
    <header
      className={cn("flex max-w-[var(--measure)] flex-col gap-4", className)}
    >
      {eyebrow ? (
        <p className="max-w-[var(--measure)] font-mono text-meta text-balance text-muted uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Title className={titleClass[as]}>{title}</Title>
      {description ? (
        <p className="text-body text-muted">{description}</p>
      ) : null}
    </header>
  );
}
