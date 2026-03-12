import { useEffect, useRef } from 'react';
import './VideoSection.css';

const VIDEO_URL = '/gestao.mp4';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Inicia/pausa conforme visibilidade na viewport */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="video" className="video-section" ref={sectionRef}>
      {/* Vídeo */}
      <video
        ref={videoRef}
        className="video-section__video"
        src={VIDEO_URL}
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="video-section__overlay" aria-hidden="true" />

      {/* Conteúdo */}
      <div className="video-section__content container">
        <span className="video-section__label">Nossa equipe em ação</span>

        <h2 className="video-section__title">
          Conheça a <span className="video-section__highlight">IBMEC Jr.</span>
        </h2>

        <p className="video-section__desc">
          Alunos do IBMEC com visão de mercado, orientação da academia e compromisso real
          com o resultado do seu negócio. Mais de 29 anos transformando desafios em crescimento.
        </p>
      </div>
    </section>
  );
}
