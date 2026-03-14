import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Contact.css';

interface FormData {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  funcionarios: string;
  segmento: string;
  servico: string[];
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
  servico: [],
  servicoOutro: '',
  desafioPrincipal: '',
  prazoSolucao: '',
  resultadoEsperado: '',
};

const WHATSAPP_NUMBER = '5522988329121';
const SERVICE_OPTIONS = ['Vendas', 'Marketing', 'Processos', 'Tech', 'Financeiro', 'Outro'] as const;

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'servico' && e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      const input = e.target;
      setForm((prev) => {
        const nextServices = input.checked
          ? [...prev.servico, value]
          : prev.servico.filter((item) => item !== value);

        return {
          ...prev,
          servico: nextServices,
          servicoOutro: nextServices.includes('Outro') ? prev.servicoOutro : '',
        };
      });
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.servico.length === 0) {
      return;
    }

    const servicosSelecionados = form.servico.includes('Outro')
      ? [...form.servico.filter((item) => item !== 'Outro'), `Outro: ${form.servicoOutro}`]
      : form.servico;
    const servicoFinal = servicosSelecionados.join(', ');
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
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contato" className="contact section" ref={ref}>
      <div className="container">
        <div className="contact__grid">
          <div className={`contact__info animate-slide-left ${isVisible ? 'visible' : ''}`}>
            <span className="section-label">Contato</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Vamos Transformar Seu Negócio?
            </h2>
            <div className="divider-accent" style={{ margin: 'var(--space-sm) 0' }} />
            <p className="contact__text">
              Solicite um diagnóstico gratuito e descubra como podemos 
              impulsionar os resultados da sua empresa com soluções 
              personalizadas.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:comercial@ibmecjr.com.br">comercial@ibmecjr.com.br</a>
                </div>
              </div>

              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <strong>Localização</strong>
                  <span>Rio de Janeiro — RJ</span>
                </div>
              </div>

              <div className="contact__detail">
                <div className="contact__detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <strong>WhatsApp</strong>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (22) 98832-9121
                  </a>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Ibmec Jr.')}`}
              className="btn btn--primary contact__whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar pelo WhatsApp
            </a>
          </div>

          <div className={`contact__form-wrapper animate-slide-right ${isVisible ? 'visible' : ''}`}>
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <h3>Mensagem Enviada!</h3>
                <p>Entraremos em contato em breve.</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <h3 className="contact__form-title">Solicite seu Diagnóstico Gratuito</h3>

                <div className="contact__field">
                  <label htmlFor="nome">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                    autoComplete="name"
                  />
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="seu@email.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="empresa">Como a sua empresa se chama? *</label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={form.empresa}
                      onChange={handleChange}
                      required
                      placeholder="Nome da empresa"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="cargo">Qual o seu cargo nela? *</label>
                    <input
                      type="text"
                      id="cargo"
                      name="cargo"
                      value={form.cargo}
                      onChange={handleChange}
                      required
                      placeholder="Ex.: Diretor Comercial"
                      autoComplete="organization-title"
                    />
                  </div>

                  <div className="contact__field">
                    <label htmlFor="funcionarios">Quantos funcionários ela possui? *</label>
                    <select
                      id="funcionarios"
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

                <div className="contact__field">
                  <label htmlFor="segmento">Qual o segmento da empresa? *</label>
                  <input
                    type="text"
                    id="segmento"
                    name="segmento"
                    value={form.segmento}
                    onChange={handleChange}
                    required
                    placeholder="Ex.: Educação, Varejo, Saúde"
                  />
                </div>

                <div className="contact__field">
                  <label id="servico-label">Quais serviços você está procurando? *</label>
                  <div className="contact__services-picker" role="group" aria-labelledby="servico-label">
                    {SERVICE_OPTIONS.map((option, index) => (
                      <label
                        key={option}
                        htmlFor={`servico-${option}`}
                        className={`contact__service-option ${form.servico.includes(option) ? 'is-selected' : ''}`}
                      >
                        <input
                          type="checkbox"
                          id={`servico-${option}`}
                          name="servico"
                          value={option}
                          checked={form.servico.includes(option)}
                          onChange={handleChange}
                          required={index === 0 && form.servico.length === 0}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  <p className="contact__field-hint">Voce pode selecionar mais de uma opção.</p>
                </div>

                {form.servico.includes('Outro') && (
                  <div className="contact__field">
                    <label htmlFor="servicoOutro">Qual serviço? *</label>
                    <input
                      type="text"
                      id="servicoOutro"
                      name="servicoOutro"
                      value={form.servicoOutro}
                      onChange={handleChange}
                      required={form.servico.includes('Outro')}
                      placeholder="Descreva o serviço desejado"
                    />
                  </div>
                )}

                <div className="contact__field">
                  <label htmlFor="desafioPrincipal">Qual o principal desafio que sua empresa enfrenta hoje? *</label>
                  <textarea
                    id="desafioPrincipal"
                    name="desafioPrincipal"
                    value={form.desafioPrincipal}
                    onChange={handleChange}
                    required
                    placeholder="Descreva o problema atual da empresa"
                    rows={4}
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="prazoSolucao">Em quanto tempo você precisa que a Ibmec Jr. Soluções solucione esse problema? *</label>
                  <input
                    type="text"
                    id="prazoSolucao"
                    name="prazoSolucao"
                    value={form.prazoSolucao}
                    onChange={handleChange}
                    required
                    placeholder="Ex.: Em 30 dias"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="resultadoEsperado">Qual resultado você espera alcançar? *</label>
                  <textarea
                    id="resultadoEsperado"
                    name="resultadoEsperado"
                    value={form.resultadoEsperado}
                    onChange={handleChange}
                    required
                    placeholder="Explique o resultado esperado para o projeto"
                    rows={4}
                  />
                </div>

                <button type="submit" className="btn btn--primary contact__submit">
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
