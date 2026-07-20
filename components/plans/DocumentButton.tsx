"use client";

import { useState } from "react";

export function DocumentButton({ documentId, label }: { documentId: string; label: string }) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const openDocument = async () => {
    setState("loading");
    try {
      const response = await fetch(`/api/documents/${encodeURIComponent(documentId)}/url`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unavailable");
      const { url } = await response.json() as { url: string };
      window.open(url, "_blank", "noopener,noreferrer");
      setState("idle");
    } catch {
      setState("error");
    }
  };
  return (
    <button className="document-button" onClick={openDocument} disabled={state === "loading"}>
      {state === "loading" ? "Loading…" : state === "error" ? "Try again" : label}
    </button>
  );
}
