export const locales = ["en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];
export type ApiLanguage = "EN" | "SP" | "PT";

export const defaultLocale: Locale = "en";

export const localeToApiLanguage: Record<Locale, ApiLanguage> = {
  en: "EN",
  es: "SP",
  pt: "PT",
};

export const plansSegment: Record<Locale, string> = {
  en: "our-plans",
  es: "nuestros-planes",
  pt: "nossos-planos",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getPlansPath(locale: Locale) {
  return `/${locale}/${plansSegment[locale]}`;
}
