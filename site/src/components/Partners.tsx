import './Partners.css';

export default function Partners() {
  /* Logos duplicados para efeito de scroll contínuo */
  const logos = [
    { name: 'Bondinho Pão de Açúcar', src: '/assets/partner-1.jpeg' },
    { name: 'Parceiro 2', src: '/assets/partner-2.jpeg' },
    { name: 'Bondinho Pão de Açúcar', src: '/assets/partner-1.jpeg' },
    { name: 'Parceiro 2', src: '/assets/partner-2.jpeg' },
  ];

  return (
    <section id="parceiros" className="partners section--gray">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Parceiros</span>
          <h2 className="section-title">Empresas que Confiam na Ibmec Jr.</h2>
          <div className="divider-accent" />
        </div>
      </div>
      <div className="partners__track-wrapper">
        <div className="partners__track" aria-label="Logos de parceiros">
          {logos.map((logo, i) => (
            <div className="partners__logo" key={i}>
              <img
                src={logo.src}
                alt={logo.name}
                width="120"
                height="60"
                loading="lazy"
              />
            </div>
          ))}
          {/* Duplica para loop infinito */}
          {logos.map((logo, i) => (
            <div className="partners__logo" key={`dup-${i}`} aria-hidden="true">
              <img
                src={logo.src}
                alt=""
                width="120"
                height="60"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
