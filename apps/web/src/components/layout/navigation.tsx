"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type NavigationItem = {
  href: string;
  label: string;
};

type NavigationProps = {
  items: readonly NavigationItem[];
  label?: string;
  sticky?: boolean;
  landmark?: boolean;
};

export function Navigation({
  items,
  label,
  sticky = true,
  landmark = true,
}: NavigationProps) {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const Root = landmark ? "header" : "div";

  return (
    <Root
      className={cn(
        "z-20 border-b border-border bg-background",
        sticky && "sticky top-0",
      )}
    >
      <Container>
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="font-serif text-subheading tracking-tight">
            {t("brand")}
          </Link>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            {items.length > 0 ? (
              <nav aria-label={label ?? t("primary")}>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {items.map((item) => {
                    const current =
                      pathname === item.href ||
                      (item.href !== "/" &&
                        pathname.startsWith(`${item.href}/`));

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={current ? "page" : undefined}
                          className="link-quiet text-small"
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : null}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Container>
    </Root>
  );
}
