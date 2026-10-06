import { cn } from "@/lib/cn";

const frames = [
  "bg-foreground text-background",
  "bg-accent text-accent-foreground",
  "bg-background text-foreground",
] as const;

type ProjectVisualProps = {
  name: string;
  index: number;
  featured?: boolean;
  className?: string;
};

export function ProjectVisual({
  name,
  index,
  featured = false,
  className,
}: ProjectVisualProps) {
  const frame = frames[index] ?? frames[0];
  const mark = String(index + 1).padStart(2, "0");

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex flex-col justify-between p-6 md:p-8",
        featured
          ? "min-h-72 border-b border-border md:min-h-full md:border-r md:border-b-0"
          : "min-h-52 border-b border-border",
        frame,
        className,
      )}
    >
      <p className="flex items-center justify-between font-mono text-meta uppercase opacity-70">
        <span>{mark}</span>
        <span>{name}</span>
      </p>
      <Plate index={index} />
    </div>
  );
}

function Plate({ index }: { index: number }) {
  if (index === 1) {
    return (
      <div className="flex w-[70%] flex-col gap-3">
        <Rule width="100%" />
        <Rule width="84%" />
        <Rule width="100%" />
        <Rule width="62%" />
        <Rule width="78%" />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="flex items-center gap-3">
        <span className="size-10 border border-current opacity-70" />
        <span className="h-px w-8 bg-current opacity-40" />
        <span className="size-10 border border-current opacity-70" />
        <span className="h-px w-8 bg-current opacity-40" />
        <span className="size-10 border border-current opacity-70" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Rule width="100%" />
      <Rule width="100%" />
      <Rule width="72%" />
      <Rule width="100%" />
    </div>
  );
}

function Rule({ width }: { width: string }) {
  return (
    <span className="block h-px bg-current opacity-35" style={{ width }} />
  );
}
