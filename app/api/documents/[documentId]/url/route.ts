import { NextResponse } from "next/server";
import { getTemporaryDocumentUrl, hasProductDocumentsConfiguration } from "../../../../../lib/product-documents/product-documents.client";

export async function GET(_: Request, { params }: { params: Promise<{ documentId: string }> }) {
  if (!hasProductDocumentsConfiguration()) return NextResponse.json({ message: "Documents unavailable" }, { status: 503 });
  try {
    const { documentId } = await params;
    const result = await getTemporaryDocumentUrl(documentId);
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "Documents unavailable" }, { status: 502 });
  }
}
