"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { PlanCard, type Plan } from "../ui/PlanCard";
import { SectionHeading } from "../ui/SectionHeading";

export function PlansSection({ plans, compareHref }: { plans: Plan[]; compareHref: string }) {
  const [start, setStart] = useState(0);
  const visiblePlans = Array.from({ length: 3 }, (_, offset) => plans[(start + offset) % plans.length]);

  return (
    <section className="plans section" id="plans">
      <div className="container">
        <SectionHeading
          title={<>Explore our<br /><em>most popular plans</em></>}
        />
        <div className="plan-carousel">
          <button className="plan-arrow plan-arrow-left" onClick={() => setStart((current) => (current - 1 + plans.length) % plans.length)} aria-label="Previous plans">
            <ChevronLeft />
          </button>
          <div className="plan-grid">
          {visiblePlans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
          </div>
          <button className="plan-arrow plan-arrow-right" onClick={() => setStart((current) => (current + 1) % plans.length)} aria-label="Next plans">
            <ChevronRight />
          </button>
        </div>
        <div className="plans-help">
          <img src="/icon-help.png" alt="" />
          <div>
            <h3>Need help<br />deciding?</h3>
            <a href={compareHref}>Compare all plans</a>
          </div>
        </div>
      </div>
    </section>
  );
}
