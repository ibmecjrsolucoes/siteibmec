import './ClientsCarousel.css';

function LogoPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (
    <svg
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="carousel__logo-svg"
      aria-label={name}
      role="img"
    >
      <rect width="120" height="48" rx="6" fill="#e8e8e8" />
      <text
        x="60"
        y="30"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Inter, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="#aaa"
      >
        {initials}
      </text>
    </svg>
  );
}


const CLIENTS = [
  { name: 'RedBull', logo: './logo/redbull.png' },
  { name: 'Ibmec', logo: './logo/ibmec.png' },
  { name: 'Ternium', logo: './logo/ternium.png' },
  { name: 'Axa', logo: './logo/axa.png' }, 
  { name: 'Aqua Rio', logo: './logo/aquario.png' },
  { name: 'Bondinho', logo: './logo/bondinho.png' },
  { name: 'Ambev', logo: './logo/ambev.png' },
  { name: 'Bw2', logo: './logo/bw2.png' },
  { name: 'Michelin', logo: './logo/michelin.png' },
  { name: 'Sebrae', logo: './logo/sebrae.png' },
];

export default function ClientsCarousel() {
  // Duplica o array para loop sem gaps
  const items = [...CLIENTS, ...CLIENTS];

  return (
    <section className="clients-carousel section" aria-label="Empresas parceiras">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Parceiros</span>
          <h2 className="section-title">Empresas que já confiam na IBMEC JR</h2>
          <div className="divider-accent" />
        </div>
      </div>

      {/* Track fora do container para ir de borda a borda */}
      <div className="carousel__wrapper" aria-hidden="true">
        <div className="carousel__track">
          {items.map((client, i) => (
            <div key={`${client.name}-${i}`} className="carousel__item" title={client.name}>
              {client.logo ? (
                <img 
                  src={client.logo} 
                  alt={`Logo da ${client.name}`} 
                  className="carousel__logo-img" 
                />
              ) : (
                <LogoPlaceholder name={client.name} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}