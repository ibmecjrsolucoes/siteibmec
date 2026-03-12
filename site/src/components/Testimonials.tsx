import { useState, useCallback, useEffect, useRef } from 'react';
import { CaretLeft, CaretRight, Quotes } from '@phosphor-icons/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Testimonials.css';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'A equipe da Ibmec Jr. é extremamente profissional e nos atendeu de forma personalizada. Conseguiram organizar muito bem a estrutura da nossa empresa, fornecendo uma direção clara para o futuro do negócio.',
    name: 'Maria Santos',
    role: 'Fundadora',
    company: 'Studio Criativo',
  },
  {
    quote:
      'O que mais nos marcou foi como conseguiram transformar algo complexo em simples. Essa clareza nos deu a confiança de que estávamos diante de uma estratégia capaz de mudar nossos resultados.',
    name: 'Carlos Mendes',
    role: 'Diretor Comercial',
    company: 'TechStart',
  },
  {
    quote:
      'Quero muito agradecer a Ibmec Jr. que nos ajudou nesse processo de transformação das ideias e organização. A forma de trabalho faz com que a gente consiga entender plenamente nosso negócio.',
    name: 'Ana Lima',
    role: 'CEO',
    company: 'Parceirada do Bem',
  },
  {
    quote:
      'Tive o prazer de ter uma equipe que cuidou do projeto da minha empresa com uma sensibilidade e profissionalismo que me comoveu. Resultados acima das expectativas.',
    name: 'Juliana Fagundes',
    role: 'Proprietária',
    company: 'Seja Luz',
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setActiveIndex(index);
      setFading(false);
    }, 280);
  }, []);

  const goNext = useCallback(() => {
    changeTo((activeIndex + 1) % TESTIMONIALS.length);
  }, [activeIndex, changeTo]);

  const goPrev = useCallback(() => {
    changeTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, [activeIndex, changeTo]);

  // Autoplay a cada 5s
  useEffect(() => {
    if (!isVisible) return;
    autoplayRef.current = setTimeout(goNext, 5000);
    return () => { if (autoplayRef.current) clearTimeout(autoplayRef.current); };
  }, [activeIndex, isVisible, goNext]);

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="depoimentos" className="testimonials section--dark section" ref={ref}>
      <video
        className="testimonials__bg-video"
        src="/assets/dizemsobrenosvideo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="testimonials__overlay" />
      <div className="container">
        <div className="section-header">
          <span className="section-label">Depoimentos</span>
          <h2 className="section-title">O que Dizem Sobre Nós</h2>
          <div className="divider-accent" />
          <p className="section-subtitle">
            Veja o impacto que geramos em empresas de diferentes setores
          </p>
        </div>

        <div className={`testimonials__carousel animate-on-scroll ${isVisible ? 'visible' : ''}`}>
          <button
            className="testimonials__arrow testimonials__arrow--prev"
            onClick={goPrev}
            aria-label="Depoimento anterior"
          >
            <CaretLeft size={22} weight="bold" />
          </button>

          <div className={`testimonials__content${fading ? ' testimonials__content--fade' : ''}`}>
            <div className="testimonials__quote-icon" aria-hidden="true">
              <Quotes size={48} weight="fill" />
            </div>
            <blockquote className="testimonials__quote">
              {current.quote}
            </blockquote>
            <div className="testimonials__author">
              <div className="testimonials__avatar">
                {current.name.charAt(0)}
              </div>
              <div>
                <strong className="testimonials__name">{current.name}</strong>
                <span className="testimonials__role">
                  {current.role} — {current.company}
                </span>
              </div>
            </div>
          </div>

          <button
            className="testimonials__arrow testimonials__arrow--next"
            onClick={goNext}
            aria-label="Próximo depoimento"
          >
            <CaretRight size={22} weight="bold" />
          </button>
        </div>

        <div className="testimonials__dots" role="tablist" aria-label="Navegação de depoimentos">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === activeIndex ? 'testimonials__dot--active' : ''}`}
              onClick={() => changeTo(i)}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Depoimento ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
