import { useState, useEffect, useRef, useCallback } from 'react';
import { X, PaperPlaneRight } from '@phosphor-icons/react';
import './FloatingChat.css';

interface BotMessage {
  id: number;
  text: string;
  delay: number;
}

const BOT_MESSAGES: BotMessage[] = [
  { id: 1, text: '👋 Olá! Seja bem-vindo(a) à IBMEC Jr. Soluções!', delay: 500 },
  { id: 2, text: 'Podemos ajudar sua empresa com consultoria estratégica, marketing, processos e muito mais.', delay: 2000 },
  { id: 3, text: 'Quer um diagnóstico gratuito? É só clicar abaixo 👇', delay: 3500 },
];

/* Fases da sequência pré-abertura:
   idle → typing → message (typewriter) → open */
type PrePhase = 'idle' | 'typing' | 'message' | 'done';

const PRE_MESSAGE = 'Quer ajuda para descobrir o que sua empresa está precisando?';

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [visibleMsgs, setVisibleMsgs] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [prePhase, setPrePhase] = useState<PrePhase>('idle');
  const [typewriterText, setTypewriterText] = useState('');
  const [doneTyping, setDoneTyping] = useState(false);
  const chatTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoOpened = useRef(false);
  const hasBeenOpen = useRef(false);

  const clearChatTimers = useCallback(() => {
    chatTimersRef.current.forEach(clearTimeout);
    chatTimersRef.current = [];
  }, []);

  // Sequência pré-abertura: idle → typing (2s) → typewriter message → auto-open
  useEffect(() => {
    if (hasAutoOpened.current) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let twInterval: ReturnType<typeof setInterval> | null = null;

    const t1 = setTimeout(() => setPrePhase('typing'), 2000);
    const t2 = setTimeout(() => {
      setPrePhase('message');
      let i = 0;
      setTypewriterText('');
      twInterval = setInterval(() => {
        i++;
        setTypewriterText(PRE_MESSAGE.slice(0, i));
        if (i >= PRE_MESSAGE.length) {
          if (twInterval) clearInterval(twInterval);
          twInterval = null;
        }
      }, 35);
    }, 4500);
    const t3 = setTimeout(() => {
      if (!hasAutoOpened.current) {
        hasAutoOpened.current = true;
        setPrePhase('done');
        setOpen(true);
      }
    }, 10000);

    timers.push(t1, t2, t3);
    return () => {
      timers.forEach(clearTimeout);
      if (twInterval) clearInterval(twInterval);
    };
  }, []);

  // Ao abrir: exibe msgs do chat com delays + dots de digitação
  useEffect(() => {
    if (!open) {
      if (hasBeenOpen.current) {
        clearChatTimers();
        setVisibleMsgs([]);
        setTyping(false);
      }
      return;
    }

    hasBeenOpen.current = true;
    // Marca sequência como concluída
    setPrePhase('done');

    BOT_MESSAGES.forEach((msg) => {
      const dotTimer = setTimeout(
        () => setTyping(true),
        Math.max(0, msg.delay - 600)
      );
      const msgTimer = setTimeout(() => {
        setTyping(false);
        setVisibleMsgs((prev) => [...prev, msg.id]);
      }, msg.delay);
      chatTimersRef.current.push(dotTimer, msgTimer);
    });

    return () => clearChatTimers();
  }, [open, clearChatTimers]);

  // Scroll para o fundo quando novas msgs aparecem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [visibleMsgs, typing]);

  const handleOpen = () => {
    hasAutoOpened.current = true;
    setPrePhase('done');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDoneTyping(false);
  };

  // Quando chat fecha e prePhase é 'done', mostra dots → mensagem
  useEffect(() => {
    if (open || prePhase !== 'done') return;
    setDoneTyping(false);
    const t = setTimeout(() => setDoneTyping(true), 1500);
    return () => clearTimeout(t);
  }, [open, prePhase]);

  const handleCTA = () => {
    window.location.href = '#contato';
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    window.location.href = '#contato';
    setOpen(false);
  };

  return (
    <div
      className={`floating-chat${open ? ' floating-chat--open' : ''}`}
      role="region"
      aria-label="Chat de atendimento"
    >
      {/* Sequência pré-abertura: typing dots → mensagem */}
      {!open && prePhase === 'typing' && (
        <div className="floating-chat__pre-bubble floating-chat__pre-bubble--typing" aria-hidden="true">
          <span className="floating-chat__dot" />
          <span className="floating-chat__dot" />
          <span className="floating-chat__dot" />
        </div>
      )}

      {!open && prePhase === 'message' && (
        <div className="floating-chat__pre-bubble floating-chat__pre-bubble--msg" aria-hidden="true">
          <p>
            {typewriterText.length <= 32
              ? typewriterText
              : (
                  <>
                    {PRE_MESSAGE.slice(0, 32)}
                    <strong>{typewriterText.slice(32, 59)}</strong>
                    {typewriterText.slice(59)}
                  </>
                )}
            <span className="floating-chat__cursor">|</span>
          </p>
        </div>
      )}

      {!open && prePhase === 'done' && !doneTyping && (
        <div className="floating-chat__pre-bubble floating-chat__pre-bubble--typing" aria-hidden="true">
          <span className="floating-chat__dot" />
          <span className="floating-chat__dot" />
          <span className="floating-chat__dot" />
        </div>
      )}

      {!open && prePhase === 'done' && doneTyping && (
        <div className="floating-chat__pre-bubble floating-chat__pre-bubble--msg" aria-hidden="true">
          <p>
            {PRE_MESSAGE.slice(0, 32)}
            <strong>{PRE_MESSAGE.slice(32, 59)}</strong>
            {PRE_MESSAGE.slice(59)}
          </p>
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
              onClick={handleClose}
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

            {typing && (
              <div className="floating-chat__msg floating-chat__msg--bot floating-chat__msg--typing" aria-label="Digitando...">
                <span className="floating-chat__dot" />
                <span className="floating-chat__dot" />
                <span className="floating-chat__dot" />
              </div>
            )}

            {visibleMsgs.includes(3) && (
              <button className="floating-chat__cta-btn btn btn--primary" onClick={handleCTA}>
                Solicitar Diagnóstico Gratuito
              </button>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
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

      {/* Botão toggle — só aparece quando chat está fechado */}
      {!open && (
        <button
          className="floating-chat__toggle"
          onClick={handleOpen}
          aria-label="Abrir chat"
          aria-expanded={false}
        >
          <img src="/emilie.jpg" alt="Fale com a gente" className="floating-chat__toggle-photo" />
        </button>
      )}
    </div>
  );
}
