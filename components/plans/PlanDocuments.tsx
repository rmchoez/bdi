import type { ProductDocument } from "../../lib/product-documents/product-documents.types";
import { DocumentButton } from "./DocumentButton";

export function PlanDocuments({ documents, title, empty, buttonLabel }: {
  documents: ProductDocument[];
  title: string;
  empty: string;
  buttonLabel: string | Record<string, string>;
}) {
  return (
    <section className="product-documents">
      <h2>{title}</h2>
      {documents.length ? (
        <div className="document-grid">
          {documents.map((document) => (
            <article key={document.documentId}>
              <div>
                <strong>{document.documentType}</strong>
                <span>
                  {document.displayName
                    ?? (typeof buttonLabel === "string" ? buttonLabel : buttonLabel[document.documentType])
                    ?? document.documentType}
                </span>
              </div>
              <DocumentButton
                documentId={document.documentId}
                label={typeof buttonLabel === "string"
                  ? buttonLabel
                  : buttonLabel[document.documentType] ?? buttonLabel.default}
              />
            </article>
          ))}
        </div>
      ) : <p className="documents-empty">{empty}</p>}
    </section>
  );
}
