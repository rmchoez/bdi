import { QuickActionCard } from "../ui/QuickActionCard";
import { SectionHeading } from "../ui/SectionHeading";

const actions = [
  { title: "Find", copy: <>a health insurance<br />plan</>, href: "#plans" },
  { title: "Start", copy: "a conversation", href: "#contact" },
  { title: "Pay", copy: <>your policy with<br />In$taPay</>, href: "#contact" },
  { title: "Become", copy: <>a Best Doctors Insurance<br />Distributor</>, href: "#contact" },
];

export function QuickActionsSection() {
  return (
    <section className="quick section" aria-labelledby="quick-actions-title">
      <div className="container">
        <SectionHeading
          title={<span id="quick-actions-title">How can we help you today?</span>}
          description="Manage your healthcare coverage and complete essential tasks in just minutes"
        />
        <div className="quick-action-grid">
          {actions.map((action) => (
            <QuickActionCard href={action.href} key={action.title} title={action.title}>
              {action.copy}
            </QuickActionCard>
          ))}
        </div>
      </div>
    </section>
  );
}
