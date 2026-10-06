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
  experience,
  heroTechnologies,
  profileLinks,
  skillGroups,
  text,
} from "@/content/profile";
import { ProjectImage } from "@/features/home/project-image";
import { ProjectVisual } from "@/features/home/project-visual";
import { cn } from "@/lib/cn";

const sectionRule = "scroll-mt-56 border-t border-border md:scroll-mt-24";

type HomeViewProps = {
  locale: string;
  copy: {
    name: string;
    title: string;
    subtitle: string;
    viewWork: string;
    downloadCv: string;
    contact: string;
    technologiesLabel: string;
    workEyebrow: string;
    workTitle: string;
    viewProject: string;
    viewConcept: string;
    categoryLabel: Record<ProjectCategory, string>;
    statusLabel: Record<ProjectStatus, string>;
    aboutEyebrow: string;
    aboutTitle: string;
    aboutBody: string;
    experienceEyebrow: string;
    experienceTitle: string;
    skillsEyebrow: string;
    skillsTitle: string;
    contactEyebrow: string;
    contactTitle: string;
    contactBody: string;
    emailLabel: string;
    linkedinLabel: string;
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
  ].filter((channel) => channel !== null);
  const featured = featuredProjects();
  const lead = featured[0];
  const leadCover = lead ? projectCover(lead) : null;

  return (
    <>
      <Section className="pb-[calc(var(--space-section)*0.7)]">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
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
                <ButtonLink href="/work">{copy.viewWork}</ButtonLink>
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
            <ul
              aria-label={copy.technologiesLabel}
              className="rise rise-delay-2 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-6 lg:flex-col lg:gap-3 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-8"
            >
              {heroTechnologies.map((item) => (
                <li
                  key={item.en}
                  className="font-mono text-meta text-muted uppercase"
                >
                  {text(item, locale)}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section id="work" className={sectionRule}>
        <Container className="flex flex-col gap-12">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading eyebrow={copy.workEyebrow} title={copy.workTitle} />
            <p className="pb-1 font-mono text-meta text-muted">
              {String(featured.length).padStart(2, "0")}
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {lead ? (
              <ProjectCard
                featured
                href={`/work/${lead.slug}`}
                title={lead.name}
                category={
                  lead.categories[0]
                    ? copy.categoryLabel[lead.categories[0]]
                    : undefined
                }
                mark={copy.statusLabel[lead.status]}
                summary={text(lead.summary, locale)}
                tags={lead.technologies}
                actionLabel={
                  lead.status === "concept"
                    ? copy.viewConcept
                    : copy.viewProject
                }
                media={
                  leadCover ? (
                    <ProjectImage src={leadCover} className="min-h-64" />
                  ) : (
                    <ProjectVisual name={lead.name} index={0} featured />
                  )
                }
              />
            ) : null}
            <div className="grid gap-8 lg:grid-cols-2">
              {featured.slice(1).map((project, index) => {
                const category = project.categories[0];
                const cover = projectCover(project);

                return (
                  <ProjectCard
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    title={project.name}
                    category={
                      category ? copy.categoryLabel[category] : undefined
                    }
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
                        <ProjectVisual name={project.name} index={index + 1} />
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="about" className={sectionRule}>
        <Container className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
          <p className="font-mono text-meta text-muted uppercase">
            {copy.aboutEyebrow}
          </p>
          <div className="max-w-[40rem]">
            <h2 className="font-serif text-heading text-balance">
              {copy.aboutBody}
            </h2>
            <p className="mt-8 font-mono text-meta text-muted uppercase">
              {copy.aboutTitle}
            </p>
          </div>
        </Container>
      </Section>

      <Section id="experience" className={sectionRule}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={copy.experienceEyebrow}
            title={copy.experienceTitle}
          />
          <ol className="border-t border-border">
            {experience.map((item, index) => {
              const role = text(item.role, locale);
              const detail = [role, item.period].filter(Boolean).join(" · ");

              return (
                <li
                  key={item.id}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-b border-border py-8 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-6"
                >
                  <span className="font-mono text-meta text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-heading">
                    {item.organization}
                  </h3>
                  {detail ? (
                    <p className="col-start-2 font-mono text-meta text-muted uppercase sm:col-start-3">
                      {detail}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section id="skills" className={sectionRule}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={copy.skillsEyebrow}
            title={copy.skillsTitle}
          />
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <li key={group.id} className="border-t border-border pt-6">
                <h3 className="font-mono text-meta text-muted uppercase">
                  {text(group.label, locale)}
                </h3>
                {group.items.length > 0 ? (
                  <ul className="mt-5 flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item.en} className="font-serif text-subheading">
                        {text(item, locale)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

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
