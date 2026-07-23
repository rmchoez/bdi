import { ArrowRight } from "lucide-react";
import type { Locale } from "../../lib/i18n/config";

const testimonials = [
  {
    image: "/testimonial-ricardo.jpg",
    title: "Ricardo's Story",
    quote: "“The support we always felt with Best Doctors and their willingness to help was wonderful.”",
  },
  {
    image: "/testimonial-kayla.png",
    title: "Kayla's journey to restored vision",
    quote: "“Life’s been very different since the surgery…”",
  },
  {
    image: "/testimonial-paola.png",
    title: "Paola’s medical journey",
    quote: "“Best Doctors supported us with everything we needed...”",
  },
];

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const testimonialsUrl = `https://www.bestdoctorsinsurance.com/${locale}/testimonials/`;

  return (
    <section className="testimonials-section" id="stories" aria-labelledby="testimonials-title">
      <div className="container">
        <div className="testimonials-heading">
          <h2 id="testimonials-title">What our members <em>are saying</em></h2>
          <p>Hear from our members about their real experiences with our health insurance coverage</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.title}>
              <img src={testimonial.image} alt="" />
              <div className="testimonial-shade" />
              <div className="testimonial-copy">
                <h3>{testimonial.title}</h3>
                <p>{testimonial.quote}</p>
                <a href={testimonialsUrl}>View more</a>
              </div>
            </article>
          ))}
        </div>
        <a className="testimonials-all" href={testimonialsUrl}>
          View all testimonials <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
