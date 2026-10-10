import { ProjectCard } from "@/components/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  featuredProjects,
  projectCover,
  type ProjectCategory,
  type ProjectStatus,
} from "@/content/projects";
import {
  education,
  experience,
  heroStack,
  profileLinks,
  skillGroups,
  text,
  type Localized,
} from "@/content/profile";
import { ProjectImage } from "@/features/home/project-image";
import { ProjectVisual } from "@/features/home/project-visual";
import { cn } from "@/lib/cn";

const sectionRule = "scroll-mt-56 border-t border-border md:scroll-mt-24";
const knowledgeIds = new Set(["web", "backend", "mobile"]);

type HomeViewProps = {
  locale: string;
  copy: {
    name: string;
    title: string;
    subtitle: string;
    viewExperience: string;
    downloadCv: string;
    contact: string;
    technologiesLabel: string;
    experienceEyebrow: string;
    experienceTitle: string;
    engineeringEyebrow: string;
    engineeringBody: string;
    signature: string;
    workEyebrow: string;
    workTitle: string;
    workDescription: string;
    viewProject: string;
    viewConcept: string;
    categoryLabel: Record<ProjectCategory, string>;
    statusLabel: Record<ProjectStatus, string>;
    skillsEyebrow: string;
    skillsTitle: string;
    expandingEyebrow: string;
    expandingTitle: string;
    expandingBody: string;
    contactEyebrow: string;
    contactTitle: string;
    contactBody: string;
    emailLabel: string;
    linkedinLabel: string;
    githubLabel: string;
    educationEyebrow: string;
    educationTitle: string;
  };
};

