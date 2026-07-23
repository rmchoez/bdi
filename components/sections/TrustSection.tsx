export function TrustSection() {
  return (
    <section className="trust-section" id="trust" aria-labelledby="trust-title">
      <div className="trust-dots" aria-hidden="true">
        {Array.from({ length: 20 }, (_, index) => <i key={index} />)}
      </div>
      <div className="container trust-grid">
        <div className="trust-gallery" aria-hidden="true">
          <img className="trust-family" src="/trust-family.png" alt="" />
          <img src="/trust-professional.png" alt="" />
          <img src="/trust-couple.png" alt="" />
        </div>
        <div className="trust-copy">
          <h2 id="trust-title">Global health<br />protection</h2>
          <strong>built on trust</strong>
          <p>
            For more than 36 years, Best Doctors Insurance has supported individuals,
            families, employers and global citizens with international health insurance
            focused on access to medical care, global health services and consistent
            customer service.
          </p>
        </div>
      </div>
    </section>
  );
}
