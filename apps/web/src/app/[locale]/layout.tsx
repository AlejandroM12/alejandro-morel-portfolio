import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { heroTechnologies, profileLinks, text } from "@/content/profile";
import { isLocale, routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import "../globals.css";

const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const serif = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s — ${t("title")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const home = await getTranslations({ locale, namespace: "Home" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alejandro Morel",
    jobTitle: home("jobTitle"),
    description: home("subtitle"),
    knowsAbout: heroTechnologies.map((item) => text(item, locale)),
    ...(profileLinks.email ? { email: profileLinks.email } : {}),
    ...(profileLinks.linkedin ? { sameAs: [profileLinks.linkedin] } : {}),
  };

  return (
    <html
      lang={locale}
      className={cn(sans.variable, serif.variable, mono.variable)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-body text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SiteHeader />
            <div id="content" className="flex flex-1 flex-col">
              {children}
            </div>
            <SiteFooter />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
