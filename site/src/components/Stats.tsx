import type { ReactNode } from 'react';
import { Briefcase, UsersThree, Trophy, CalendarBlank } from '@phosphor-icons/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';
import mascoteAnalisa from '../assets/mascoteanalisa.png';
import './Stats.css';

interface StatItem {
  icon: ReactNode;
  end: number;
  suffix: string;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  { icon: <Briefcase size={32} weight="duotone" />, end: 300, suffix: '+', label: 'Projetos Feitos', description: 'Projetos de consultoria entregues para empresas de diversos setores' },
  { icon: <UsersThree size={32} weight="duotone" />, end: 120, suffix: '+', label: 'Clientes Satisfeitos', description: 'Empresas que confiaram na Ibmec Jr. para impulsionar seus resultados' },
  { icon: <Trophy size={32} weight="duotone" />, end: 17, suffix: '+', label: 'Prêmios', description: 'Reconhecimentos do Movimento Empresa Junior e mercado' },
  { icon: <CalendarBlank size={32} weight="duotone" />, end: 29, suffix: '+', label: 'Anos de Atuação', description: 'Desde 1996 transformando estratégia em resultados no Rio de Janeiro' },
];

function StatCard({ stat, isVisible, index }: { stat: StatItem; isVisible: boolean; index: number }) {
  const display = useCountUp({
    end: stat.end,
    suffix: stat.suffix,
    isVisible,
    duration: 2200,
  });

  return (
    <div className={`stats__card stagger-${index + 1} ${isVisible ? 'visible' : ''}`}>
      {index === 0 && (
        <img 
          src={mascoteAnalisa} 
          alt="Mascote Ibmec Jr. Analisa" 
          className="stats__card-mascot"
          loading="lazy"
        />
      )}
      <div className="stats__icon">{stat.icon}</div>
      <span className="stats__number">{display}</span>
      <span className="stats__label">{stat.label}</span>
      <p className="stats__description">{stat.description}</p>
    </div>
  );
}

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05, rootMargin: '0px' });

  return (
    <section className="stats section--dark" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Nossos Números</span>
          <h2 className="section-title">Dados que Comprovam Nossa Trajetória</h2>
          <div className="divider-accent" />
          <p className="section-subtitle">
            Resultados concretos que validam a confiança de nossos clientes
          </p>
        </div>

        <div className="stats__grid">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
