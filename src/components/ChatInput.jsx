import { Button, Form } from 'react-bootstrap';
import { ArrowUp, LoaderCircle } from 'lucide-react';

export const MAX_CHAT_MESSAGE_LENGTH = 1200;

export default function ChatInput({ onSubmit, disabled = false }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const field = form.elements.namedItem('chat-question');
    const value = field.value.trim();
    if (!value || disabled) return;
    onSubmit(value);
    form.reset();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form.requestSubmit();
    }
  };

  return (
    <Form className="chat-input-form" onSubmit={handleSubmit}>
      <Form.Label className="visually-hidden" htmlFor="chat-question">Ask about Abram’s portfolio</Form.Label>
      <Form.Control
        id="chat-question"
        name="chat-question"
        as="textarea"
        rows={1}
        maxLength={MAX_CHAT_MESSAGE_LENGTH}
        placeholder="Ask Abram's AI assistant anything..."
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <Button type="submit" className="chat-send-button" disabled={disabled} aria-label={disabled ? 'AI assistant is responding' : 'Send message'}>
        {disabled ? <LoaderCircle className="chat-send-loading" size={17} aria-hidden="true" /> : <ArrowUp size={18} aria-hidden="true" />}
      </Button>
      <span className="chat-input-hint">Enter to send <span aria-hidden="true">·</span> AI-powered by OpenAI. Don&apos;t share sensitive information.</span>
    </Form>
  );
}