"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const standardProducts = [
  { top: "Medical", bottom: "Elite" },
  { top: "Premier", bottom: "Plus" },
  { top: "Premier", bottom: "Care" },
  { top: "Global", bottom: "Care" },
  { top: "Medical", bottom: "Care" },
  { top: "Medical Care", bottom: "International" },
  { top: "Medical", bottom: "Select" },
  { top: "Medical Select", bottom: "International" },
];

export function StandardProductsGrid({ showLabel, hideLabel }: {
  showLabel: string;
  hideLabel: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section className="standard-products">
      <div className="standard-products-divider">
        <span />
        <button
          type="button"
          aria-expanded={open}
          aria-controls="standard-products-grid"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? hideLabel : showLabel}
          <ChevronDown className={open ? "open" : ""} size={21} aria-hidden="true" />
        </button>
        <span />
      </div>
      {open && (
        <div className="standard-products-grid" id="standard-products-grid">
          {standardProducts.map((product) => (
            <article className="standard-product-card" key={`${product.top}-${product.bottom}`}>
              <div className="standard-product-name">
                <span>{product.top}</span>
                <strong>{product.bottom}</strong>
                <sup>™</sup>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
