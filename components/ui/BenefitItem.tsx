type BenefitItemProps = {
  image: string;
  title: string;
  children: React.ReactNode;
};

export function BenefitItem({ image, title, children }: BenefitItemProps) {
  return (
    <article className="benefit-item">
      <img className="benefit-image" src={image} alt="" />
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}
