import { Sparkles } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  if (!light) {
    return (
      <a className="logo official-logo" href="#top" aria-label="Best Doctors home">
        <img src="/bdi-logo.png" alt="Best Doctors Insurance" />
      </a>
    );
  }

  return (
    <a className="logo logo-light" href="#top" aria-label="Best Doctors home">
      <span className="logo-mark"><Sparkles size={24} /></span>
      <span className="logo-name">Best Doctors<sup>®</sup><small>INSURANCE</small></span>
    </a>
  );
}
