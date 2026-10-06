import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectCard } from "@/components/project-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  filterProjects,
  isProjectCategory,
  listProjects,
  projectCategories,
  projectCover,
  type ProjectCategory,
} from "@/content/projects";
import { text } from "@/content/profile";
import { ProjectImage } from "@/features/home/project-image";
import { ProjectVisual } from "@/features/home/project-visual";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";

type WorkPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Work" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "en" ? "/en/work" : "/work",
      languages: {
        es: "/work",
        en: "/en/work",
      },
    },
  };
}

export default async function WorkPage({
  params,
  searchParams,
}: WorkPageProps) {
  const { locale } = await params;
  const query = await searchParams;
  const t = await getTranslations("Work");
  const requested = query.category ?? "all";
  const category = isProjectCategory(requested) ? requested : "all";
  const visible = filterProjects(category);
  const ordered = listProjects();
  const filters = ["all", ...projectCategories] as const;

  return (
    <main>
      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            as="h1"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <nav aria-label={t("filters")}>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {filters.map((filter) => {
                const active = filter === category;

                return (
                  <li key={filter}>
                    <Link
                      href={filterHref(filter)}
                      aria-current={active ? "true" : undefined}
                      className="link-quiet font-mono text-meta uppercase"
                    >
                      {t(filter)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          {visible.length > 0 ? (
            <ul className="grid gap-8 lg:grid-cols-2">
              {visible.map((project) => {
                const primary = project.categories[0];
                const cover = projectCover(project);
                const index = ordered.findIndex(
                  (item) => item.slug === project.slug,
                );

                return (
                  <li key={project.slug} className="min-w-0">
                    <ProjectCard
                      href={`/work/${project.slug}`}
                      title={project.name}
                      category={primary ? t(primary) : undefined}
                      mark={t(statusKey(project.status))}
                      summary={text(project.summary, locale)}
                      tags={project.technologies}
                      actionLabel={
                        project.status === "concept"
                          ? t("viewConcept")
                          : t("viewProject")
                      }
                      media={
                        cover ? (
                          <ProjectImage src={cover} className="h-56" />
                        ) : (
                          <ProjectVisual
                            name={project.name}
                            index={index < 0 ? 0 : index}
                          />
                        )
                      }
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-body text-muted">{t("empty")}</p>
          )}
        </Container>
      </Section>
    </main>
  );
}

function filterHref(category: "all" | ProjectCategory) {
  return category === "all" ? "/work" : `/work?category=${category}`;
}

function statusKey(status: "concept" | "in-progress" | "shipped") {
  if (status === "in-progress") {
    return "statusInProgress" as const;
  }

  if (status === "shipped") {
    return "statusShipped" as const;
  }

  return "statusConcept" as const;
}
