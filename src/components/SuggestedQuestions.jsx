import { Button } from 'react-bootstrap';
import { ArrowUpRight } from 'lucide-react';

export const suggestedQuestions = [
  'Tell me about Abram’s background.',
  'What programming languages does he know?',
  'Which frameworks has he worked with?',
  'Tell me about his development experience.',
  'What projects has he built?',
  'Is he experienced in backend development?',
  'How can I contact him?'
];

export default function SuggestedQuestions({ onSelect, disabled = false }) {
  return (
    <div className="chat-suggestions" aria-label="Suggested questions">
      <span>Explore Abram&apos;s portfolio</span>
      <div>
        {suggestedQuestions.map((question) => (
          <Button key={question} type="button" variant="outline-light" onClick={() => onSelect(question)} disabled={disabled}>
            {question}<ArrowUpRight size={13} aria-hidden="true" />
          </Button>
        ))}
      </div>
    </div>
  );
}
