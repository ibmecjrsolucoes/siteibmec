import { useEffect, useState } from 'react';
import { ArrowDown } from '@phosphor-icons/react';
import './Hero.css';

const ROTATING_WORDS = [
  'RIGOR ACADÊMICO',
  'CUSTO ACESSÍVEL',
  'VISÃO DE MERCADO',
  'RESULTADOS REAIS',
];

/* ── Component ── */
export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROTATING_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <section id="hero" className="hero">
      {/* Vídeo de fundo em loop */}
      <video
        className="hero__bg-video"
        src="/assets/homefinal.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Overlay escuro */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Conteúdo */}
      <div className="hero__content container">

        <h1 className="hero__title">
          CONSULTORIA COM
          <span className="hero__title-rotating">
            {displayed}<span className="hero__cursor">|</span>
          </span>
        </h1>

        <p className="hero__subtitle">
          Transformamos conhecimento acadêmico em resultado real para o seu negócio.
          Ativa desde 1996, supervisionada por professores especialistas.
        </p>

        <div className="hero__actions">
          <a href="#contato" className="btn btn--primary btn--lg">
            Solicite um Diagnóstico Gratuito
          </a>
          <a href="#servicos" className="btn btn--ghost btn--lg">
            Conheça Nossos Serviços
          </a>
        </div>

      </div>

      {/* Scroll hint */}
      <a href="#metricas" className="hero__scroll" aria-label="Rolar para baixo">
        <ArrowDown size={22} weight="bold" className="hero__scroll-icon" />
      </a>
    </section>
  );
}
