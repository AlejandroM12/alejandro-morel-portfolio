import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main>
      <Section>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Container>
      </Section>
    </main>
  );
}