export function HomeView({ locale, copy }: HomeViewProps) {
  const channels = [
    profileLinks.email
      ? {
          label: copy.emailLabel,
          value: profileLinks.email,
          href: `mailto:${profileLinks.email}`,
        }
      : null,
    profileLinks.linkedin
      ? {
          label: copy.linkedinLabel,
          value: "LinkedIn",
          href: profileLinks.linkedin,
        }
      : null,
    profileLinks.github
      ? {
          label: copy.githubLabel,
          value: "AlejandroM12",
          href: profileLinks.github,
        }
      : null,
  ].filter((channel) => channel !== null);
  const featured = featuredProjects();
  const engineering = skillGroups.find((group) => group.id === "engineering");
  const expanding = skillGroups.find((group) => group.id === "expanding");
  const knowledge = skillGroups.filter((group) => knowledgeIds.has(group.id));

  return (
    <>
      <Section className="pb-[calc(var(--space-section)*0.7)]">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div>
              <p className="rise font-mono text-meta text-muted uppercase">
                {copy.name}
              </p>
              <h1 className="rise rise-delay-1 mt-6 max-w-[14ch] font-serif text-display text-balance">
                {copy.title}
              </h1>
              <p className="rise rise-delay-2 mt-6 max-w-[var(--measure)] text-body text-muted">
                {copy.subtitle}
              </p>
              <div className="rise rise-delay-3 mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/#experience">
                  {copy.viewExperience}
                </ButtonLink>
                {profileLinks.cvHref ? (
                  <ButtonLink
                    href={profileLinks.cvHref}
                    variant="secondary"
                    download
                  >
                    {copy.downloadCv}
                  </ButtonLink>
                ) : null}
                <ButtonLink href="/#contact" variant="secondary">
                  {copy.contact}
                </ButtonLink>
              </div>
            </div>
            <div
              aria-label={copy.technologiesLabel}
              className="rise rise-delay-2 flex flex-col gap-8 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-8"
            >
              {heroStack.map((group) => (
                <div key={group.id}>
                  <p className="font-mono text-meta text-muted uppercase">
                    {text(group.label, locale)}
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item.en}
                        className={cn(
                          "font-mono text-meta uppercase",
                          group.id === "core"
                            ? "text-foreground"
                            : "text-muted",
                        )}
                      >
                        {text(item, locale)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="experience" className={sectionRule}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={copy.experienceEyebrow}
            title={copy.experienceTitle}
          />
          <FactList
            items={experience.map((item) => ({
              id: item.id,
              title: item.organization,
              detail: [text(item.role, locale), text(item.period, locale)]
                .filter(Boolean)
                .join(" · "),
              summary: text(item.summary, locale),
            }))}
          />
        </Container>
      </Section>

      <Section id="education" className={sectionRule}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={copy.educationEyebrow}
            title={copy.educationTitle}
          />
          <FactList
            items={education.map((item) => ({
              id: item.id,
              title: item.institution,
              detail: [text(item.credential, locale), text(item.period, locale)]
                .filter(Boolean)
                .join(" · "),
              summary: "",
            }))}
          />
        </Container>
      </Section>

      <Section id="engineering" className={sectionRule}>
        <Container className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
          <p className="font-mono text-meta text-muted uppercase">
            {copy.engineeringEyebrow}
          </p>
          <div className="max-w-[40rem]">
            <h2 className="font-serif text-heading text-balance">
              {copy.engineeringBody}
            </h2>
            <p className="mt-8 font-mono text-meta text-muted uppercase">
              {copy.signature}
            </p>
            {engineering ? (
              <ItemList items={engineering.items} locale={locale} />
            ) : null}
          </div>
        </Container>
      </Section>

      <Section id="work" className={sectionRule}>
        <Container className="flex flex-col gap-12">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow={copy.workEyebrow}
              title={copy.workTitle}
              description={copy.workDescription}
            />
            <p className="pb-1 font-mono text-meta text-muted">
              {String(featured.length).padStart(2, "0")}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {featured.map((project, index) => {
              const category = project.categories[0];
              const cover = projectCover(project);

              return (
                <ProjectCard
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  title={project.name}
                  category={category ? copy.categoryLabel[category] : undefined}
                  mark={copy.statusLabel[project.status]}
                  summary={text(project.summary, locale)}
                  tags={project.technologies}
                  actionLabel={
                    project.status === "concept"
                      ? copy.viewConcept
                      : copy.viewProject
                  }
                  media={
                    cover ? (
                      <ProjectImage src={cover} className="h-56" />
                    ) : (
                      <ProjectVisual name={project.name} index={index} />
                    )
                  }
                />
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="skills" className={sectionRule}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={copy.skillsEyebrow}
            title={copy.skillsTitle}
          />
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {knowledge.map((group) => (
              <li key={group.id} className="border-t border-border pt-6">
                <h3 className="font-mono text-meta text-muted uppercase">
                  {text(group.label, locale)}
                </h3>
                <ItemList items={group.items} locale={locale} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {expanding ? (
        <Section id="applied-ai" className={sectionRule}>
          <Container className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
            <p className="font-mono text-meta text-muted uppercase">
              {copy.expandingEyebrow}
            </p>
            <div className="max-w-[40rem]">
              <h2 className="font-serif text-title text-balance">
                {copy.expandingTitle}
              </h2>
              <p className="mt-6 max-w-[var(--measure)] text-body text-muted">
                {copy.expandingBody}
              </p>
              <ItemList items={expanding.items} locale={locale} />
            </div>
          </Container>
        </Section>
      ) : null}

      <Section id="contact" className={sectionRule}>
        <Container
          className={cn(
            "grid gap-10",
            channels.length > 0 && "lg:grid-cols-[0.8fr_1.2fr] lg:items-end",
          )}
        >
          <SectionHeading
            eyebrow={copy.contactEyebrow}
            title={copy.contactTitle}
            description={copy.contactBody}
          />
          {channels.length > 0 ? (
            <ul className="border-t border-border">
              {channels.map((channel) => (
                <li key={channel.label} className="border-b border-border py-6">
                  <a
                    href={channel.href}
                    className="flex flex-col"
                    {...(channel.href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    <span className="font-mono text-meta text-muted uppercase">
                      {channel.label}
                    </span>
                    <span className="mt-2 font-serif text-heading">
                      {channel.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </Section>
    </>
  );
}

function FactList({
  items,
}: {
  items: readonly {
    id: string;
    title: string;
    detail: string;
    summary: string;
  }[];
}) {
  return (
    <ol className="border-t border-border">
      {items.map((item, index) => (
        <li
          key={item.id}
          className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-border py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6"
        >
          <span className="pt-2 font-mono text-meta text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="font-serif text-heading">{item.title}</h3>
            {item.detail ? (
              <p className="mt-3 font-mono text-meta text-muted uppercase">
                {item.detail}
              </p>
            ) : null}
            {item.summary ? (
              <p className="mt-4 max-w-[var(--measure)] text-body text-muted">
                {item.summary}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

function ItemList({
  items,
  locale,
}: {
  items: readonly Localized[];
  locale: string;
}) {
  return (
    <ul className="mt-5 flex flex-col gap-2">
      {items.map((item) => (
        <li key={item.en} className="font-serif text-subheading">
          {text(item, locale)}
        </li>
      ))}
    </ul>
  );
}
