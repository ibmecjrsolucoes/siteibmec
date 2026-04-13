import { useEffect, useRef } from 'react';
import {
  HandshakeIcon,
  Target,
  ShieldCheck,
  Crown,
  Users,
  Eye,
  Heart,
  ArrowRight,
  TrendUp,
  Trophy,
  UsersThree,
} from '@phosphor-icons/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import TransLink from '../components/TransLink';
import './SobreNosPage.css';

/* Membros históricos */
const MEMBROS = [
  {
    foto: '/marcello.png',
    nome: 'Marcello Poltronieri',
    cargo: 'Ex-presidente da IBMEC Jr.',
    desc: 'Fundador da Mamma Jamma, Grupo Noz e POLTRO Consulting. Referência em empreendedorismo e inovação no Brasil.',
    linkedin: 'https://www.linkedin.com/company/ibmecjr/',
  },
  {
    foto: '/luiz.png',
    nome: 'Luiz Henrique Coimbra',
    cargo: 'Ex-presidente da IBMEC Jr.',
    desc: 'Diretor da DBV Capital, Conselheiro da XP Inc e ex-presidente da IBMEC JR Soluções. Especialista em finanças e estratégia.',
    linkedin: 'https://www.linkedin.com/company/ibmecjr/',
  },
  {
    foto: '/patricia.png',
    nome: 'Patrícia Farias',
    cargo: 'Ex-membra da IBMEC Jr.',
    desc: 'Coordenadora de produtos e líder de negócios da Globo. Especialista em produto e gestão de times de alta performance.',
    linkedin: 'https://www.linkedin.com/company/ibmecjr/',
  },
];

const VALORES = [
  { icon: <HandshakeIcon size={20} weight="fill" />, label: 'Cooperatividade' },
  { icon: <Target size={20} weight="fill" />, label: 'Foco no Resultado' },
  { icon: <ShieldCheck size={20} weight="fill" />, label: 'Ética e Transparência' },
  { icon: <Crown size={20} weight="fill" />, label: 'Sentimento de Dono' },
  { icon: <Users size={20} weight="fill" />, label: 'Diversidade e Inclusão' },
];

