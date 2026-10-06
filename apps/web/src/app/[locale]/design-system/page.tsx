import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/layout/navigation";
import { ProjectCard } from "@/components/project-card";
import { SocialLinks } from "@/components/social-links";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "background", className: "bg-background", role: "roleBackground" },
  { name: "surface", className: "bg-surface", role: "roleSurface" },
  { name: "foreground", className: "bg-foreground", role: "roleForeground" },
  { name: "muted", className: "bg-muted", role: "roleMuted" },
  { name: "accent", className: "bg-accent", role: "roleAccent" },
  {
    name: "accent-pressed",
    className: "bg-accent-pressed",
    role: "roleAccentPressed",
  },
  { name: "border", className: "bg-border", role: "roleBorder" },
  {
    name: "border-strong",
    className: "bg-border-strong",
    role: "roleBorderStrong",
  },
] as const;

const spaces = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
  "16",
  "20",
  "24",
  "32",
] as const;

const breakpoints = [
  { name: "sm", value: "40rem", detail: "bpSm" },
  { name: "md", value: "48rem", detail: "bpMd" },
  { name: "lg", value: "64rem", detail: "bpLg" },
  { name: "xl", value: "80rem", detail: "bpXl" },
  { name: "2xl", value: "96rem", detail: "bp2xl" },
] as const;

