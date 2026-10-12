import { useEffect, useRef, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import ChatInput, { MAX_CHAT_MESSAGE_LENGTH } from './ChatInput.jsx';
import ChatMessage from './ChatMessage.jsx';
import SuggestedQuestions from './SuggestedQuestions.jsx';
import { portfolioKnowledge } from '../data/portfolioKnowledge.js';
import { getChatbotReply } from '../services/chatbotService.js';

const makeWelcomeMessage = () => ({
  id: 'welcome',
  role: 'assistant',
  text: `Hi, I’m a rule-based guide to ${portfolioKnowledge.profile.name}’s portfolio. Ask me about documented skills, projects, education, the CV, or contact links.`
});

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([makeWelcomeMessage()]);
  const endOfMessagesRef = useRef(null);
  const conversationRef = useRef(null);

  useEffect(() => {
    if (isOpen) endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isOpen, messages]);

  const submitQuestion = (question) => {
    const text = String(question ?? '').trim().slice(0, MAX_CHAT_MESSAGE_LENGTH);
    if (!text) return;

    const userMessage = { id: makeId(), role: 'user', text };
    const reply = getChatbotReply(text, portfolioKnowledge);
    const assistantMessage = { id: makeId(), role: 'assistant', text: reply.text, links: reply.links };
    setMessages((current) => [...current, userMessage, assistantMessage]);
  };

  const clearConversation = () => {
    setMessages([makeWelcomeMessage()]);
    conversationRef.current?.focus();
  };

  return (
    <div className="portfolio-chat">
      {isOpen && (
        <section className="chat-window" id="chatbot-window" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <header className="chat-header">
            <span className="chat-header-icon" aria-hidden="true"><i className="bi bi-chat-square-text" /></span>
            <div className="chat-heading-copy">
              <h2 id="chat-title">Portfolio guide</h2>
              <span><span className="chat-online-dot" /> Local answers · no AI service</span>
            </div>
            <div className="chat-header-actions">
              <Button type="button" variant="link" onClick={clearConversation} aria-label="Clear conversation" title="Clear conversation">
                <i className="bi bi-trash3" aria-hidden="true" />
              </Button>
              <Button type="button" variant="link" onClick={() => setIsOpen(false)} aria-label="Minimise chatbot" title="Minimise chatbot">
                <i className="bi bi-dash-lg" aria-hidden="true" />
              </Button>
            </div>
          </header>

          <div className="chat-conversation" ref={conversationRef} tabIndex={-1} role="log" aria-live="polite" aria-relevant="additions text" aria-label="Chat conversation">
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
            {messages.length === 1 && <SuggestedQuestions onSelect={submitQuestion} />}
            <div ref={endOfMessagesRef} />
          </div>

          <ChatInput onSubmit={submitQuestion} />
        </section>
      )}

      <Button
        type="button"
        className={`chat-launcher${isOpen ? ' is-open' : ''}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close portfolio chatbot' : 'Open portfolio chatbot'}
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'chatbot-window' : undefined}
      >
        <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-chat-dots-fill'}`} aria-hidden="true" />
        {!isOpen && <span>Ask about my portfolio</span>}
        <Badge bg="transparent" className="chat-rule-badge">RULE-BASED</Badge>
      </Button>
    </div>
  );
}