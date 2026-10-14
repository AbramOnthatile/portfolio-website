import assert from 'node:assert/strict';
import test from 'node:test';
import { getChatbotReply } from './chatbotService.js';

const knowledge = {
  profile: {
    name: 'Abram Onthatile Mohlamonyane',
    role: 'Junior Software Developer',
    background: 'ICT Application Development graduate.',
    education: [{ qualification: 'Diploma in ICT Application Development', institution: 'Cape Peninsula University of Technology', year: '2025' }],
    experience: 'Hands-on project experience.'
  },
  skills: [
    { category: 'Frontend', items: ['JavaScript', 'React', 'Bootstrap'] },
    { category: 'Backend', items: ['Python', 'Java', 'Spring Boot'] },
    { category: 'Databases', items: ['MySQL', 'SQLite'] },
    { category: 'Workflow', items: ['Git', 'GitHub'] }
  ],
  languages: ['JavaScript', 'Java', 'Python'],
  technologyAliases: [
    { name: 'React', aliases: ['react', 'react js', 'reactjs'] },
    { name: 'Spring Boot', aliases: ['spring boot', 'spring'] },
    { name: 'Python', aliases: ['python', 'py'] },
    { name: 'JavaScript', aliases: ['javascript', 'js'] }
  ],
  projects: [
    { name: 'AnimeWear / Anime Store', slug: 'animewear', aliases: ['animewear', 'anime store'], description: 'A full-stack online store.', technologies: ['React', 'Spring Boot', 'MySQL'], repository: 'https://github.com/example/animewear', detailUrl: '#/projects/animewear' },
    { name: 'SentiX — AI Sentiment Intelligence', slug: 'sentix', aliases: ['sentix'], description: 'A review analysis project.', technologies: ['Python', 'Sentiment Analysis'], repository: null, detailUrl: '#/projects/sentix' }
  ],
  links: {
    cv: { label: 'Download CV', href: 'https://example.com/cv.pdf' },
    github: { label: 'GitHub profile', href: 'https://github.com/example' },
    linkedIn: { label: 'LinkedIn profile', href: 'https://linkedin.com/in/example' },
    email: { label: 'Email Abram', href: 'mailto:abram@example.com', address: 'abram@example.com' }
  }
};

test('answers general skills and programming language questions', () => {
  assert.match(getChatbotReply('WHAT SKILLS do you have?', knowledge).text, /Frontend: JavaScript, React, Bootstrap/);
  assert.match(getChatbotReply('Which programming languages do you know?', knowledge).text, /JavaScript, Java, Python/);
  assert.match(getChatbotReply('Do you know Python?', knowledge).text, /Python/);
  assert.match(getChatbotReply('What technologies do you use for backend development?', knowledge).text, /Backend: Python, Java, Spring Boot/);
});

test('filters projects by framework before general skill matching', () => {
  const reply = getChatbotReply('Which projects use Spring Boot?', knowledge);
  assert.match(reply.text, /AnimeWear/);
  assert.doesNotMatch(reply.text, /SentiX/);
  assert.equal(reply.links.some(({ label }) => label === 'GitHub repository'), true);
});

test('answers project details and reports undocumented projects', () => {
  assert.match(getChatbotReply('Tell me about SentiX', knowledge).text, /review analysis project/);
  assert.match(getChatbotReply('Tell me about the MoonBase project', knowledge).text, /don't find a project/);
  assert.match(getChatbotReply('Tell me about your projects', knowledge).text, /AnimeWear.*SentiX/s);
});

test('provides CV and published contact links only when configured', () => {
  assert.equal(getChatbotReply('Can I download your CV?', knowledge).links[0].href, knowledge.links.cv.href);
  assert.equal(getChatbotReply('How can I contact you?', knowledge).links[0].href, knowledge.links.email.href);
  assert.match(getChatbotReply('Where can I find your GitHub?', knowledge).text, /GitHub/);
  const productionKnowledge = { ...knowledge, links: { ...knowledge.links, cv: { label: 'Download CV', href: '/portfolio-website/assets/cv.pdf' } } };
  assert.equal(getChatbotReply('Can I download your CV?', productionKnowledge).links[0].href, '/portfolio-website/assets/cv.pdf');
});

test('returns a transparent fallback for unrelated questions', () => {
  assert.match(getChatbotReply('What is the weather on Mars?', knowledge).text, /rule-based portfolio helper/);
});

test('normalises punctuation and safely rejects unsafe links', () => {
  assert.match(getChatbotReply('  WHICH   PROJECTS USE React? ', knowledge).text, /AnimeWear/);
  assert.deepEqual(getChatbotReply('Can I view your CV?', { ...knowledge, links: { ...knowledge.links, cv: { label: 'CV', href: 'javascript:alert(1)' } } }).links, []);
});

test('returns a safe fallback when knowledge is missing or incomplete', () => {
  const fallback = getChatbotReply('Can I contact you?', null);
  assert.match(fallback.text, /rule-based portfolio helper|Please enter a question/);
  assert.deepEqual(fallback.links, []);

  const partial = getChatbotReply('Which projects use React?', { skills: [], languages: [], projects: [], technologyAliases: [], links: {} });
  assert.match(partial.text, /I don't find a project documenting React|rule-based portfolio helper|Here are the matching documented projects/);
  assert.ok(Array.isArray(partial.links));
});