import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  getProject,
  hasCaseStudy,
  hasCopy,
  listProjects,
  projectCover,
  type Project,
} from "@/content/projects";
import { text, type Localized } from "@/content/profile";
import { ProjectImage } from "@/features/home/project-image";
import { ProjectVisual } from "@/features/home/project-visual";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    listProjects().map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  const path = `/work/${project.slug}`;

  return {
    title: project.name,
    description: text(project.overview, locale),
    alternates: {
      canonical: locale === "en" ? `/en${path}` : path,
      languages: {
        es: path,
        en: `/en${path}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  const t = await getTranslations("Project");
  const work = await getTranslations("Work");

  if (!project) {
    notFound();
  }

  const index = listProjects().findIndex((item) => item.slug === project.slug);
  const cover = projectCover(project);
  const gallery = project.screenshots.slice(cover ? 1 : 0);
  const features = project.features.filter((item) => hasCopy(item, locale));
  const decisions = project.decisions.filter((item) => hasCopy(item, locale));
  const showNote =
    project.status === "concept" && !hasCaseStudy(project, locale);

  return (
    <main>
      <Section>
        <Container className="flex flex-col gap-12">
          <Link
            href="/work"
            className="link-quiet font-mono text-meta uppercase"
          >
            {t("back")}
          </Link>
          {cover ? (
            <ProjectImage
              src={cover}
              alt={text(
                project.screenshots[0]?.alt ?? { es: "", en: "" },
                locale,
              )}
              className="max-h-[36rem] border border-border"
            />
          ) : (
            <ProjectVisual
              name={project.name}
              index={index < 0 ? 0 : index}
              className="min-h-80 border border-border"
            />
          )}
          <header className="flex max-w-[var(--measure)] flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="accent">{work(statusKey(project.status))}</Badge>
              {project.categories.map((category) => (
                <Badge key={category}>{work(category)}</Badge>
              ))}
            </div>
            <h1 className="font-serif text-display text-balance">
              {project.name}
            </h1>
          </header>
          {hasCopy(project.overview, locale) ? (
            <CaseBlock title={t("overview")}>
              <p className="max-w-[var(--measure)] font-serif text-heading text-balance">
                {text(project.overview, locale)}
              </p>
            </CaseBlock>
          ) : null}
          {gallery.length > 0 ? (
            <CaseBlock title={t("screenshots")}>
              <ul className="grid gap-6">
                {gallery.map((shot) => (
                  <li key={shot.src}>
                    <ProjectImage
                      src={shot.src}
                      alt={text(shot.alt, locale)}
                      className="border border-border"
                    />
                  </li>
                ))}
              </ul>
            </CaseBlock>
          ) : null}
          <CopyBlock
            title={t("problem")}
            copy={project.problem}
            locale={locale}
          />
          <CopyBlock
            title={t("solution")}
            copy={project.solution}
            locale={locale}
          />
          {features.length > 0 ? (
            <CaseBlock title={t("features")}>
              <ul className="flex max-w-[var(--measure)] flex-col gap-3">
                {features.map((feature) => (
                  <li key={text(feature, locale)} className="text-body">
                    {text(feature, locale)}
                  </li>
                ))}
              </ul>
            </CaseBlock>
          ) : null}
          <CopyBlock
            title={t("architecture")}
            copy={project.architecture}
            locale={locale}
          />
          {decisions.length > 0 ? (
            <CaseBlock title={t("decisions")}>
              <ul className="flex max-w-[var(--measure)] flex-col gap-4">
                {decisions.map((decision) => (
                  <li key={text(decision, locale)} className="text-body">
                    {text(decision, locale)}
                  </li>
                ))}
              </ul>
            </CaseBlock>
          ) : null}
          {project.technologies.length > 0 ? (
            <CaseBlock title={t("stack")}>
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </CaseBlock>
          ) : null}
          {project.languages.length > 0 ? (
            <CaseBlock title={t("languages")}>
              <ul className="flex flex-wrap gap-2">
                {project.languages.map((language) => (
                  <li key={language}>
                    <Badge>{language}</Badge>
                  </li>
                ))}
              </ul>
            </CaseBlock>
          ) : null}
          {project.demoUrl || project.repositoryUrl ? (
            <div className="flex flex-wrap gap-3">
              {project.demoUrl ? (
                <ButtonLink href={project.demoUrl}>{t("demo")}</ButtonLink>
              ) : null}
              {project.repositoryUrl ? (
                <ButtonLink href={project.repositoryUrl} variant="secondary">
                  {t("repository")}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
          {showNote ? (
            <p className="max-w-[var(--measure)] border-t border-border pt-8 text-body text-muted">
              {t("conceptNote")}
            </p>
          ) : null}
        </Container>
      </Section>
    </main>
  );
}

function CaseBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-t border-border pt-8">
      <h2 className="font-mono text-meta text-muted uppercase">{title}</h2>
      {children}
    </section>
  );
}

function CopyBlock({
  title,
  copy,
  locale,
}: {
  title: string;
  copy: Localized;
  locale: string;
}) {
  if (!hasCopy(copy, locale)) {
    return null;
  }

  return (
    <CaseBlock title={title}>
      <p className="max-w-[var(--measure)] text-body">{text(copy, locale)}</p>
    </CaseBlock>
  );
}

function statusKey(status: Project["status"]) {
  if (status === "in-progress") {
    return "statusInProgress" as const;
  }

  if (status === "shipped") {
    return "statusShipped" as const;
  }

  return "statusConcept" as const;
}
