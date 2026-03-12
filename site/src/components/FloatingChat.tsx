import { useState, useEffect, useRef } from 'react';
import { X, PaperPlaneRight } from '@phosphor-icons/react';
import './FloatingChat.css';

interface BotMessage {
  id: number;
  text: string;
  delay: number; // ms após abertura
}

const BOT_MESSAGES: BotMessage[] = [
  { id: 1, text: '👋 Olá! Seja bem-vindo(a) à IBMEC Jr. Soluções!', delay: 500 },
  { id: 2, text: 'Podemos ajudar sua empresa com consultoria estratégica, marketing, processos e muito mais.', delay: 2000 },
  { id: 3, text: 'Quer um diagnóstico gratuito? É só clicar abaixo 👇', delay: 3500 },
];

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [visibleMsgs, setVisibleMsgs] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ao abrir: exibe msgs com delays + dots de digitação
  useEffect(() => {
    if (!open) {
      // Limpa ao fechar
      timersRef.current.forEach(clearTimeout);
      setVisibleMsgs([]);
      return;
    }

    BOT_MESSAGES.forEach((msg, _i) => {
      // Dots de digitação antes de cada msg
      const dotTimer = setTimeout(() => setTyping(true), msg.delay - 600 < 0 ? 0 : msg.delay - 600);
      const msgTimer = setTimeout(() => {
        setTyping(false);
        setVisibleMsgs((prev) => [...prev, msg.id]);
      }, msg.delay);
      timersRef.current.push(dotTimer, msgTimer);
    });

    return () => { timersRef.current.forEach(clearTimeout); };
  }, [open]);

  // Scroll para o fundo quando novas msgs aparecem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMsgs, typing]);

  const handleCTA = () => {
    window.location.href = '#contato';
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    // Redireciona para o formulário de contato com contexto
    window.location.href = '#contato';
    setOpen(false);
  };

  return (
    <div className={`floating-chat${open ? ' floating-chat--open' : ''}`} role="region" aria-label="Chat de atendimento">
      {/* Balão de mensagem pré-abertura */}
      {!open && (
        <div className="floating-chat__teaser" aria-hidden="true">
          Fale com a gente!
        </div>
      )}

      {/* Janela do chat */}
      {open && (
        <div className="floating-chat__window" role="dialog" aria-modal="true" aria-label="Chat IBMEC Jr.">
          {/* Header */}
          <div className="floating-chat__header">
            <div className="floating-chat__header-info">
              <div className="floating-chat__avatar">
                <img src="/emilie.jpg" alt="Emilie" />
              </div>
              <div>
                <span className="floating-chat__header-name">IBMEC Jr.</span>
                <span className="floating-chat__header-status">Online agora</span>
              </div>
            </div>
            <button
              className="floating-chat__close"
              onClick={() => setOpen(false)}
              aria-label="Fechar chat"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          {/* Mensagens */}
          <div className="floating-chat__messages" aria-live="polite">
            {BOT_MESSAGES.filter((m) => visibleMsgs.includes(m.id)).map((msg) => (
              <div key={msg.id} className="floating-chat__msg floating-chat__msg--bot">
                <p>{msg.text}</p>
              </div>
            ))}

            {/* Dots de digitação */}
            {typing && (
              <div className="floating-chat__msg floating-chat__msg--bot floating-chat__msg--typing" aria-label="Digitando...">
                <span className="floating-chat__dot" />
                <span className="floating-chat__dot" />
                <span className="floating-chat__dot" />
              </div>
            )}

            {/* CTA após última mensagem */}
            {visibleMsgs.includes(3) && (
              <button className="floating-chat__cta-btn btn btn--primary" onClick={handleCTA}>
                Solicitar Diagnóstico Gratuito
              </button>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input (envia para o formulário de contato) */}
          <form className="floating-chat__input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              className="floating-chat__input"
              placeholder="Digite uma mensagem..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              aria-label="Mensagem"
            />
            <button
              type="submit"
              className="floating-chat__send"
              aria-label="Enviar mensagem"
            >
              <PaperPlaneRight size={18} weight="fill" />
            </button>
          </form>
        </div>
      )}

      {/* Botão toggle */}
      <button
        className="floating-chat__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar chat' : 'Abrir chat'}
        aria-expanded={open}
      >
        {open ? <X size={24} weight="bold" /> : (
          <img src="/emilie.jpg" alt="Fale com a gente" className="floating-chat__toggle-photo" />
        )}
      </button>
    </div>
  );
}
