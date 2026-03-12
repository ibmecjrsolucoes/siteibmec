import './ClientsCarousel.css';

/* SVG placeholder usado quando não há logo real */
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
  'Studio Criativo',
  'TechStart',
  'Parceirada do Bem',
  'Seja Luz',
  'Consultoria Prime',
  'Grupo Nexus',
  'Agência Delta',
  'InnovateLab',
  'Rede Connect',
  'Startup Hub RJ',
  'Empresa Alfa',
  'Empresa Beta',
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
          {items.map((name, i) => (
            <div key={`${name}-${i}`} className="carousel__item" title={name}>
              <LogoPlaceholder name={name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
