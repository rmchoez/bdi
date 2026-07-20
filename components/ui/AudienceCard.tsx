import { Button } from "./Button";

type AudienceCardProps = {
  title: React.ReactNode;
  image: string;
  cta: string;
  href: string;
};

export function AudienceCard({ title, image, cta, href }: AudienceCardProps) {
  return (
    <article className="audience-card">
      <img src={image} alt="" />
      <div className="audience-card-shade" />
      <div className="audience-card-content">
        <h3>{title}</h3>
        <Button href={href} showArrow={false}>{cta}</Button>
      </div>
    </article>
  );
}
