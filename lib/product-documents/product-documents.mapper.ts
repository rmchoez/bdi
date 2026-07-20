import type { ProductDocument } from "./product-documents.types";

function parseUsDate(value?: string) {
  if (!value) return 0;
  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);
  if (match) return Date.UTC(Number(match[3]), Number(match[1]) - 1, Number(match[2]));
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function numericVersion(value?: string | number) {
  if (typeof value === "number") return value;
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function documentIdentity(document: ProductDocument) {
  return [
    document.planCode,
    document.planOptionCode ?? "ALL",
    document.documentType,
    document.language,
  ].join("|");
}

export function selectCurrentDocuments(documents: ProductDocument[]) {
  const selected = new Map<string, ProductDocument>();
  for (const candidate of documents) {
    const key = documentIdentity(candidate);
    const current = selected.get(key);
    if (!current) {
      selected.set(key, candidate);
      continue;
    }
    const dateDifference = parseUsDate(candidate.effectiveDate) - parseUsDate(current.effectiveDate);
    const versionDifference = numericVersion(candidate.version) - numericVersion(current.version);
    const modifiedDifference = parseUsDate(candidate.modifiedDate) - parseUsDate(current.modifiedDate);
    if (dateDifference > 0 || (dateDifference === 0 && versionDifference > 0) || (dateDifference === 0 && versionDifference === 0 && modifiedDifference > 0)) {
      selected.set(key, candidate);
    }
  }
  return [...selected.values()];
}

export function getActivePlanCodes(documents: ProductDocument[]) {
  return [...new Set(documents.map((document) => document.planCode).filter(Boolean))];
}

export function prioritizePlanOption(documents: ProductDocument[], option?: string) {
  if (!option || option === "ALL") return documents;
  const groups = new Map<string, ProductDocument>();
  for (const document of documents) {
    const key = `${document.planCode}|${document.documentType}|${document.language}`;
    const current = groups.get(key);
    const exact = document.planOptionCode === option;
    const currentExact = current?.planOptionCode === option;
    if (!current || (exact && !currentExact) || (!currentExact && document.planOptionCode === "ALL")) groups.set(key, document);
  }
  return [...groups.values()];
}

export async function paginateUntilIncomplete<T>(fetchPage: (page: number, pageSize: number) => Promise<T[]>, pageSize = 100) {
  const results: T[] = [];
  for (let page = 0; ; page += 1) {
    const items = await fetchPage(page, pageSize);
    results.push(...items);
    if (items.length < pageSize) return results;
  }
}
