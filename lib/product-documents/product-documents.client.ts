import "server-only";

import type {
  DocumentSearchRequest,
  DocumentSearchResponse,
  ProductDocument,
  TemporaryDocumentUrl,
} from "./product-documents.types";
import { paginateUntilIncomplete } from "./product-documents.mapper";

type TokenCache = { token: string; expiresAt: number };
let tokenCache: TokenCache | null = null;

const transientStatuses = new Set([429, 500, 502, 503, 504]);

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing server configuration: ${name}`);
  return value;
}

async function getAccessToken(forceRefresh = false) {
  if (!forceRefresh && tokenCache && tokenCache.expiresAt - 60_000 > Date.now()) return tokenCache.token;

  const body = new URLSearchParams({
    client_id: requiredEnv("AZURE_CLIENT_ID"),
    client_secret: requiredEnv("AZURE_CLIENT_SECRET"),
    scope: requiredEnv("AZURE_API_SCOPE"),
    grant_type: "client_credentials",
  });
  const response = await fetch(requiredEnv("AZURE_TOKEN_URL"), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Authentication failed (${response.status})`);
  const data = await response.json() as { access_token: string; expires_in?: number };
  tokenCache = { token: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return tokenCache.token;
}

async function apiFetch<T>(path: string, init?: RequestInit, retry = 0, refreshed = false): Promise<T> {
  const token = await getAccessToken(refreshed);
  const response = await fetch(`${requiredEnv("PRODUCT_DOCUMENTS_API_URL").replace(/\/$/, "")}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...init?.headers },
    cache: "no-store",
  });

  if (response.status === 401 && !refreshed) {
    tokenCache = null;
    return apiFetch<T>(path, init, retry, true);
  }
  if (transientStatuses.has(response.status) && retry < 2) {
    const retryAfter = Number(response.headers.get("Retry-After") ?? 0) * 1000;
    const delay = retryAfter || 300 * 2 ** retry;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return apiFetch<T>(path, init, retry + 1, refreshed);
  }
  if (!response.ok) throw new Error(`Product Documents API failed (${response.status})`);
  return response.json() as Promise<T>;
}

function responseItems(response: DocumentSearchResponse): ProductDocument[] {
  if (Array.isArray(response)) return response;
  return response.items ?? response.content ?? response.results ?? [];
}

export async function searchAllDocuments(
  request: Omit<DocumentSearchRequest, "page" | "pageSize">,
  pageSize = 100,
) {
  return paginateUntilIncomplete(async (page) => {
    const response = await apiFetch<DocumentSearchResponse>("/documents/search", {
      method: "POST",
      body: JSON.stringify({ ...request, page, pageSize }),
    });
    return responseItems(response);
  }, pageSize);
}

export async function getTemporaryDocumentUrl(documentId: string) {
  const response = await apiFetch<string | TemporaryDocumentUrl>(
    `/documents/${encodeURIComponent(documentId)}/url`,
    { method: "GET" },
  );
  return typeof response === "string" ? { url: response } : response;
}

export function hasProductDocumentsConfiguration() {
  return ["AZURE_TOKEN_URL", "AZURE_CLIENT_ID", "AZURE_CLIENT_SECRET", "AZURE_API_SCOPE", "PRODUCT_DOCUMENTS_API_URL"]
    .every((name) => Boolean(process.env[name]));
}