export default async function DesignSystemPage() {
  const t = await getTranslations("DesignSystem");
  const nav = await getTranslations("Nav");

  const typeSteps = [
    {
      token: "display",
      className: "font-serif text-display text-balance",
      sample: t("sampleDisplay"),
    },
    {
      token: "title",
      className: "font-serif text-title text-balance",
      sample: t("sampleTitle"),
    },
    {
      token: "heading",
      className: "font-serif text-heading text-balance",
      sample: t("sampleHeading"),
    },
    {
      token: "subheading",
      className: "font-serif text-subheading",
      sample: t("sampleSubheading"),
    },
    {
      token: "body",
      className: "max-w-[var(--measure)] text-body",
      sample: t("sampleBody"),
    },
    {
      token: "small",
      className: "max-w-[var(--measure)] text-small",
      sample: t("sampleSmall"),
    },
    {
      token: "meta",
      className: "font-mono text-meta text-muted uppercase",
      sample: t("sampleMeta"),
    },
  ] as const;

  return (
    <main>
      <Section>
        <Container className="flex flex-col gap-24">
          <SectionHeading
            as="h1"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />

          <Specimen
            id="color"
            title={t("color")}
            description={t("colorDescription")}
          >
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {swatches.map((swatch) => (
                <li key={swatch.name} className="flex flex-col gap-2">
                  <div
                    className={`h-16 border border-border-strong ${swatch.className}`}
                  />
                  <p className="font-mono text-meta text-muted uppercase">
                    {swatch.name}
                  </p>
                  <p className="text-small">{t(swatch.role)}</p>
                </li>
              ))}
            </ul>
          </Specimen>

          <Specimen
            id="tipo"
            title={t("type")}
            description={t("typeDescription")}
          >
            <ul className="grid gap-8 border-b border-border pb-10 md:grid-cols-3">
              <li>
                <p className="font-serif text-heading">Newsreader</p>
                <p className="mt-2 font-mono text-meta text-muted uppercase">
                  serif
                </p>
              </li>
              <li>
                <p className="text-heading">Geist</p>
                <p className="mt-2 font-mono text-meta text-muted uppercase">
                  sans
                </p>
              </li>
              <li>
                <p className="font-mono text-heading">Geist Mono</p>
                <p className="mt-2 font-mono text-meta text-muted uppercase">
                  mono
                </p>
              </li>
            </ul>
            <ul className="flex max-w-[var(--measure)] flex-col">
              {typeSteps.map((step) => (
                <li key={step.token} className="border-b border-border py-6">
                  <p className="font-mono text-meta text-muted uppercase">
                    {step.token}
                  </p>
                  <p className={`mt-3 ${step.className}`}>{step.sample}</p>
                </li>
              ))}
              <li className="py-6">
                <p className="font-mono text-meta text-muted uppercase">
                  italic
                </p>
                <p className="mt-3 font-serif text-heading italic">
                  {t("sampleItalic")}
                </p>
              </li>
            </ul>
          </Specimen>

          <Specimen
            id="espaciado"
            title={t("spacing")}
            description={t("spacingDescription")}
          >
            <ul className="flex flex-col gap-3">
              {spaces.map((step) => (
                <li
                  key={step}
                  className="grid grid-cols-[4.5rem_1fr] items-center gap-4"
                >
                  <p className="font-mono text-meta text-muted uppercase">
                    {step}
                  </p>
                  <div
                    className="h-3 bg-foreground"
                    style={{ width: `var(--space-${step})` }}
                  />
                </li>
              ))}
            </ul>
            <dl className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
              <TokenFact
                token="container"
                value="72rem"
                detail={t("layoutContainer")}
              />
              <TokenFact
                token="measure"
                value="66ch"
                detail={t("layoutMeasure")}
              />
              <TokenFact
                token="space-section"
                value="clamp"
                detail={t("layoutSection")}
              />
              <TokenFact
                token="gutter"
                value="1.5rem / 2.5rem"
                detail={t("layoutGutter")}
              />
            </dl>
          </Specimen>

          <Specimen
            id="breakpoints"
            title={t("breakpoints")}
            description={t("breakpointsDescription")}
          >
            <ul className="border-t border-border">
              {breakpoints.map((item) => (
                <li
                  key={item.name}
                  className="grid gap-2 border-b border-border py-5 sm:grid-cols-[6rem_7rem_1fr] sm:items-baseline"
                >
                  <p className="font-mono text-meta text-muted uppercase">
                    {item.name}
                  </p>
                  <p className="font-mono text-small">{item.value}</p>
                  <p className="text-small text-muted">{t(item.detail)}</p>
                </li>
              ))}
            </ul>
          </Specimen>

          <Specimen
            id="radio"
            title={t("radius")}
            description={t("radiusDescription")}
          >
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              <RadiusSample
                name="none"
                className="rounded-none"
                detail={t("radiusNone")}
              />
              <RadiusSample
                name="xs"
                className="rounded-xs"
                detail={t("radiusXs")}
              />
              <RadiusSample
                name="sm"
                className="rounded-sm"
                detail={t("radiusSm")}
              />
              <RadiusSample
                name="md"
                className="rounded-md"
                detail={t("radiusMd")}
              />
              <RadiusSample
                name="full"
                className="rounded-full"
                detail={t("radiusFull")}
              />
            </ul>
            <ul className="grid gap-6 sm:grid-cols-2">
              <li className="flex flex-col gap-3">
                <div className="h-24 border border-border bg-surface shadow-sm" />
                <p className="font-mono text-meta text-muted uppercase">
                  {t("shadowSm")}
                </p>
              </li>
              <li className="flex flex-col gap-3">
                <div className="h-24 border border-border bg-surface shadow-md" />
                <p className="font-mono text-meta text-muted uppercase">
                  {t("shadowMd")}
                </p>
              </li>
            </ul>
          </Specimen>

          <Specimen
            id="estados"
            title={t("states")}
            description={t("statesDescription")}
          >
            <div className="flex flex-wrap gap-3">
              <Button>{t("primary")}</Button>
              <Button variant="secondary">{t("secondary")}</Button>
              <Button variant="ghost">{t("ghost")}</Button>
              <Button disabled>{t("disabled")}</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>{t("neutral")}</Badge>
              <Badge tone="accent">{t("accent")}</Badge>
            </div>
            <div className="flex flex-wrap gap-x-5">
              <a
                href="#estados"
                className="link-quiet text-small"
                aria-current="page"
              >
                {t("current")}
              </a>
              <a href="#estados" className="link-quiet text-small">
                {t("idle")}
              </a>
            </div>
          </Specimen>

          <Specimen
            id="navegacion"
            title={t("navigation")}
            description={t("navigationDescription")}
          >
            <div className="border border-border">
              <Navigation
                sticky={false}
                landmark={false}
                label={t("navigation")}
                items={[
                  { href: "/", label: nav("home") },
                  { href: "#experiencia", label: nav("experience") },
                  { href: "#ingenieria", label: nav("engineering") },
                  { href: "#experimentos", label: nav("experiments") },
                  { href: "#conocimiento", label: nav("skills") },
                  { href: "#contacto", label: nav("contact") },
                ]}
              />
            </div>
          </Specimen>

          <Specimen
            id="proyecto"
            title={t("project")}
            description={t("projectDescription")}
          >
            <ProjectCard
              href="#proyecto"
              title={t("projectTitle")}
              summary={t("projectSummary")}
              year={t("projectYear")}
              tags={["Next.js", "TypeScript"]}
            />
          </Specimen>

          <Specimen
            id="enlaces"
            title={t("social")}
            description={t("socialDescription")}
          >
            <SocialLinks
              label={t("social")}
              items={[
                { label: "GitHub", href: "#enlaces" },
                { label: "LinkedIn", href: "#enlaces" },
              ]}
            />
          </Specimen>
        </Container>
      </Section>
    </main>
  );
}

function Specimen({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="flex scroll-mt-24 flex-col gap-8">
      <SectionHeading as="h2" title={title} description={description} />
      {children}
    </div>
  );
}

function TokenFact({
  token,
  value,
  detail,
}: {
  token: string;
  value: string;
  detail: string;
}) {
  return (
    <div>
      <dt className="font-mono text-meta text-muted uppercase">{token}</dt>
      <dd className="mt-2 font-mono text-small">{value}</dd>
      <dd className="mt-1 text-small text-muted">{detail}</dd>
    </div>
  );
}

function RadiusSample({
  name,
  className,
  detail,
}: {
  name: string;
  className: string;
  detail: string;
}) {
  return (
    <li className="flex flex-col gap-3">
      <div
        className={`size-16 border border-border-strong bg-surface ${className}`}
      />
      <p className="font-mono text-meta text-muted uppercase">{name}</p>
      <p className="text-small text-muted">{detail}</p>
    </li>
  );
}
