import { getRequestConfig } from "next-intl/server";
import { isLocale, routing, type Locale } from "./routing";

const catalogs: Record<
  Locale,
  () => Promise<{ default: Record<string, unknown> }>
> = {
  es: () => import("../../messages/es.json"),
  en: () => import("../../messages/en.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await catalogs[locale]()).default,
  };
});
