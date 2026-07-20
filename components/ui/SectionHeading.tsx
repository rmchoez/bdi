import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: string;
  align?: "center" | "left";
  light?: boolean;
};

export function SectionHeading({
  title,
  description,
  eyebrow,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === "left" ? "left" : ""}`}>
      {eyebrow && (
        <span className={`eyebrow ${light ? "light" : ""}`}>
          <span /> {eyebrow}
        </span>
      )}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