const NUMEROS = [
  { icon: <TrendUp size={32} weight="duotone" />, valor: '+29', label: 'Anos de história' },
  { icon: <Trophy size={32} weight="duotone" />, valor: '+470', label: 'Projetos realizados' },
  { icon: <UsersThree size={32} weight="duotone" />, valor: '+294', label: 'Clientes impactados' },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('sn--visible'); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function SobreNosPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add('sn-hero--ready'));
  }, []);

  /* Parallax */
  useEffect(() => {
    const img = bgImgRef.current;
    if (!img) return;
    const handleScroll = () => {
      const y = window.scrollY * 0.35;
      img.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const histRef    = useReveal(0.1);
  const numerosRef = useReveal(0.15);
  const valoresRef = useReveal(0.1);
  const vmRef      = useReveal(0.1);
  const membrosRef = useReveal(0.1);

  return (
    <>
      <Header forceScrolled />

      <main className="sn-main">

        {/* ── HERO ── */}
        <section className="sn-hero">
          <img
            ref={bgImgRef}
            src="/assets/hero-team.png"
            alt=""
            className="sn-hero__bg-image"
            aria-hidden="true"
            loading="eager"
          />
          <div className="sn-hero__overlay" />
          <div ref={heroRef} className="sn-hero__content container">
            <nav className="sn-breadcrumb" aria-label="breadcrumb">
              <TransLink to="/">Início</TransLink>
              <ArrowRight size={13} weight="bold" />
              <span>Sobre Nós</span>
            </nav>
            <p className="sn-hero__eyebrow">Nossa essência</p>
            <h1 className="sn-hero__title">
              Sobre a <span className="sn-hero__highlight">IBMEC Jr.</span>
            </h1>
            <p className="sn-hero__sub">
              Há mais de uma década no mercado, somos especialistas em transformar
              desafios empresariais em oportunidades de crescimento através de
              soluções inovadoras e estratégicas.
            </p>
            <div className="sn-hero__actions">
              <a
                href="https://wa.me/552298832-9121"
                target="_blank"
                rel="noopener noreferrer"
                className="sn-hero__btn sn-hero__btn--primary"
              >
                Fale com a gente
              </a>
              <TransLink to="/servicos" className="sn-hero__btn sn-hero__btn--ghost">
                Nossos serviços
              </TransLink>
            </div>
          </div>
        </section>

        {/* ── NÚMEROS ── */}
        <section className="sn-numeros">
          <div ref={numerosRef} className="sn-numeros__grid container sn-reveal">
            {NUMEROS.map((n) => (
              <div key={n.label} className="sn-numeros__item">
                <span className="sn-numeros__icon">{n.icon}</span>
                <strong className="sn-numeros__valor">{n.valor}</strong>
                <span className="sn-numeros__label">{n.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── HISTÓRIA ── */}
        <section className="sn-section sn-section--white">
          <div className="container sn-historia">
            <div ref={histRef} className="sn-historia__text sn-reveal">
              <span className="section-label">Nossa Trajetória</span>
              <h2 className="sn-section__title">Nossa História</h2>
              <div className="sn-divider" />
              <p>
                Fundada em 2010, a IBMEC Jr. nasceu da visão de democratizar o
                acesso a soluções empresariais de alta qualidade. Começamos como
                uma pequena consultoria de alunos do IBMEC e hoje somos uma das
                principais referências de empresa júnior no mercado brasileiro.
              </p>
              <p>
                Ao longo dos anos, desenvolvemos expertise em diversas áreas —
                sempre mantendo o foco na inovação e na satisfação do cliente.
                Nossa jornada é marcada por parcerias duradouras e resultados que
                superam expectativas.
              </p>
              <p>
                Hoje, com mais de 29 anos de história, continuamos comprometidos em
                entregar soluções que realmente fazem a diferença no sucesso dos
                nossos parceiros.
              </p>
            </div>
            <div className="sn-historia__card">
              <blockquote className="sn-quote">
                <p>
                  "Não tentamos encaixar você nas nossas soluções — buscamos
                  encaixar as soluções que mais agregarão ao <strong>seu</strong> negócio."
                </p>
                <footer>— Equipe IBMEC Jr.</footer>
              </blockquote>
              <div className="sn-badges">
                <span className="sn-badge">Prêmio RioJunior Alto Impacto</span>
                <span className="sn-badge">5 anos consecutivos</span>
                <span className="sn-badge">Great Place to Work 2022</span>
                <span className="sn-badge">RioJunior 2024 — Inovação</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALORES + VISÃO + MISSÃO ── */}
        <section className="sn-section sn-section--dark">
          <div className="container">
            <div ref={valoresRef} className="sn-section__header sn-reveal">
              <span className="section-label section-label--light">Quem somos</span>
              <h2 className="sn-section__title sn-section__title--light">
                Nossos Valores
              </h2>
              <div className="sn-divider sn-divider--light" />
            </div>

            <div ref={vmRef} className="sn-vvm sn-reveal">
              {/* Coluna de valores */}
              <div className="sn-valores">
                <h3 className="sn-vvm__heading">Valores</h3>
                <ul className="sn-valores__list">
                  {VALORES.map((v) => (
                    <li key={v.label} className="sn-valores__item">
                      <span className="sn-valores__icon">{v.icon}</span>
                      {v.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visão */}
              <div className="sn-vm-card">
                <div className="sn-vm-card__icon">
                  <Eye size={28} weight="duotone" />
                </div>
                <h3 className="sn-vm-card__title">Visão</h3>
                <p className="sn-vm-card__text">
                  Nos tornarmos referência na área de consultoria no Brasil,
                  oferecendo as melhores soluções e gerando resultados concretos
                  para nossos clientes.
                </p>
              </div>

              {/* Missão */}
              <div className="sn-vm-card">
                <div className="sn-vm-card__icon">
                  <Heart size={28} weight="duotone" />
                </div>
                <h3 className="sn-vm-card__title">Missão</h3>
                <p className="sn-vm-card__text">
                  Impulsionar negócios entregando soluções em Gestão Empresarial
                  e Tecnologia, desenvolvendo pessoas e gerando valor para a
                  sociedade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MEMBROS HISTÓRICOS ── */}
        <section className="sn-section sn-section--gray">
          <div className="container">
            <div ref={membrosRef} className="sn-reveal">
              <div className="sn-section__header">
                <span className="section-label">Alumni de sucesso</span>
                <h2 className="sn-section__title">Membros Históricos</h2>
                <div className="sn-divider" />
                <p className="sn-section__sub">
                  Ex-membros que passaram pela IBMEC Jr. e hoje lideram empresas,
                  bancos e organizações de referência no Brasil.
                </p>
              </div>

              <div className="sn-membros__grid">
                {MEMBROS.map((m, i) => (
                  <article key={m.nome} className={`sn-membro stagger-${i + 1}`}>
                    <div className="sn-membro__photo-wrap">
                      <img src={m.foto} alt={m.nome} className="sn-membro__photo" loading="lazy" />
                      <div className="sn-membro__photo-glow" />
                    </div>
                    <div className="sn-membro__body">
                      <h3 className="sn-membro__name">{m.nome}</h3>
                      <p className="sn-membro__cargo">{m.cargo}</p>
                      <p className="sn-membro__desc">{m.desc}</p>
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sn-membro__link"
                      >
                        Ver perfil
                        <ArrowRight size={14} weight="bold" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="sn-cta">
          <div className="sn-cta__inner container">
            <h2 className="sn-cta__title">
              Pronto para transformar sua empresa?
            </h2>
            <p className="sn-cta__sub">
              Conheça nossas soluções e descubra como a IBMEC Jr. pode
              impulsionar o crescimento do seu negócio.
            </p>
            <div className="sn-cta__actions">
              <a
                href="https://wa.me/552298832-9121?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20diagn%C3%B3stico%20gratuito."
                target="_blank"
                rel="noopener noreferrer"
                className="sn-cta__btn sn-cta__btn--white"
              >
                Diagnóstico Gratuito
              </a>
              <TransLink to="/servicos" className="sn-cta__btn sn-cta__btn--outline">
                Ver nossos serviços
              </TransLink>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
}
