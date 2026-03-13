import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import { ArrowRight, EnvelopeSimple, MapPin, Phone, WhatsappLogo, ChatsCircle } from '@phosphor-icons/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import TransLink from '../components/TransLink';
import './ContatoPage.css';

interface FormData {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  funcionarios: string;
  segmento: string;
  servico: string;
  servicoOutro: string;
  desafioPrincipal: string;
  prazoSolucao: string;
  resultadoEsperado: string;
}

const INITIAL_FORM: FormData = {
  nome: '',
  email: '',
  empresa: '',
  cargo: '',
  funcionarios: '',
  segmento: '',
  servico: '',
  servicoOutro: '',
  desafioPrincipal: '',
  prazoSolucao: '',
  resultadoEsperado: '',
};

const WHATSAPP_NUMBER = '5521967031003';

const INFO_CARDS = [
  {
    icon: <EnvelopeSimple size={28} weight="duotone" />,
    label: 'E-mail',
    value: 'comercial@ibmecjr.com.br',
    href: 'mailto:comercial@ibmecjr.com.br',
  },
  {
    icon: <MapPin size={28} weight="duotone" />,
    label: 'Endereço',
    value: 'Av. Armando Lombardi, 940\nBarra da Tijuca — RJ',
    href: 'https://maps.google.com/?q=Av.+Armando+Lombardi,+940,+Barra+da+Tijuca,+Rio+de+Janeiro',
  },
  {
    icon: <Phone size={28} weight="duotone" />,
    label: 'Telefone',
    value: '(22) 98832-9121',
    href: 'tel:+552298832-9121',
  },
  {
    icon: <WhatsappLogo size={28} weight="duotone" />,
    label: 'WhatsApp',
    value: '(21) 96703-1003',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
];

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('ct--visible');
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function ContatoPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const heroRef    = useRef<HTMLDivElement>(null);
  const bgImgRef   = useRef<HTMLImageElement>(null);
  const infoRef    = useReveal(0.1);
  const formRef    = useReveal(0.12);

  const [form, setForm]           = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  /* Entrada do hero */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add('ct-hero--ready'));
  }, []);

  /* Parallax */
  useEffect(() => {
    const img = bgImgRef.current;
    if (!img) return;
    const handleScroll = () => {
      img.style.transform = `translateY(${window.scrollY * 0.28}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const servicoFinal = form.servico === 'Outro' ? `Outro: ${form.servicoOutro}` : form.servico;
    const lines = [
      '🎓 *Nova mensagem pelo site — IBMEC Jr.*',
      '',
      `👤 *Nome:* ${form.nome}`,
      `📧 *E-mail:* ${form.email}`,
      `🏢 *Empresa:* ${form.empresa}`,
      `💼 *Cargo:* ${form.cargo}`,
      `👥 *Quantidade de funcionários:* ${form.funcionarios}`,
      `🏷️ *Segmento da empresa:* ${form.segmento}`,
      `🧩 *Serviço procurado:* ${servicoFinal}`,
      `⚠️ *Principal desafio atual:* ${form.desafioPrincipal}`,
      `⏱️ *Prazo esperado para solução:* ${form.prazoSolucao}`,
      `🎯 *Resultado esperado:* ${form.resultadoEsperado}`,
      '',
      '---',
      '_Enviado via ibmecjr.com.br_',
    ].filter((l) => l !== null).join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <>
      <Header forceScrolled />

      <main className="ct-main">

        {/* ── HERO ── */}
        <section className="ct-hero">
          <img
            ref={bgImgRef}
            src="/assets/hero-team.png"
            alt=""
            className="ct-hero__bg-image"
            aria-hidden="true"
            loading="eager"
          />
          <div className="ct-hero__overlay" aria-hidden="true" />

          <div className="container">
            <div className="ct-hero__content" ref={heroRef}>
              {/* Breadcrumb */}
              <nav className="ct-breadcrumb" aria-label="Migalhas de pão">
                <TransLink to="/">Início</TransLink>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                <span>Contato</span>
              </nav>

              <p className="ct-hero__eyebrow">Fale com a gente</p>

              <h1 className="ct-hero__title">
                Vamos construir algo<br />
                <span className="ct-hero__highlight">extraordinário</span> juntos?
              </h1>

              <p className="ct-hero__sub">
                Cada grande resultado começa com uma conversa. Conte-nos sobre 
                o desafio da sua empresa e descubra como a IBMEC Jr. transforma 
                estratégia em impacto real — com a energia de quem ainda 
                acredita que tudo é possível.
              </p>

              <div className="ct-hero__actions">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Ibmec Jr.')}`}
                  className="ct-hero__btn ct-hero__btn--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  Chamar no WhatsApp
                </a>
                <a href="#formulario" className="ct-hero__btn ct-hero__btn--ghost">
                  Enviar mensagem
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="ct-hero__scroll" aria-hidden="true">
            <span />
          </div>
        </section>

        {/* ── CARDS DE INFORMAÇÕES ── */}
        <section className="ct-info-strip">
          <div className="container">
            <div ref={infoRef} className="ct--reveal-wrapper">
              <div className="ct-info-strip__header">
                <span className="ct-eyebrow" style={{ color: 'var(--color-primary-2)', background: 'rgba(4,219,242,0.1)' }}>Onde estamos</span>
                <h2 className="ct-channels-title">Canais de Comunicação</h2>
                <div className="ct-channels-divider" aria-hidden="true" />
              </div>

              <div className="ct-info-strip__grid">
                {INFO_CARDS.map(({ icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="ct-info-card"
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <div className="ct-info-card__icon">{icon}</div>
                    <div className="ct-info-card__body">
                      <strong>{label}</strong>
                      <span style={{ whiteSpace: 'pre-line' }}>{value}</span>
                    </div>
                    <ArrowRight className="ct-info-card__arrow" size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MAPA ── */}
        <section className="ct-map-section" aria-label="Localização no mapa">
          <div className="ct-map-wrapper">
            <iframe
              title="Localização IBMEC Jr. — Av. Armando Lombardi, 940, Barra da Tijuca, RJ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.646!2d-43.36974!3d-22.99985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bda2749c19c6b%3A0x3e5e56e1db5b1a1b!2sAv.%20Armando%20Lombardi%2C%20940%20-%20Barra%20da%20Tijuca%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022640-000!5e0!3m2!1spt-BR!2sbr!4v1741785600000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="ct-map-badge">
              <MapPin size={18} weight="fill" />
              <span>Av. Armando Lombardi, 940 · Barra da Tijuca · RJ</span>
            </div>
          </div>
        </section>

        {/* ── FORMULÁRIO + TAGLINE ── */}
        <section id="formulario" className="ct-contact-section">
          <div className="container">
            <div className="ct-contact-grid ct-reveal" ref={formRef}>

              {/* Coluna esquerda — texto inspirador */}
              <div className="ct-contact-left ct-reveal__child">
                <div>
                  <span className="ct-eyebrow">Diagnóstico gratuito</span>
                  <h2 className="ct-section-title">
                    Seu próximo grande passo<br />
                    <span className="ct-gradient-text">começa aqui.</span>
                  </h2>
                  <p className="ct-section-body">
                    Nosso time de consultores entende que tempo é o seu ativo mais 
                    precioso. Por isso, respondemos em até 24 horas com uma análise 
                    inicial personalizada — sem compromisso, sem enrolação.
                  </p>

                  <ul className="ct-promise-list">
                    <li>
                      <span className="ct-promise-check" aria-hidden="true">✓</span>
                      Diagnóstico gratuito do seu cenário
                    </li>
                    <li>
                      <span className="ct-promise-check" aria-hidden="true">✓</span>
                      Proposta personalizada em 24 horas
                    </li>
                    <li>
                      <span className="ct-promise-check" aria-hidden="true">✓</span>
                      Custo acessível — somos empresa júnior
                    </li>
                    <li>
                      <span className="ct-promise-check" aria-hidden="true">✓</span>
                      Executado por alunos com supervisão profissional
                    </li>
                  </ul>

                  <div className="ct-avatar-row">
                    <div className="ct-avatar-group" aria-hidden="true">
                      <div className="ct-avatar" style={{ background: 'linear-gradient(135deg,#139CB8,#04DBF2)' }}>A</div>
                      <div className="ct-avatar" style={{ background: 'linear-gradient(135deg,#0D2B38,#139CB8)' }}>B</div>
                      <div className="ct-avatar" style={{ background: 'linear-gradient(135deg,#04DBF2,#6EC1E3)' }}>C</div>
                    </div>
                    <p className="ct-avatar-text">
                      <strong>+294 empresas</strong> já confiaram em nós
                    </p>
                  </div>
                </div>
              </div>

              {/* Coluna direita — formulário */}
              <div className="ct-form-card ct-reveal__child">
                <div className="ct-form-card__header">
                  <ChatsCircle size={28} weight="duotone" className="ct-form-card__icon-header" />
                  <h3>Conte-nos sobre seu projeto</h3>
                </div>

                {submitted ? (
                  <div className="ct-success">
                    <div className="ct-success__icon" aria-hidden="true">✓</div>
                    <h3>Mensagem enviada!</h3>
                    <p>Entraremos em contato em breve.<br />Acompanhe nosso WhatsApp!</p>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      className="ct-hero__btn ct-hero__btn--primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      Ir para o WhatsApp
                    </a>
                  </div>
                ) : (
                  <form className="ct-form" onSubmit={handleSubmit} noValidate>
                    <div className="ct-field">
                      <label htmlFor="ct-nome">Nome completo *</label>
                      <input
                        type="text"
                        id="ct-nome"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                        placeholder="João da Silva"
                        autoComplete="name"
                      />
                    </div>

                    <div className="ct-row">
                      <div className="ct-field">
                        <label htmlFor="ct-email">E-mail *</label>
                        <input
                          type="email"
                          id="ct-email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="joao@empresa.com.br"
                          autoComplete="email"
                        />
                      </div>
                      <div className="ct-field">
                        <label htmlFor="ct-empresa">Como a sua empresa se chama? *</label>
                        <input
                          type="text"
                          id="ct-empresa"
                          name="empresa"
                          value={form.empresa}
                          onChange={handleChange}
                          required
                          placeholder="Nome da empresa"
                          autoComplete="organization"
                        />
                      </div>
                    </div>

                    <div className="ct-row">
                      <div className="ct-field">
                        <label htmlFor="ct-cargo">Qual o seu cargo nela? *</label>
                        <input
                          type="text"
                          id="ct-cargo"
                          name="cargo"
                          value={form.cargo}
                          onChange={handleChange}
                          required
                          placeholder="Ex.: Diretor Comercial"
                          autoComplete="organization-title"
                        />
                      </div>

                      <div className="ct-field">
                        <label htmlFor="ct-funcionarios">Quantos funcionários ela possui? *</label>
                        <select
                          id="ct-funcionarios"
                          name="funcionarios"
                          value={form.funcionarios}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Selecione</option>
                          <option value="1 - 20">1 - 20</option>
                          <option value="21 - 60">21 - 60</option>
                          <option value="61 - 90">61 - 90</option>
                          <option value="91 - 200">91 - 200</option>
                          <option value="+ 200">+ 200</option>
                        </select>
                      </div>
                    </div>

                    <div className="ct-field">
                      <label htmlFor="ct-segmento">Qual o segmento da empresa? *</label>
                      <input
                        type="text"
                        id="ct-segmento"
                        name="segmento"
                        value={form.segmento}
                        onChange={handleChange}
                        required
                        placeholder="Ex.: Educação, Varejo, Saúde"
                      />
                    </div>

                    <div className="ct-field">
                      <label htmlFor="ct-servico">Qual serviço você está procurando? *</label>
                      <select
                        id="ct-servico"
                        name="servico"
                        value={form.servico}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Selecione um serviço</option>
                        <option value="Vendas">Vendas</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Processos">Processos</option>
                        <option value="Tech">Tech</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    {form.servico === 'Outro' && (
                      <div className="ct-field">
                        <label htmlFor="ct-servico-outro">Qual serviço? *</label>
                        <input
                          type="text"
                          id="ct-servico-outro"
                          name="servicoOutro"
                          value={form.servicoOutro}
                          onChange={handleChange}
                          required
                          placeholder="Descreva o serviço desejado"
                        />
                      </div>
                    )}

                    <div className="ct-field">
                      <label htmlFor="ct-desafio">Qual o principal desafio que sua empresa enfrenta hoje? *</label>
                      <textarea
                        id="ct-desafio"
                        name="desafioPrincipal"
                        value={form.desafioPrincipal}
                        onChange={handleChange}
                        required
                        placeholder="Descreva o problema atual da empresa"
                        rows={4}
                      />
                    </div>

                    <div className="ct-field">
                      <label htmlFor="ct-prazo">Em quanto tempo você precisa que a Ibmec Jr. Soluções solucione esse problema? *</label>
                      <input
                        type="text"
                        id="ct-prazo"
                        name="prazoSolucao"
                        value={form.prazoSolucao}
                        onChange={handleChange}
                        required
                        placeholder="Ex.: Em 30 dias"
                      />
                    </div>

                    <div className="ct-field">
                      <label htmlFor="ct-resultado">Qual resultado você espera alcançar? *</label>
                      <textarea
                        id="ct-resultado"
                        name="resultadoEsperado"
                        value={form.resultadoEsperado}
                        onChange={handleChange}
                        required
                        placeholder="Explique o resultado esperado para o projeto"
                        rows={4}
                      />
                    </div>

                    <button type="submit" className="ct-submit-btn">
                      Enviar mensagem
                      <ArrowRight size={18} />
                    </button>
                  </form>
                )}
              </div>

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
