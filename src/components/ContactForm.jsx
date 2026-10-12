import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useToast } from './ToastContext.jsx';

export default function ContactForm() {
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const showToast = useToast();

  const submitMessage = async (event) => {
    event.preventDefault();
    setStatus(null);
    setSending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    try {
      const response = await fetch('https://formsubmit.co/ajax/onthatileabram@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message, _subject: `Portfolio enquiry from ${name}` })
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success === false || result?.success === 'false') {
        throw new Error('Message submission was not accepted.');
      }

      form.reset();
      setStatus({ type: 'success', message: 'Your message has been sent. I’ll be in touch soon.' });
      showToast('Message sent successfully.');
    } catch {
      setStatus({ type: 'danger', message: 'Your message could not be sent right now. Please try again or copy my email address below.' });
      showToast('Message could not be sent.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Form className="contact-form" onSubmit={submitMessage}>
      <div className="row g-3">
        <Form.Group className="col-md-6" controlId="contactName">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Your name" autoComplete="name" required />
        </Form.Group>
        <Form.Group className="col-md-6" controlId="contactEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
        </Form.Group>
        <Form.Group className="col-12" controlId="contactMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control name="message" as="textarea" rows={6} placeholder="Tell me about your project or opportunity" required />
        </Form.Group>
      </div>
      {status && <Alert className="form-feedback mb-0" variant={status.type} role="status">{status.message}</Alert>}
      <div>
        <Button type="submit" className="button-primary" disabled={sending}>
          {sending ? 'Sending message…' : 'Send message'}
          <i className={`bi ${sending ? 'bi-arrow-repeat' : 'bi-arrow-up-right'} ms-2`} aria-hidden="true" />
        </Button>
      </div>
    </Form>
  );
}