import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "white";
  showArrow?: boolean;
};

export function Button({
  children,
  className = "",
  variant = "primary",
  showArrow = true,
  ...props
}: ButtonProps) {
  return (
    <a className={`button ${variant} ${className}`.trim()} {...props}>
      {children}
      {showArrow && <ArrowRight size={19} aria-hidden="true" />}
    </a>
  );
}
