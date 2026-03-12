import { useEffect, useState } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`scroll-to-top${visible ? ' scroll-to-top--visible' : ''}`}
      onClick={scrollUp}
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={20} weight="bold" />
    </button>
  );
}
