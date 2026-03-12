import { Strategy, TrendUp, Gear, MagnifyingGlass, Robot, Code } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Services.css';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: <Strategy size={28} weight="duotone" />,
    title: 'Plano Estratégico',
    description:
      'Uma ferramenta que direciona a visão e missão da empresa, identificando objetivos, metas e os meios para alcançá-los.',
  },
  {
    icon: <TrendUp size={28} weight="duotone" />,
    title: 'Plano de Marketing',
    description:
      'Guia que delineia a trajetória e estratégias de marketing da empresa, desde o histórico até a utilização estratégica de algoritmos.',
  },
  {
    icon: <Gear size={28} weight="duotone" />,
    title: 'Mapeamento de Processos',
    description:
      'Avaliação dos processos operacionais da empresa, identificando ineficiências, riscos e oportunidades para otimização.',
  },
  {
    icon: <MagnifyingGlass size={28} weight="duotone" />,
    title: 'Pesquisa de Clientes',
    description:
      'Estudo profundo sobre os clientes da empresa, focando em suas necessidades, percepções e experiências.',
  },
  {
    icon: <Robot size={28} weight="duotone" />,
    title: 'Análise de Dados e Automação',
    description:
      'Serviço voltado para transformar dados em decisões e automatizar processos operacionais com inteligência.',
  },
  {
    icon: <Code size={28} weight="duotone" />,
    title: 'Desenvolvimento de Software',
    description:
      'Criação de sistemas personalizados, com foco em escalabilidade, automação, eficiência operacional e integração entre áreas.',
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="servicos" className="services section--gray section" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Nossos Serviços</span>
          <h2 className="section-title">
            Soluções Sob Medida para o Sucesso da Sua Empresa
          </h2>
          <div className="divider-accent" />
          <p className="section-subtitle">
            Conheça as soluções que oferecemos para impulsionar negócios de todos os portes
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((service, i) => (
            <article
              key={service.title}
              className={`services__card animate-on-scroll stagger-${i + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="services__icon" role="img" aria-label={service.title}>
                {service.icon}
              </div>
              <h3 className="services__title">{service.title}</h3>
              <p className="services__description">{service.description}</p>
              <Link to="/servicos" className="btn btn--ghost" aria-label={`Saiba mais sobre ${service.title}`}>
                Saiba mais
              </Link>
            </article>
          ))}
        </div>

        <div className={`services__cta-wrapper animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <Link to="/servicos" className="btn btn--primary">
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
}
