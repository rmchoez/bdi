import { Check } from "lucide-react";
import Link from "next/link";

export type Plan = {
  name: string;
  description: string;
  features: string[];
  image: string;
  href: string;
  detailsLabel: string;
};

type PlanCardProps = {
  plan: Plan;
};

export function PlanCard({ plan }: PlanCardProps) {
  return (
    <article className="plan-card">
      <div className="plan-image">
        <img src={plan.image} alt="" />
      </div>
      <div className="plan-body">
        <h3>{plan.name}<sup>™</sup> <em>Pro</em></h3>
        <p>{plan.description}</p>
        <ul>
          {plan.features.map((feature) => (
            <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>
          ))}
        </ul>
        <Link href={plan.href}>{plan.detailsLabel}</Link>
      </div>
    </article>
  );
}
