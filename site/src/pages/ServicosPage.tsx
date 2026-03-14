import { useEffect } from 'react';
import TransLink from '../components/TransLink';
import {
  ChartLine,
  MegaphoneSimple,
  Compass,
  Binoculars,
  UsersThree,
  GitBranch,
  Globe,
  Code,
  ChartBar,
  DeviceMobile,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import './ServicosPage.css';

interface Produto {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  whatsapp: string;
}

const PRODUTOS_CONSULTORIA: Produto[] = [
  {
    icon: <ChartLine size={40} weight="duotone" />,
    title: 'Plano Financeiro',
    description:
      'Documento essencial que detalha a saúde financeira e as estratégias monetárias da empresa, fornecendo uma visão clara do potencial de crescimento.',
    items: [
      'DRE e Demonstração de Fluxo de Caixa',
      'Cenários otimista, realista e pessimista',
      'Cálculo de tributação (Simples, Lucro Presumido/Real)',
      'Precificação e análise de risco',
      'Cálculo de CSV, CMV e CPV',
    ],
    whatsapp: 'Plano Financeiro',
  },
  {
    icon: <MegaphoneSimple size={40} weight="duotone" />,
    title: 'Plano de Marketing',
    description:
      'Guia abrangente que delineia a trajetória e estratégias de marketing, desde o histórico da empresa até o uso estratégico de algoritmos digitais.',
    items: [
      'Perfil do cliente e nicho de mercado',
      'Marketing Mix (4Ps)',
      'Matriz SWOT e Mapa de Empatia',
      'Parcerias e sugestões estratégicas',
      'Uso estratégico de algoritmos e redes sociais',
    ],
    whatsapp: 'Plano de Marketing',
  },
  {
    icon: <Compass size={40} weight="duotone" />,
    title: 'Planejamento Estratégico',
    description:
      'Ferramenta estrutural que direciona a visão e missão da empresa, identificando objetivos-chave, metas e os meios para alcançá-los com foco em resultados.',
    items: [
      'BMC (Business Model Canvas)',
      'OKR — Objetivos e Resultados Chave',
      'BSC (Balanced Scorecard)',
      'Desdobramento de metas',
      'Base estatística analítica',
    ],
    whatsapp: 'Planejamento Estratégico',
  },
  {
    icon: <Binoculars size={40} weight="duotone" />,
    title: 'Análise Mercadológica',
    description:
      'Avaliação detalhada do mercado em que a empresa opera, com estudos sobre histórico, tendências, stakeholders e posicionamento frente a concorrentes.',
    items: [
      'Histórico e sazonalidade de mercado',
      'Tamanho do setor e projeções',
      'Análise de stakeholders (clientes, concorrentes, investidores)',
      'Estágio de demanda',
      'SWOT mercadológico',
    ],
    whatsapp: 'Análise Mercadológica',
  },
  {
    icon: <UsersThree size={40} weight="duotone" />,
    title: 'Pesquisa de Clientes',
    description:
      'Estudo profundo sobre os clientes da empresa, focando em suas necessidades, percepções e experiências para compreender e atender melhor o público-alvo.',
    items: [
      'Análise qualitativa e quantitativa',
      'Mapa de Empatia do consumidor',
      'Expectativa X Realidade',
      'Perspectiva do consumidor',
      'Relatório com perspectivas referenciais',
    ],
    whatsapp: 'Pesquisa de Clientes',
  },
  {
    icon: <GitBranch size={40} weight="duotone" />,
    title: 'Mapeamento de Processos',
    description:
      'Avaliação estruturada dos processos operacionais, identificando ineficiências, riscos e oportunidades, culminando em processos otimizados e mais eficientes.',
    items: [
      'Fluxograma dos processos atuais',
      'Identificação e priorização de problemas',
      'Análise de causas raiz',
      'Elaboração e priorização de soluções',
      'Planejamento e implantação do novo processo',
    ],
    whatsapp: 'Mapeamento de Processos',
  },
];

const PRODUTOS_INOVACAO: Produto[] = [
  {
    icon: <Globe size={40} weight="duotone" />,
    title: 'Desenvolvimento de Sites',
    description:
      'Criação de sites modernos, responsivos e de alta performance, estruturados para fortalecer a presença digital e aumentar as conversões do cliente.',
    items: [
      'Layout e design responsivo (mobile-first)',
      'React, Next.js, WordPress e tecnologias modernas',
      'SEO para melhorar posicionamento orgânico',
      'UX/UI Design centrado no usuário',
      'Segurança, SSL e alta performance',
    ],
    whatsapp: 'Desenvolvimento de Sites',
  },
  {
    icon: <Code size={40} weight="duotone" />,
    title: 'Desenvolvimento de Software',
    description:
      'Criação de sistemas personalizados sob medida, com foco em escalabilidade, automação, eficiência operacional e integração entre áreas da empresa.',
    items: [
      'Python, Node.js, Java, .NET e outros',
      'Arquitetura escalável e banco de dados robusto',
      'CI/CD e boas práticas de engenharia',
      'Integração com APIs e sistemas existentes',
      'Segurança e proteção de dados (LGPD)',
    ],
    whatsapp: 'Desenvolvimento de Software',
  },
  {
    icon: <ChartBar size={40} weight="duotone" />,
    title: 'Análise de Dados e Automação',
    description:
      'Transformamos dados em decisões e automatizamos processos operacionais, combinando análise estatística, dashboards e rotinas automáticas.',
    items: [
      'Análise com Python (Pandas, NumPy, Scikit-learn)',
      'Dashboards no Power BI, Tableau e Google Data Studio',
      'Automação RPA com UiPath, Selenium e Python',
      'Integração de fontes de dados e APIs',
      'Relatórios gerenciais com KPIs',
    ],
    whatsapp: 'Análise de Dados e Automação',
  },
  {
    icon: <DeviceMobile size={40} weight="duotone" />,
    title: 'Desenvolvimento de Apps',
    description:
      'Aplicativos mobile personalizados para Android e iOS com foco em desempenho, segurança e experiência do usuário, para uso interno ou comercial.',
    items: [
      'React Native, Flutter e Kotlin',
      'UX/UI mobile fluido e intuitivo',
      'Integração com APIs REST, Firebase e Supabase',
      'Arquitetura limpa e modular',
      'Alta performance e segurança de dados',
    ],
    whatsapp: 'Desenvolvimento de Apps',
  },
];

function ProdutoCard({ produto }: { produto: Produto }) {
  const mensagem = encodeURIComponent(
    `Olá! Gostaria de saber mais sobre o serviço de ${produto.whatsapp} da IBMEC Jr.`
  );

  return (
    <div className="sp-card">
      <div className="sp-card__icon">{produto.icon}</div>
      <h3 className="sp-card__title">{produto.title}</h3>
      <p className="sp-card__desc">{produto.description}</p>
      <ul className="sp-card__list">
        {produto.items.map((item) => (
          <li key={item}>
            <CheckCircle size={16} weight="fill" className="sp-card__check" />
            {item}
          </li>
        ))}
      </ul>
      <a
        href={`https://wa.me/552298832-9121?text=${mensagem}`}
        target="_blank"
        rel="noopener noreferrer"
        className="sp-card__cta"
      >
        Fale com um Consultor
      </a>
    </div>
  );
}

export default function ServicosPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <Header forceScrolled />

      <main className="sp-main">
        {/* ── HERO ── */}
        <section className="sp-hero">
          <div className="sp-hero__overlay" />
          <div className="sp-hero__content container">
            <nav className="sp-breadcrumb" aria-label="breadcrumb">
              <TransLink to="/">Início</TransLink>
              <ArrowRight size={14} weight="bold" />
              <span>Nossos Produtos</span>
            </nav>
            <span className="sp-hero__label">O que oferecemos</span>
            <h1 className="sp-hero__title">Nossos Produtos</h1>
            <p className="sp-hero__sub">
              Soluções especializadas em consultoria empresarial e tecnologia para
              impulsionar o crescimento da sua empresa.
            </p>
          </div>
        </section>

        {/* ── CONSULTORIA ── */}
        <section className="sp-section sp-section--light">
          <div className="container">
            <div className="sp-section__header">
              <span className="section-label">Gestão Empresarial</span>
              <h2 className="sp-section__title">
                Consultoria Sob Medida para o Seu Negócio
              </h2>
              <p className="sp-section__sub">
                Alunos do IBMEC com visão de mercado e orientação acadêmica,
                entregando resultados reais para pequenas e médias empresas.
              </p>
            </div>
            <div className="sp-grid">
              {PRODUTOS_CONSULTORIA.map((p) => (
                <ProdutoCard key={p.title} produto={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── INOVAÇÕES ── */}
        <section className="sp-section sp-section--dark sp-section--inovacao">
          <video
            className="sp-section__bg-video"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src="/assets/inovacao.mp4" type="video/mp4" />
          </video>
          <div className="sp-section__video-overlay" />
          <div className="container">
            <div className="sp-section__header">
              <span className="section-label section-label--light">Inovações & Tecnologia</span>
              <h2 className="sp-section__title sp-section__title--light">
                Soluções Digitais para o Futuro da Sua Empresa
              </h2>
              <p className="sp-section__sub sp-section__sub--light">
                Desenvolvimento de software, sites, apps e automação de processos
                com tecnologias de ponta e metodologias ágeis.
              </p>
            </div>
            <div className="sp-grid sp-grid--inovacao">
              {PRODUTOS_INOVACAO.map((p) => (
                <ProdutoCard key={p.title} produto={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="sp-cta">
          <div className="container sp-cta__inner">
            <div className="sp-cta__text">
              <h2 className="sp-cta__title">
                Não sabe qual produto escolher?
              </h2>
              <p className="sp-cta__sub">
                Nossos consultores fazem um diagnóstico gratuito e indicam a melhor
                solução para o momento da sua empresa.
              </p>
            </div>
            <a
              href="https://wa.me/552298832-9121?text=Olá%2C%20gostaria%20de%20fazer%20um%20diagnóstico%20gratuito%20com%20a%20IBMEC%20Jr."
              target="_blank"
              rel="noopener noreferrer"
              className="sp-cta__btn"
            >
              Diagnóstico Gratuito
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChat />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
}
