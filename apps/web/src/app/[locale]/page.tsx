import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomeView } from "@/features/home/home-view";
import { isLocale } from "@/i18n/routing";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: {
      absolute: t("metaTitle"),
    },
    description: t("subtitle"),
    alternates: {
      canonical: locale === "en" ? "/en" : "/",
      languages: {
        es: "/",
        en: "/en",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("subtitle"),
      locale: locale === "en" ? "en_US" : "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("metaTitle"),
      description: t("subtitle"),
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations("Home");
  const work = await getTranslations("Work");

  return (
    <main>
      <HomeView
        locale={locale}
        copy={{
          name: "Alejandro Morel",
          title: t("title"),
          subtitle: t("subtitle"),
          viewWork: t("viewWork"),
          downloadCv: t("downloadCv"),
          contact: t("contact"),
          technologiesLabel: t("technologiesLabel"),
          workEyebrow: t("workEyebrow"),
          workTitle: t("workTitle"),
          viewProject: work("viewProject"),
          viewConcept: work("viewConcept"),
          categoryLabel: {
            fullstack: work("fullstack"),
            ai: work("ai"),
            backend: work("backend"),
            frontend: work("frontend"),
            automation: work("automation"),
          },
          statusLabel: {
            concept: work("statusConcept"),
            "in-progress": work("statusInProgress"),
            shipped: work("statusShipped"),
          },
          aboutEyebrow: t("aboutEyebrow"),
          aboutTitle: t("aboutTitle"),
          aboutBody: t("aboutBody"),
          experienceEyebrow: t("experienceEyebrow"),
          experienceTitle: t("experienceTitle"),
          skillsEyebrow: t("skillsEyebrow"),
          skillsTitle: t("skillsTitle"),
          contactEyebrow: t("contactEyebrow"),
          contactTitle: t("contactTitle"),
          contactBody: t("contactBody"),
          emailLabel: t("emailLabel"),
          linkedinLabel: t("linkedinLabel"),
        }}
      />
    </main>
  );
}
