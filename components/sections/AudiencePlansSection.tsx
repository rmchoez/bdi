import { AudienceCard } from "../ui/AudienceCard";
import { getPlansPath, type Locale } from "../../lib/i18n/config";

export function AudiencePlansSection({ locale }: { locale: Locale }) {
  return (
    <section className="audience-section" aria-labelledby="audience-title">
      <div className="container">
        <h2 id="audience-title">Find the <em>right plan</em> for you</h2>
        <div className="audience-grid">
          <AudienceCard
            title={<>Individuals<br />&amp; families</>}
            image="/audience-families.png"
            cta="Find a plan"
            href={getPlansPath(locale)}
          />
          <AudienceCard
            title={<>Companies &amp;<br />employers</>}
            image="/audience-companies.png"
            cta="Learn more"
            href="#contact"
          />
        </div>
      </div>
    </section>
  );
}
