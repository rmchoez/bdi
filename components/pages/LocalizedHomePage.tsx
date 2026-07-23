import { ChevronUp, MessageCircle } from "lucide-react";
import { getPlansPath, localeToApiLanguage, type Locale } from "../../lib/i18n/config";
import { getMessages } from "../../lib/i18n/messages";
import { getLocalizedPlans } from "../../lib/plans/plan-catalog";
import { AudiencePlansSection } from "../sections/AudiencePlansSection";
import { BenefitsSection } from "../sections/BenefitsSection";
import { Header } from "../sections/Header";
import { HeroSlider } from "../sections/HeroSlider";
import { PlansSection } from "../sections/PlansSection";
import { QuickActionsSection } from "../sections/QuickActionsSection";
import { TestimonialsSection } from "../sections/TestimonialsSection";
import { TrustSection } from "../sections/TrustSection";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function LocalizedHomePage({ locale }: { locale: Locale }) {
  const language = localeToApiLanguage[locale];
  const messages = getMessages(locale);
  const plans = getLocalizedPlans(locale, language).map((plan) => ({
    name: plan.localizedName,
    description: plan.localizedDescription,
    features: plan.localizedBenefits,
    image: plan.cardImage,
    href: `${getPlansPath(locale)}/${plan.localizedSlug}`,
    detailsLabel: messages.plans.details,
  }));

  return (
    <main id="top">
      <Header locale={locale} />
      <HeroSlider locale={locale} />
      <QuickActionsSection />
      <AudiencePlansSection locale={locale} />
      <BenefitsSection />
      <PlansSection plans={plans} compareHref={getPlansPath(locale)} />
      <TestimonialsSection locale={locale} />
      <TrustSection />

      <section className="numbers section">
        <div className="container">
          <div className="number-grid">
            <div><strong>36<span>+</span></strong><h3>Years of experience</h3><p>Helping members navigate global healthcare since 1989.</p></div>
            <div><strong>150<span>K+</span></strong><h3>Claims each year</h3><p>Reliable support for both planned care and emergencies.</p></div>
            <div><strong>92<span>%</span></strong><h3>Member satisfaction</h3><p>Confidence and peace of mind throughout every journey.</p></div>
          </div>
          <Button href="#about">Learn more about who we are</Button>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="container cta-inner">
          <div><span className="eyebrow light"><span /> Start a conversation</span><h2>Not sure which plan fits?</h2><p>Our advisors are ready to help you make a confident choice.</p></div>
          <Button href="mailto:hello@example.com" variant="white">Talk to an advisor</Button>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div><Logo light /><p>Global health protection, delivered with expertise and care.</p></div>
          <div><strong>Plans</strong><a href={getPlansPath(locale)}>Individual plans</a><a href="#contact">Corporate plans</a></div>
          <div><strong>Company</strong><a href="#about">About us</a><a href="#contact">Careers</a></div>
          <div><strong>Support</strong><a href="#contact">Let’s connect</a><a href="#contact">FAQs</a></div>
        </div>
        <div className="container copyright"><span>© 2026 Best Doctors Insurance concept.</span><span>Privacy · Terms · Accessibility</span></div>
      </footer>
      <a className="chat" href="#contact" aria-label="Chat with us"><MessageCircle /></a>
      <a className="to-top" href="#top" aria-label="Back to top"><ChevronUp /></a>
    </main>
  );
}
