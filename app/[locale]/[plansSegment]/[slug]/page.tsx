import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "../../../../components/sections/Header";
import { PlanDocuments } from "../../../../components/plans/PlanDocuments";
import { getMessages } from "../../../../lib/i18n/messages";
import { getPlansPath, isLocale, localeToApiLanguage, plansSegment as localizedSegment } from "../../../../lib/i18n/config";
import { getPlanDetails } from "../../../../lib/plans/plan-data";

type Params = Promise<{ locale: string; plansSegment: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, plansSegment, slug } = await params;
  if (!isLocale(locale) || localizedSegment[locale] !== plansSegment) return {};
  const language = localeToApiLanguage[locale];
  const result = await getPlanDetails(language, slug);
  if (!result) return {};
  return { title: `${result.plan.name[language]} ${result.plan.variant?.[language] ?? ""} | Best Doctors Insurance`, description: result.plan.description[language] };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { locale, plansSegment, slug } = await params;
  if (!isLocale(locale) || localizedSegment[locale] !== plansSegment) notFound();
  const language = localeToApiLanguage[locale];
  const messages = getMessages(locale);
  const result = await getPlanDetails(language, slug);
  if (!result) notFound();
  const { plan, documents, source } = result;

  return (
    <main>
      <Header locale={locale} solid />
      <section className="product-hero">
        <img src={plan.heroImage} alt="" />
        <div className="product-hero-shade" />
        <div className="container">
          <a href={getPlansPath(locale)}>← {messages.plans.back}</a>
          <h1>{plan.name[language]} <em>{plan.variant?.[language]}</em></h1>
          <p>{plan.description[language]}</p>
        </div>
      </section>
      <section className="product-content">
        <div className="container">
          <section className="product-benefits">
            <h2>{messages.plans.included}</h2>
            <ul>{plan.benefits[language].map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
          </section>
          {source === "catalog-mock" && <p className="data-notice">Development mode: documents are mocked as unavailable until API credentials are configured.</p>}
          <PlanDocuments
            documents={documents}
            title={messages.plans.documents}
            empty={messages.plans.documentsUnavailable}
            buttonLabel={messages.plans.documentLabels}
          />
        </div>
      </section>
    </main>
  );
}
