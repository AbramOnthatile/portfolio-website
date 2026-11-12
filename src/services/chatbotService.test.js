import assert from 'node:assert/strict';
import test from 'node:test';
import { getChatbotAvailability, getChatbotReply, linksForQuestion, safeLink } from './chatbotService.js';

const knowledge = {
  projects: [
    {
      name: 'Hoodline E-Commerce',
      slug: 'hoodline',
      aliases: ['hoodline'],
      detailUrl: '#/projects/hoodline',
      repository: 'https://github.com/example/hoodline',
      demo: 'https://hoodline.example.com',
      technologies: ['React']
    }
  ],
  technologyAliases: [{ name: 'React', aliases: ['react', 'react js'] }],
  links: {
    cv: { label: 'Download CV', href: '/assets/cv.pdf' },
    github: { label: 'GitHub profile', href: 'https://github.com/example' },
    linkedIn: { label: 'LinkedIn profile', href: 'https://linkedin.com/in/example' },
    email: { label: 'Email Abram', href: 'mailto:abram@example.com' }
  }
};

test('sends recruiter questions and follow-up history with portfolio knowledge to the Vercel API', async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  let requestUrl;
  let requestBody;
  globalThis.fetch = async (url, options) => {
    requestUrl = url;
    requestBody = JSON.parse(options.body);
    return new Response(JSON.stringify({ reply: 'Abram is a CPUT graduate with practical project experience.' }), { status: 200 });
  };

  const conversation = [
    { role: 'user', content: 'Tell me about Abram’s background.' },
    { role: 'assistant', content: 'Abram is an ICT graduate.' },
    { role: 'user', content: 'Which of his projects use React?' }
  ];
  const reply = await getChatbotReply(conversation, knowledge);

  assert.equal(requestUrl, '/api/chat');
  assert.deepEqual(requestBody.messages, conversation);
  assert.deepEqual(requestBody.knowledge, knowledge);
  assert.match(reply.text, /CPUT graduate/);
});

test('only returns links already present in the portfolio knowledge', () => {
  const projectLinks = linksForQuestion('Tell me about Hoodline', knowledge);
  assert.deepEqual(projectLinks.map(({ href }) => href), [
    '#/projects/hoodline',
    'https://github.com/example/hoodline',
    'https://hoodline.example.com'
  ]);
  assert.deepEqual(linksForQuestion('Which projects use React?', knowledge).map(({ href }) => href), ['#/projects/hoodline']);
  assert.deepEqual(linksForQuestion('What projects has he built?', knowledge).map(({ href }) => href), ['#/projects/hoodline']);
  assert.deepEqual(linksForQuestion('Can I see your CV and contact you?', knowledge).map(({ href }) => href), [
    '/assets/cv.pdf',
    'mailto:abram@example.com',
    'https://linkedin.com/in/example'
  ]);
  assert.deepEqual(safeLink({ label: 'Unsafe', href: 'javascript:alert(1)' }), null);
});

test('surfaces server errors and rejects empty requests', async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  globalThis.fetch = async () => new Response(JSON.stringify({ error: 'AI service is not configured.' }), { status: 503 });

  await assert.rejects(
    getChatbotReply([{ role: 'user', content: 'How can I contact Abram?' }], knowledge),
    /AI service is not configured/
  );
  await assert.rejects(getChatbotReply([], knowledge), /Please enter a question/);
});

test('reports whether the deployed AI function is configured', async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => { globalThis.fetch = originalFetch; });
  let method;
  globalThis.fetch = async (_url, options) => {
    method = options.method;
    return new Response(JSON.stringify({ available: true }), { status: 200 });
  };

  assert.equal(await getChatbotAvailability(), true);
  assert.equal(method, 'GET');
});
