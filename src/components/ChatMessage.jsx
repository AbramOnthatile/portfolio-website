import { Alert } from 'react-bootstrap';
import { ArrowUpRight, Bot } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message-row ${isUser ? 'is-user' : 'is-assistant'}`}>
      {!isUser && <span className="chat-avatar" aria-hidden="true"><Bot size={14} /></span>}
      <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-assistant'}`}>
        <div className="chat-message-label">{isUser ? 'You' : 'Abram’s AI assistant'}</div>
        <p>{message.text}</p>
        {message.links?.length > 0 && (
          <div className="chat-message-links">
            {message.links.map((link) => (
              <a key={`${link.href}-${link.label}`} href={link.href} target={link.href.startsWith('https://') ? '_blank' : undefined} rel={link.href.startsWith('https://') ? 'noreferrer' : undefined}>
                {link.label}<ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
        {message.error && <Alert variant="warning" className="chat-inline-alert">{message.error}</Alert>}
      </div>
    </div>
  );
}