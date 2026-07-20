import "server-only";

import { unstable_cache } from "next/cache";
import type { ApiLanguage, Locale } from "../i18n/config";
import { getLocalizedPlans, getPlanBySlug } from "./plan-catalog";
import { getActivePlanCodes, prioritizePlanOption, selectCurrentDocuments } from "../product-documents/product-documents.mapper";
import { hasProductDocumentsConfiguration, searchAllDocuments } from "../product-documents/product-documents.client";

const searchCached = unstable_cache(
  async (language: ApiLanguage, planCode?: string) =>
    searchAllDocuments({ issuer: "BDIL", language, ...(planCode ? { planCode } : {}) }),
  ["product-documents-search"],
  { revalidate: 300 },
);

export async function getAvailablePlans(locale: Locale, language: ApiLanguage) {
  const catalogPlans = getLocalizedPlans(locale, language);
  if (!hasProductDocumentsConfiguration()) return { plans: catalogPlans, source: "catalog-mock" as const };
  try {
    const documents = selectCurrentDocuments(await searchCached(language));
    const activeCodes = new Set(getActivePlanCodes(documents));
    return { plans: catalogPlans.filter((plan) => activeCodes.has(plan.planCode)), source: "api" as const };
  } catch {
    return { plans: catalogPlans, source: "api-unavailable" as const };
  }
}

export async function getPlanDetails(language: ApiLanguage, slug: string, option?: string) {
  const plan = getPlanBySlug(language, slug);
  if (!plan) return null;
  if (!hasProductDocumentsConfiguration()) return { plan, documents: [], source: "catalog-mock" as const };
  try {
    const documents = prioritizePlanOption(selectCurrentDocuments(await searchCached(language, plan.planCode)), option);
    return { plan, documents, source: "api" as const };
  } catch {
    return { plan, documents: [], source: "api-unavailable" as const };
  }
}
