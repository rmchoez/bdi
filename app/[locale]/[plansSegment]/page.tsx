import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "../../../components/sections/Header";
import { PlansGrid } from "../../../components/plans/PlansGrid";
import { StandardProductsGrid } from "../../../components/plans/StandardProductsGrid";
import { getMessages } from "../../../lib/i18n/messages";
import { isLocale, localeToApiLanguage, plansSegment as localizedSegment } from "../../../lib/i18n/config";
import { getAvailablePlans } from "../../../lib/plans/plan-data";

type Params = Promise<{ locale: string; plansSegment: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, plansSegment } = await params;
  if (!isLocale(locale) || localizedSegment[locale] !== plansSegment) return {};
  const messages = getMessages(locale);
  return { title: `${messages.plans.title} | Best Doctors Insurance`, description: messages.plans.description };
}

export default async function OurPlansPage({ params }: { params: Params }) {
  const { locale, plansSegment } = await params;
  if (!isLocale(locale) || localizedSegment[locale] !== plansSegment) notFound();
  const language = localeToApiLanguage[locale];
  const messages = getMessages(locale);
  const { plans, source } = await getAvailablePlans(locale, language);

  return (
    <main>
      <Header locale={locale} solid />
      <section className="all-plans-hero">
        <div className="container">
          <span>{messages.plans.eyebrow}</span>
          <h1>{messages.plans.title}</h1>
          <p>{messages.plans.description}</p>
        </div>
      </section>
      <section className="all-plans-section">
        <div className="container">
          {source === "catalog-mock" && <p className="data-notice">Development mode: visual catalog data is being used until the Product Documents API is configured.</p>}
          {source === "api-unavailable" && <p className="data-notice warning">{messages.plans.documentsUnavailable}</p>}
          {plans.length ? <PlansGrid plans={plans} locale={locale} language={language} detailsLabel={messages.plans.details} /> : <p className="empty-plans">{messages.plans.empty}</p>}
          <StandardProductsGrid
            showLabel={messages.plans.showStandardProducts}
            hideLabel={messages.plans.hideStandardProducts}
          />
        </div>
      </section>
    </main>
  );
}
