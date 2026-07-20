import type { ApiLanguage, Locale } from "../../lib/i18n/config";
import { getPlansPath } from "../../lib/i18n/config";
import type { getLocalizedPlans } from "../../lib/plans/plan-catalog";

type LocalizedPlan = ReturnType<typeof getLocalizedPlans>[number];

export function PlansGrid({ plans, locale, language, detailsLabel }: {
  plans: LocalizedPlan[];
  locale: Locale;
  language: ApiLanguage;
  detailsLabel: string;
}) {
  return (
    <div className="all-plans-grid">
      {plans.map((plan) => (
        <article className="all-plan-card" key={plan.planCode}>
          <div className="all-plan-image"><img src={plan.cardImage} alt="" /></div>
          <div className="all-plan-copy">
            <h2>{plan.name[language]} {plan.variant?.[language] && <em>{plan.variant[language]}</em>}</h2>
            <p>{plan.description[language]}</p>
            <a href={`${getPlansPath(locale)}/${plan.localizedSlug}`}>{detailsLabel}</a>
          </div>
        </article>
      ))}
    </div>
  );
}
