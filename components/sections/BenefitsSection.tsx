import { BenefitItem } from "../ui/BenefitItem";
import { Button } from "../ui/Button";

const benefits = [
  {
    image: "/benefit-worldwide.png",
    title: "Worldwide coverage",
    copy: "A comprehensive international health insurance plan with strong maternity care benefits, high medical expense limits, and enhanced emergency coverage.",
  },
  {
    image: "/benefit-support.png",
    title: "24/7 customer support",
    copy: "Reach our team anytime for emergencies, authorizations or questions about your coverage.",
  },
  {
    image: "/benefit-opinions.png",
    title: "Expert medical opinions",
    copy: "Get complex diagnoses and treatment plans reviewed through InterConsultation® so you can decide with confidence.",
  },
  {
    image: "/benefit-stability.png",
    title: "Stability you can trust",
    copy: "Decades of experience and strong global partners mean we’re ready to be there when it matters most.",
  },
];

export function BenefitsSection() {
  return (
    <section className="benefits-section" id="about" aria-labelledby="benefits-title">
      <img className="benefits-dots benefits-dots-left" src="/dots-left.png" alt="" />
      <img className="benefits-dots benefits-dots-right" src="/dots-right.png" alt="" />
      <div className="container">
        <div className="benefits-heading">
          <span>We combine</span>
          <h2 id="benefits-title">global medical access, expert<br />guidance and<br /><em>care that never sleeps</em></h2>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <BenefitItem image={benefit.image} key={benefit.title} title={benefit.title}>
              {benefit.copy}
            </BenefitItem>
          ))}
        </div>
        <Button href="#about">See what makes us different</Button>
      </div>
    </section>
  );
}
