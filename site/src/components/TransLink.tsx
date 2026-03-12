/**
 * TransLink — navegação suave entre rotas usando a View Transitions API.
 *
 * A View Transitions API (Chrome 111+, Edge 111+, Safari 18+):
 *  1. Congela a tela atual como screenshot GPU
 *  2. Executa o callback (navigate) → React atualiza o DOM
 *  3. GPU anima entre o screenshot antigo e o novo DOM via CSS
 * Resultado: animação de saída E entrada rodando ao mesmo tempo, sem flash.
 *
 * Uso: <TransLink to="/servicos">Serviços</TransLink>
 */
import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TransLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

// Tipagem do documento com a API experimental
type DocWithVT = Document & {
  startViewTransition: (callback: () => void | Promise<void>) => {
    ready: Promise<void>;
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition?: () => void;
  };
};

export default function TransLink({
  to,
  children,
  onClick,
  className,
  ...rest
}: TransLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (to === location.pathname) return;

    e.preventDefault();
    onClick?.(e);

    const doNavigate = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      navigate(to);
    };

    // View Transitions API: browser captura old → executa navigate → anima para new
    if ('startViewTransition' in document) {
      (document as DocWithVT).startViewTransition(doNavigate);
    } else {
      // Fallback para browsers sem suporte: navegação instantânea sem quebrar
      doNavigate();
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
