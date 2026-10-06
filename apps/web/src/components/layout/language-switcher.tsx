"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const labels = {
  es: "ES",
  en: "EN",
} as const satisfies Record<Locale, string>;

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Language");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")} className={className}>
      <ul className="flex items-center gap-2">
        {routing.locales.map((code, index) => {
          const current = code === locale;

          return (
            <li key={code} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-meta text-muted">
                  /
                </span>
              ) : null}
              <Link
                href={pathname}
                locale={code}
                hrefLang={code}
                lang={code}
                aria-current={current ? "true" : undefined}
                aria-label={t(code)}
                className="link-quiet min-w-7 justify-center font-mono text-meta uppercase"
              >
                {labels[code]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
