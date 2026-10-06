import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type ProjectCardProps = {
  title: string;
  summary: string;
  href: string;
  tags: readonly string[];
  year?: string;
  category?: string;
  mark?: string;
  actionLabel?: string;
  media?: ReactNode;
  featured?: boolean;
  className?: string;
};

export function ProjectCard({
  title,
  summary,
  href,
  tags,
  year,
  category,
  mark,
  actionLabel,
  media,
  featured = false,
  className,
}: ProjectCardProps) {
  const classNames = cn(
    "group block h-full overflow-hidden border border-border bg-surface shadow-sm transition-control hover:border-border-strong",
    media && featured && "md:grid md:grid-cols-[1.2fr_1fr]",
    className,
  );
  const body = (
    <div className="flex h-full flex-col p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        {category ? <Badge tone="accent">{category}</Badge> : <span />}
        {year || mark ? (
          <p className="font-mono text-meta text-muted">{year ?? mark}</p>
        ) : null}
      </div>
      <h3 className="mt-5 font-serif text-heading">{title}</h3>
      <p className="mt-3 max-w-[var(--measure)] text-small text-muted">
        {summary}
      </p>
      {tags.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge>{tag}</Badge>
            </li>
          ))}
        </ul>
      ) : null}
      {actionLabel ? (
        <p className="mt-auto pt-8 font-mono text-meta text-foreground uppercase">
          <span className="border-b border-transparent transition-control group-hover:border-current">
            {actionLabel}
          </span>
        </p>
      ) : null}
    </div>
  );
  const content = (
    <>
      {media}
      {body}
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classNames} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {content}
    </Link>
  );
}
