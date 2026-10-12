import { Button, Form } from 'react-bootstrap';

export const MAX_CHAT_MESSAGE_LENGTH = 500;

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
        placeholder="Ask about skills, projects, or links…"
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <Button type="submit" className="chat-send-button" disabled={disabled} aria-label="Send message">
        <i className="bi bi-arrow-up" aria-hidden="true" />
      </Button>
      <span className="chat-input-hint">Enter to send · Shift + Enter for a new line</span>
    </Form>
  );
}