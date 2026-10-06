import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 border border-transparent font-sans text-small transition-control disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
  {
    variants: {
      variant: {
        primary:
          "bg-foreground text-background hover:bg-accent hover:text-accent-foreground active:bg-accent-pressed active:text-accent-foreground",
        secondary:
          "border-border-strong bg-transparent text-foreground hover:bg-surface active:border-foreground",
        ghost: "text-foreground hover:bg-surface active:bg-border",
      },
      size: {
        sm: "h-[var(--control-sm)] px-3",
        md: "h-[var(--control-md)] px-5",
        icon: "size-[var(--control-md)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = VariantProps<typeof buttonVariants> & {
  href: string;
  children: ReactNode;
  className?: string;
  download?: boolean;
};

export function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
  download = false,
}: ButtonLinkProps) {
  const classNames = cn(buttonVariants({ variant, size }), className);
  const external =
    href.startsWith("http") || href.startsWith("mailto:") || download;

  if (external) {
    return (
      <a
        href={href}
        className={classNames}
        {...(download ? { download: true } : {})}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}

export { buttonVariants };
