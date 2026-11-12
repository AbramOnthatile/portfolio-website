import { useEffect, useRef, useState } from 'react';
import { Bot, MessageCircle, Minimize2, Plus, Sparkles, Trash2 } from 'lucide-react';
import { Button } from 'react-bootstrap';
import ChatInput from './ChatInput.jsx';
import ChatMessage from './ChatMessage.jsx';
import SuggestedQuestions from './SuggestedQuestions.jsx';
import { portfolioKnowledge } from '../data/portfolioKnowledge.js';
import { getChatbotAvailability, getChatbotReply } from '../services/chatbotService.js';

const welcomeMessage = {
  id: 'welcome',
  role: 'assistant',
  text: "Hello! I'm Abram's AI Portfolio Assistant. I can tell you about his technical skills, education, development experience and projects. What would you like to know?"
};

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [assistantStatus, setAssistantStatus] = useState('checking');
  const endOfMessagesRef = useRef(null);
  const conversationRef = useRef(null);
  const activeRequestRef = useRef(null);
  const availabilityRequestRef = useRef(null);

  useEffect(() => {
    if (isOpen) endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isOpen, isTyping, messages]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const controller = new AbortController();
    availabilityRequestRef.current = controller;
    setAssistantStatus('checking');
    getChatbotAvailability({ signal: controller.signal })
      .then((available) => {
        if (!controller.signal.aborted) setAssistantStatus(available ? 'online' : 'offline');
      })
      .catch(() => {
        if (!controller.signal.aborted) setAssistantStatus('offline');
      });
    return () => {
      controller.abort();
      if (availabilityRequestRef.current === controller) availabilityRequestRef.current = null;
    };
  }, [isOpen]);

  const cancelRequest = () => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    setIsTyping(false);
  };

  const startNewConversation = () => {
    cancelRequest();
    setMessages([welcomeMessage]);
  };

  const clearHistory = () => {
    cancelRequest();
    setMessages([]);
  };

  const submitQuestion = async (question) => {
    const text = String(question ?? '').trim().slice(0, 1200);
    if (!text || isTyping) return;

    const userMessage = { id: makeId(), role: 'user', text };
    availabilityRequestRef.current?.abort();
    availabilityRequestRef.current = null;
    const conversation = [
      ...messages.filter((message) => message.id !== 'welcome').map(({ role, text: content }) => ({ role, content })),
      { role: 'user', content: text }
    ];
    const controller = new AbortController();
    activeRequestRef.current = controller;
    setAssistantStatus('checking');
    setIsTyping(true);
    setMessages((current) => [...current, userMessage]);

    try {
      const reply = await getChatbotReply(conversation, portfolioKnowledge, { signal: controller.signal });
      if (controller.signal.aborted) return;
      setAssistantStatus('online');
      setMessages((current) => [...current, {
        id: makeId(),
        role: 'assistant',
        text: reply.text,
        links: reply.links
      }]);
    } catch (error) {
      if (controller.signal.aborted) return;
      setAssistantStatus('offline');
      setMessages((current) => [...current, {
        id: makeId(),
        role: 'assistant',
        text: error.message || 'I could not reach the AI service. Please try again shortly.',
        error: 'Your message is still here. You can try again when the assistant is available.'
      }]);
    } finally {
      if (activeRequestRef.current === controller) {
        activeRequestRef.current = null;
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="portfolio-chat">
      {isOpen && (
        <section className="chat-window" id="chatbot-window" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <header className="chat-header">
            <span className="chat-header-icon" aria-hidden="true"><Bot size={20} /></span>
            <div className="chat-heading-copy">
              <h2 id="chat-title">Abram&apos;s AI Assistant</h2>
              <span><span className={`chat-online-dot is-${assistantStatus}`} />{assistantStatus === 'online' ? 'Online · Portfolio assistant' : assistantStatus === 'checking' ? 'Connecting to AI assistant' : 'AI assistant temporarily unavailable'}</span>
            </div>
            <div className="chat-header-actions">
              <Button type="button" variant="link" onClick={startNewConversation} aria-label="Start a new conversation" title="New conversation">
                <Plus size={17} aria-hidden="true" />
              </Button>
              <Button type="button" variant="link" onClick={clearHistory} aria-label="Clear chat history" title="Clear chat history">
                <Trash2 size={16} aria-hidden="true" />
              </Button>
              <Button type="button" variant="link" onClick={() => setIsOpen(false)} aria-label="Minimise chatbot" title="Minimise chatbot">
                <Minimize2 size={16} aria-hidden="true" />
              </Button>
            </div>
          </header>

          <div className="chat-conversation" ref={conversationRef} tabIndex={-1} role="log" aria-live="polite" aria-relevant="additions text" aria-label="Chat conversation">
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
            {messages.length === 0 && <p className="chat-cleared-message">Your chat history has been cleared.</p>}
            {(messages.length === 0 || messages.length === 1) && <SuggestedQuestions onSelect={submitQuestion} disabled={isTyping} />}
            {isTyping && (
              <div className="chat-message-row is-assistant" role="status" aria-label="AI assistant is typing">
                <span className="chat-avatar" aria-hidden="true"><Sparkles size={14} /></span>
                <div className="chat-typing-indicator" aria-hidden="true"><i /><i /><i /></div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          <ChatInput onSubmit={submitQuestion} disabled={isTyping} />
        </section>
      )}

      <Button
        type="button"
        className={`chat-launcher${isOpen ? ' is-open' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close AI portfolio assistant' : 'Open AI portfolio assistant'}
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'chatbot-window' : undefined}
      >
        {isOpen ? <MessageCircle size={19} aria-hidden="true" /> : <Sparkles size={19} aria-hidden="true" />}
        {!isOpen && <span>Ask Abram&apos;s AI</span>}
        {!isOpen && <span className="chat-ai-badge">AI ASSISTANT</span>}
      </Button>
    </div>
  );
}
