const normalise = (value) => String(value ?? '')
  .toLocaleLowerCase('en')
  .replace(/[^a-z0-9+#]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

const includesPhrase = (text, phrase) => ` ${normalise(text)} `.includes(` ${normalise(phrase)} `);

const safeLink = (link) => {
  if (!link?.href || !link?.label) return null;
  if (/^https:\/\//i.test(link.href) || /^mailto:/i.test(link.href) || /^\/(?!\/)[a-z0-9_./%?=&-]+$/i.test(link.href) || /^#\/projects(?:\/[a-z0-9-]+)?$/i.test(link.href)) {
    return link;
  }
  return null;
};

const linksForQuestion = (question, knowledge) => {
  const query = String(question ?? '').toLocaleLowerCase('en');
  const links = [];
  const add = (link) => {
    const safe = safeLink(link);
    if (safe && !links.some(({ href }) => href === safe.href)) links.push(safe);
  };

  if (/\b(cv|resume|curriculum vitae)\b/i.test(query)) add(knowledge.links?.cv);
  if (/\b(github|git hub|repository|repositories|source code)\b/i.test(query)) add(knowledge.links?.github);
  if (/\b(contact|email|reach|linkedin|linked in|get in touch)\b/i.test(query)) {
    add(knowledge.links?.email);
    add(knowledge.links?.linkedIn);
  }

  const projectMatches = (knowledge.projects || []).filter((project) => {
    const names = [project.name, project.slug, ...(project.aliases || [])].filter(Boolean);
    return names.some((name) => includesPhrase(query, name));
  });
  const mentionedTechnologies = (knowledge.technologyAliases || [])
    .filter(({ name, aliases = [] }) => [name, ...aliases].some((technology) => includesPhrase(query, technology)))
    .map(({ name }) => normalise(name));
  const projectsUsingTechnology = (knowledge.projects || []).filter((project) =>
    (project.technologies || []).some((technology) => mentionedTechnologies.includes(normalise(technology)))
  );
  const asksAboutProjects = /\b(project|projects|built|portfolio work)\b/i.test(query);
  const projects = projectMatches.length
    ? projectMatches
    : projectsUsingTechnology.length
      ? projectsUsingTechnology
      : asksAboutProjects
        ? knowledge.projects || []
        : [];
  const specificProject = projectMatches.length === 1;

  projects.forEach((project) => {
    add({ label: `${project.name} details`, href: project.detailUrl });
    if (specificProject) {
      add(project.repository && { label: 'GitHub repository', href: project.repository });
      add(project.demo && { label: 'Live demo', href: project.demo });
    }
  });

  return links;
};

export async function getChatbotReply(messages, knowledge, { signal } = {}) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Please enter a question to get started.');
  }

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: messages.slice(-12), knowledge }),
    signal
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('The AI assistant returned an unreadable response. Please try again.');
  }

  if (!response.ok) {
    throw new Error(result?.error || 'The AI assistant is temporarily unavailable. Please try again shortly.');
  }

  if (typeof result?.reply !== 'string' || !result.reply.trim()) {
    throw new Error('The AI assistant returned an empty response. Please try again.');
  }

  return {
    text: result.reply.trim(),
    links: linksForQuestion(messages[messages.length - 1]?.content, knowledge || {})
  };
}

export async function getChatbotAvailability({ signal } = {}) {
  const response = await fetch('/api/chat', { method: 'GET', signal });
  let result;
  try {
    result = await response.json();
  } catch {
    return false;
  }
  return response.ok && result?.available === true;
}

export { linksForQuestion, safeLink };
