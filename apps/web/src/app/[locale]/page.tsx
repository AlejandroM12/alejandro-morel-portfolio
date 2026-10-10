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
          viewExperience: t("viewExperience"),
          downloadCv: t("downloadCv"),
          contact: t("contact"),
          technologiesLabel: t("technologiesLabel"),
          experienceEyebrow: t("experienceEyebrow"),
          experienceTitle: t("experienceTitle"),
          engineeringEyebrow: t("engineeringEyebrow"),
          engineeringBody: t("engineeringBody"),
          signature: t("jobTitle"),
          workEyebrow: work("eyebrow"),
          workTitle: work("title"),
          workDescription: work("description"),
          viewProject: work("viewProject"),
          viewConcept: work("viewConcept"),
          categoryLabel: {
            web: work("web"),
            backend: work("backend"),
            mobile: work("mobile"),
            "applied-ai": work("applied-ai"),
          },
          statusLabel: {
            concept: work("statusConcept"),
            "in-progress": work("statusInProgress"),
            shipped: work("statusShipped"),
          },
          skillsEyebrow: t("skillsEyebrow"),
          skillsTitle: t("skillsTitle"),
          expandingEyebrow: t("expandingEyebrow"),
          expandingTitle: t("expandingTitle"),
          expandingBody: t("expandingBody"),
          contactEyebrow: t("contactEyebrow"),
          contactTitle: t("contactTitle"),
          contactBody: t("contactBody"),
          emailLabel: t("emailLabel"),
          linkedinLabel: t("linkedinLabel"),
          githubLabel: t("githubLabel"),
          educationEyebrow: t("educationEyebrow"),
          educationTitle: t("educationTitle"),
        }}
      />
    </main>
  );
}
