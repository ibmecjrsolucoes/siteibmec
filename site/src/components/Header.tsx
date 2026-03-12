import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import logoJr from '../assets/logoheader.png';
import TransLink from './TransLink';
import './Header.css';

const HOME_LINKS = [
  { label: 'Início', hash: 'hero' },
  { label: 'Metodologia', hash: 'metodologia' },
  { label: 'Depoimentos', hash: 'depoimentos' },
];

/** Links que navegam para rotas (não âncoras) */
const ROUTE_LINKS = [
  { label: 'Sobre Nós', to: '/sobre' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Contato', to: '/contato' },
];

interface HeaderProps {
  forceScrolled?: boolean;
}

export default function Header({ forceScrolled = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  /* Header transparente → sólido após 80px de scroll */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Fecha menu mobile ao redimensionar para desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Trava scroll do body quando menu mobile está aberto */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const handleNavClick = useCallback(() => setIsMobileOpen(false), []);

  const scrolled = forceScrolled || isScrolled;

  /* Monta href: se estiver na home usa âncora pura, senão vai para /#hash */
  const buildHref = (hash: string) => isHome ? `#${hash}` : `/#${hash}`;
  const ctaHref = isHome ? '#contato' : '/#contato';

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container container">
        <TransLink to="/" className="header__logo" aria-label="Ibmec Jr. Soluções — início">
          <img
            src={logoJr}
            alt="Ibmec Jr. Soluções"
            width="140"
            height="45"
            loading="eager"
          />
        </TransLink>

        {/* Nav — somente links de navegação */}
        <nav
          className={`header__nav ${isMobileOpen ? 'header__nav--open' : ''}`}
          aria-label="Navegação principal"
        >
          <ul className="header__links">
            {HOME_LINKS.map(({ label, hash }) => (
              <li key={hash}>
                <a href={buildHref(hash)} className="header__link" onClick={handleNavClick}>
                  {label}
                </a>
              </li>
            ))}
            {ROUTE_LINKS.map(({ label, to }) => (
              <li key={to}>
                <TransLink
                  to={to}
                  className={`header__link${location.pathname === to ? ' header__link--active' : ''}`}
                  onClick={handleNavClick}
                >
                  {label}
                </TransLink>
              </li>
            ))}
          </ul>

          {/* Visível apenas dentro do menu mobile */}
          <div className="header__mobile-actions">
            <a
              href="https://forms.gle/X3NfETb3rcQUwQzC6"
              className="header__ps"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
            >
              <span className="header__ps-dot" aria-hidden="true" />
              Processo Seletivo 2026.1
            </a>
            <a href={ctaHref} className="header__cta-mobile" onClick={handleNavClick}>
              Fale Conosco
            </a>
          </div>
        </nav>

        {/* Grupo de ações — visível apenas no desktop */}
        <div className="header__actions">
          <a
            href="https://forms.gle/X3NfETb3rcQUwQzC6"
            className="header__ps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="header__ps-dot" aria-hidden="true" />
            Processo Seletivo 2026.1
          </a>
          <a href={ctaHref} className="header__cta">
            Fale Conosco
          </a>
        </div>

        {/* Hamburger — ícone Phosphor List/X */}
        <button
          className="header__hamburger"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen
            ? <X size={28} weight="bold" />
            : <List size={28} weight="bold" />
          }
        </button>
      </div>

      {/* Overlay escuro ao abrir menu mobile */}
      {isMobileOpen && (
        <div
          className="header__overlay"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
