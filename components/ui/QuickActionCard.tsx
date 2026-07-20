import type { ReactNode } from "react";

type QuickActionCardProps = {
  title: string;
  children: ReactNode;
  href: string;
};

export function QuickActionCard({ title, children, href }: QuickActionCardProps) {
  return (
    <a className="quick-action-card" href={href}>
      <strong>{title}</strong>
      <span>{children}</span>
    </a>
  );
}
