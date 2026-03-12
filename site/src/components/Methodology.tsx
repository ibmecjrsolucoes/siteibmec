import type { ReactNode } from 'react';
import { MagnifyingGlass, FileText, Rocket, CheckCircle } from '@phosphor-icons/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Methodology.css';

interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    icon: <MagnifyingGlass size={26} weight="duotone" />,
    title: 'Diagnóstico Gratuito',
    description:
      'Analisamos a situação atual da sua empresa para identificar os principais desafios e oportunidades de crescimento.',
  },
  {
    number: '02',
    icon: <FileText size={26} weight="duotone" />,
    title: 'Proposta Personalizada',
    description:
      'Elaboramos uma proposta sob medida, com escopo, cronograma e investimento transparentes.',
  },
  {
    number: '03',
    icon: <Rocket size={26} weight="duotone" />,
    title: 'Execução do Projeto',
    description:
      'Nossa equipe executa com acompanhamento semanal, entregas parciais e validações constantes com você.',
  },
  {
    number: '04',
    icon: <CheckCircle size={26} weight="duotone" />,
    title: 'Entrega e Acompanhamento',
    description:
      'Entregamos o projeto final e seguimos acompanhando para garantir que os resultados sejam implementados.',
  },
];

export default function Methodology() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="metodologia" className={`methodology section${isVisible ? ' visible' : ''}`} ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Como Funciona</span>
          <h2 className="section-title">Metodologia Ibmec Jr.</h2>
          <div className="divider-accent" />
          <p className="section-subtitle">
            Um processo estruturado e transparente do início ao fim
          </p>
        </div>

        <div className="methodology__steps">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`methodology__step animate-on-scroll stagger-${i + 1} ${isVisible ? 'visible' : ''}`}
            >
              <div className="methodology__step-number">
                {step.icon}
                <span className="methodology__step-num">{step.number}</span>
              </div>
              <div className="methodology__step-connector" aria-hidden="true" />
              <h3 className="methodology__step-title">{step.title}</h3>
              <p className="methodology__step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
