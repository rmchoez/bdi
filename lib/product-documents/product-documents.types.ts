import type { ApiLanguage } from "../i18n/config";

export type DocumentType = "TOB" | "COC" | "SBC" | "SPD" | string;

export type ProductDocument = {
  documentId: string;
  issuer: string;
  month: number;
  year: number;
  planCode: string;
  planOptionCode: string;
  documentType: DocumentType;
  language: ApiLanguage;
  effectiveDate: string;
  version: number | string;
  audience?: string;
  status: "Active" | "Deprecated" | string;
  createdBy?: string;
  modifiedBy?: string;
  createdDate?: string;
  modifiedDate: string;
  displayName?: string;
};

export type DocumentSearchRequest = {
  issuer?: string;
  language?: ApiLanguage;
  page: number;
  pageSize: number;
  planCode?: string;
  planOptionCode?: string;
  effectiveDate?: string;
  documentType?: DocumentType;
};

export type DocumentSearchResponse =
  | ProductDocument[]
  | { items?: ProductDocument[]; content?: ProductDocument[]; results?: ProductDocument[] };

export type TemporaryDocumentUrl = {
  url: string;
};
