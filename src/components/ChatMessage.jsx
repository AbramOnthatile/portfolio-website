import { Alert } from 'react-bootstrap';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message-row ${isUser ? 'is-user' : 'is-assistant'}`}>
      {!isUser && <span className="chat-avatar" aria-hidden="true"><i className="bi bi-chat-square-text" /></span>}
      <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-assistant'}`}>
        <div className="chat-message-label">{isUser ? 'You' : 'Portfolio guide'}</div>
        <p>{message.text}</p>
        {message.links?.length > 0 && (
          <div className="chat-message-links">
            {message.links.map((link) => (
              <a key={`${link.href}-${link.label}`} href={link.href} target={link.href.startsWith('https://') ? '_blank' : undefined} rel={link.href.startsWith('https://') ? 'noreferrer' : undefined}>
                {link.label}<i className="bi bi-arrow-up-right" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
        {message.error && <Alert variant="warning" className="chat-inline-alert">{message.error}</Alert>}
      </div>
    </div>
  );
}