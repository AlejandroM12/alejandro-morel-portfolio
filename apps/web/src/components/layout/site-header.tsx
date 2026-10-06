import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/layout/navigation";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {t("skip")}
      </a>
      <Navigation
        items={[
          { href: "/#experience", label: t("experience") },
          { href: "/#engineering", label: t("engineering") },
          { href: "/work", label: t("experiments") },
          { href: "/#skills", label: t("skills") },
          { href: "/#contact", label: t("contact") },
        ]}
      />
    </>
  );
}
