import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import logoJr from '../assets/logoheader.png';
import mascoteBandeira from '../assets/mascotebandeira.png';
import TransLink from './TransLink';
import './Header.css';

const HOME_LINKS = [
  { label: 'Início', hash: 'hero' },
  { label: 'Metodologia', hash: 'metodologia' },
  { label: 'Depoimentos', hash: 'depoimentos' },
];

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
      if (top) window.scrollTo(0, parseInt(top, 10) * -1);
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
      if (top) window.scrollTo(0, parseInt(top, 10) * -1);
    };
  }, [isMobileOpen]);

  const handleNavClick = useCallback(() => setIsMobileOpen(false), []);

  const scrolled = forceScrolled || isScrolled;
  const buildHref = (hash: string) => isHome ? `#${hash}` : `/#${hash}`;
  const ctaHref = isHome ? '#contato' : '/#contato';

  /* Links compartilhados */
  const navLinks = (
    <>
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
    </>
  );

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>

      {/* ═══════════ DESKTOP ═══════════ */}
      <div className="header-desktop container">
        <TransLink to="/" className="header-desktop__logo" aria-label="Ibmec Jr. Soluções — início">
          <img src={logoJr} alt="Ibmec Jr. Soluções" width="140" height="45" loading="eager" />
        </TransLink>

        <nav className="header-desktop__nav" aria-label="Navegação principal">
          <ul className="header-desktop__links">{navLinks}</ul>
        </nav>

        <div className="header-desktop__actions">
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
      </div>

      {/* ═══════════ MOBILE ═══════════ */}
      <div className="header-mobile">
        <TransLink to="/" className="header-mobile__logo" aria-label="Ibmec Jr. Soluções — início">
          <img src={logoJr} alt="Ibmec Jr. Soluções" loading="eager" />
        </TransLink>

        <button
          className="header-mobile__hamburger"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
        </button>
      </div>

      {/* Painel lateral mobile */}
      <nav
        className={`header-mobile__nav ${isMobileOpen ? 'header-mobile__nav--open' : ''}`}
        aria-label="Navegação principal"
      >
        <div className="header-mobile__content">
          <img 
            src={mascoteBandeira} 
            alt="Mascote Ibmec Jr." 
            className="header-mobile__mascot"
            loading="lazy"
          />
          
          <ul className="header-mobile__links">{navLinks}</ul>
        </div>

        <div className="header-mobile__actions">
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

        <div className="header-mobile__social">
          <a
            href="https://www.instagram.com/ibmecjr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Ibmec Jr."
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/ibmecjr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn da Ibmec Jr."
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </nav>

      {/* Overlay escuro */}
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
