import { CheckCircle } from '@phosphor-icons/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './About.css';

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section id="sobre" className="about section" ref={sectionRef}>
      <div className="container">
        <div className={`about__content about__content--full animate-slide-up ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">Quem Somos</span>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            A Consultoria que Entende o Seu Negócio
          </h2>
          <div className="divider-accent" style={{ margin: 'var(--space-sm) auto' }} />

          <div className="about__texts">
            <p className="about__text">
              A <strong>Ibmec Jr. Soluções</strong> é uma empresa junior de consultoria 
              empresarial, formada por alunos do IBMEC — uma das instituições de ensino 
              mais renomadas do Brasil em negócios, economia e tecnologia.
            </p>
            <p className="about__text">
              Desde 1996, conectamos o conhecimento acadêmico de ponta com as 
              necessidades práticas do mercado. Nossa equipe é orientada por professores 
              experientes e movida pela vontade de gerar impacto real nos negócios 
              dos nossos clientes.
            </p>
          </div>

          <div className="about__highlights">
            <div className="about__highlight-item">
              <div className="about__highlight-icon">
                <CheckCircle size={24} weight="fill" />
              </div>
              <div>
                <strong>Qualidade acadêmica IBMEC</strong>
                <span>Alunos de uma das melhores faculdades de negócios do país</span>
              </div>
            </div>
            <div className="about__highlight-item">
              <div className="about__highlight-icon">
                <CheckCircle size={24} weight="fill" />
              </div>
              <div>
                <strong>Preço acessível, resultado profissional</strong>
                <span>Até 70% mais acessível que consultorias tradicionais</span>
              </div>
            </div>
            <div className="about__highlight-item">
              <div className="about__highlight-icon">
                <CheckCircle size={24} weight="fill" />
              </div>
              <div>
                <strong>Orientação de professores especialistas</strong>
                <span>Cada projeto é supervisionado por profissionais do mercado</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a href="#contato" className="btn btn--primary">
              Fale com Nossa Equipe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
