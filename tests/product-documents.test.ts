import { describe, expect, it, vi } from "vitest";
import { localeToApiLanguage } from "../lib/i18n/config";
import {
  getActivePlanCodes,
  paginateUntilIncomplete,
  prioritizePlanOption,
  selectCurrentDocuments,
} from "../lib/product-documents/product-documents.mapper";
import type { ProductDocument } from "../lib/product-documents/product-documents.types";
import { planCatalog } from "../lib/plans/plan-catalog";

const document = (overrides: Partial<ProductDocument> = {}): ProductDocument => ({
  documentId: "1",
  issuer: "BDIL",
  month: 1,
  year: 2026,
  planCode: "MEPRO",
  planOptionCode: "ALL",
  documentType: "TOB",
  language: "EN",
  effectiveDate: "2026-01-01T00:00:00Z",
  version: 1,
  status: "Active",
  modifiedDate: "2026-01-01T00:00:00Z",
  ...overrides,
});

describe("locale mapping", () => {
  it("maps locales to the API language codes", () => {
    expect(localeToApiLanguage).toEqual({ en: "EN", es: "SP", pt: "PT" });
  });
});

describe("document mapping", () => {
  it("groups and deduplicates plan codes", () => {
    expect(getActivePlanCodes([document(), document({ documentId: "2" }), document({ planCode: "GCPRO" })])).toEqual(["MEPRO", "GCPRO"]);
  });

  it("selects the newest effective document", () => {
    const selected = selectCurrentDocuments([
      document(),
      document({ documentId: "new", effectiveDate: "02/01/2026" }),
    ]);
    expect(selected[0].documentId).toBe("new");
  });

  it("uses version and modifiedDate as tie breakers", () => {
    const selected = selectCurrentDocuments([
      document(),
      document({ documentId: "v2", version: 2 }),
      document({ documentId: "latest", version: 2, modifiedDate: "02/01/2026" }),
    ]);
    expect(selected[0].documentId).toBe("latest");
  });

  it("prioritizes a specific option over ALL", () => {
    const selected = prioritizePlanOption([
      document(),
      document({ documentId: "specific", planOptionCode: "A" }),
    ], "A");
    expect(selected[0].documentId).toBe("specific");
  });

  it("returns ALL as fallback when the option is absent", () => {
    const selected = prioritizePlanOption([document()], "B");
    expect(selected[0].planOptionCode).toBe("ALL");
  });
});

describe("pagination", () => {
  it("continues until a page is incomplete", async () => {
    const fetchPage = vi.fn(async (page: number) => page < 2 ? [page, page] : [page]);
    const result = await paginateUntilIncomplete(fetchPage, 2);
    expect(result).toEqual([0, 0, 1, 1, 2]);
    expect(fetchPage).toHaveBeenCalledTimes(3);
  });

  it("handles an empty first response", async () => {
    expect(await paginateUntilIncomplete(async () => [], 100)).toEqual([]);
  });
});

describe("visual catalog", () => {
  it("does not expose an unknown planCode", () => {
    expect(planCatalog.find((plan) => plan.planCode === "UNKNOWN")).toBeUndefined();
  });
});
