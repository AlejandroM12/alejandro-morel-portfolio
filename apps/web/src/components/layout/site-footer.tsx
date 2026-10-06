import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-border">
      <Container>
        <p className="py-8 font-mono text-meta text-muted uppercase">
          {t("note")}
        </p>
      </Container>
    </footer>
  );
}
