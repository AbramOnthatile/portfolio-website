import { Button } from 'react-bootstrap';

export const suggestedQuestions = [
  'What are your technical skills?',
  'Tell me about your projects.',
  'Which projects use React?',
  'Which projects use Spring Boot?',
  'Can I view your CV?',
  'Where can I find your GitHub?',
  'How can I contact you?'
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div className="chat-suggestions" aria-label="Suggested questions">
      <span>Try asking</span>
      <div>
        {suggestedQuestions.map((question) => (
          <Button key={question} type="button" variant="outline-light" onClick={() => onSelect(question)}>
            {question}<i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Button>
        ))}
      </div>
    </div>
  );
}