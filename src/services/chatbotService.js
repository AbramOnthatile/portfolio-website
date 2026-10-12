const normalise = (value) => String(value)
  .toLocaleLowerCase('en')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9+#]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

const includesPhrase = (text, phrase) => {
  const query = ` ${normalise(text)} `;
  const target = ` ${normalise(phrase)} `;
  return target.trim().length > 0 && query.includes(target);
};

const matchesAny = (text, phrases = []) => phrases.some((phrase) => includesPhrase(text, phrase));

const safeLink = (link) => {
  if (!link?.href || !link?.label) return null;
  if (/^https:\/\//i.test(link.href) || /^http:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?\//i.test(link.href) || /^mailto:/i.test(link.href) || /^\/(?!\/)[a-z0-9_./%?=&-]+$/i.test(link.href) || /^#\/projects(?:\/[a-z0-9-]+)?$/i.test(link.href)) {
    return link;
  }
  return null;
};

const linksFrom = (...links) => links.flat(Infinity).map(safeLink).filter(Boolean);

const formatSkills = (groups) => groups
  .map(({ category, items }) => `${category}: ${items.join(', ')}`)
  .join('\n');

const matchProject = (query, knowledge) => knowledge.projects.find((project) =>
  [project.name, project.slug, ...(project.aliases || [])].some((name) => includesPhrase(query, name))
);

const matchingTechnologies = (query, knowledge) => (knowledge.technologyAliases || [])
  .filter(({ aliases, name }) => matchesAny(query, [...(aliases || []), name]))
  .sort((left, right) => Math.max(...[...(right.aliases || []), right.name].map(normalise).map((value) => value.length)) - Math.max(...[...(left.aliases || []), left.name].map(normalise).map((value) => value.length)));

const isProjectQuestion = (query) => matchesAny(query, [
  'project', 'projects', 'portfolio project', 'portfolio projects', 'project work', 'case study', 'case studies'
]);

const isBroadProjectQuestion = (query) => matchesAny(query, [
  'my projects', 'your projects', 'all projects', 'tell me about projects', 'tell me about your work',
  'show projects', 'list projects', 'what projects', 'portfolio projects', 'selected work', 'project portfolio'
]);

const findUnknownProject = (query) => {
  const ignored = new Set(['about', 'all', 'any', 'built', 'can', 'created', 'developed', 'did', 'do', 'for', 'from', 'have', 'me', 'my', 'of', 'project', 'projects', 'show', 'tell', 'the', 'these', 'those', 'use', 'uses', 'using', 'what', 'which', 'work', 'your']);
  return normalise(query).split(' ').filter((word) => !ignored.has(word)).join(' ').trim();
};

const projectSummary = (project) => `${project.name}: ${project.description} Technologies: ${project.technologies.join(', ')}.`;

const projectLinks = (project) => linksFrom(
  { label: 'Project details', href: project.detailUrl },
  project.repository && { label: 'GitHub repository', href: project.repository },
  project.demo && { label: 'Live demo', href: project.demo }
);

const skillsForTechnology = (technology, knowledge) => knowledge.skills
  .filter((group) => group.items.some((item) => normalise(item) === normalise(technology)))
  .map((group) => ({ category: group.category, items: group.items.filter((item) => normalise(item) === normalise(technology)) }));

const answerProjects = (projects, lead = 'Here are the matching documented projects:') => ({
  text: `${lead}\n${projects.map(projectSummary).join('\n')}`,
  links: linksFrom(projects.map(projectLinks))
});

export function getChatbotReply(input, knowledge) {
  const rawQuestion = String(input ?? '').slice(0, 500);
  const query = normalise(rawQuestion);

  if (!query) return { text: 'Please enter a question about the portfolio.', links: [] };

  const namedProject = matchProject(query, knowledge);
  const technologies = matchingTechnologies(query, knowledge);
  const asksForProjects = isProjectQuestion(query) || matchesAny(query, ['which projects', 'show me projects', 'projects use', 'projects built with', 'projects using']);

  if (namedProject) {
    return {
      text: `${projectSummary(namedProject)}${namedProject.repository ? '' : ' A GitHub repository link is not listed for this project.'}${namedProject.demo ? '' : ''}`,
      links: projectLinks(namedProject)
    };
  }

  if (asksForProjects && technologies.length > 0) {
    const requested = new Set(technologies.map(({ name }) => normalise(name)));
    const matches = knowledge.projects.filter((project) => project.technologies.some((technology) => requested.has(normalise(technology))));
    if (matches.length) return answerProjects(matches);
    return {
      text: `I don't find a project documenting ${technologies.map(({ name }) => name).join(', ')} in the portfolio. You can browse the project list for documented work.`,
      links: [{ label: 'Browse projects', href: '#/projects' }]
    };
  }

  if (isProjectQuestion(query) || matchesAny(query, ['project', 'projects'])) {
    if (isBroadProjectQuestion(query) || findUnknownProject(query).length === 0) {
      return answerProjects(knowledge.projects, 'Here are the projects currently documented in the portfolio:');
    }
    const requestedName = findUnknownProject(query);
    return {
      text: `I don't find a project called “${requestedName}” in the portfolio. I can only describe projects documented there.`,
      links: [{ label: 'Browse documented projects', href: '#/projects' }]
    };
  }

  if (matchesAny(query, ['education', 'qualification', 'qualifications', 'degree', 'diploma', 'university', 'college', 'study', 'studied', 'experience', 'background'])) {
    const education = knowledge.profile.education
      .map(({ qualification, institution, year }) => `${qualification}, ${institution}${year ? ` (${year})` : ''}`)
      .join('\n');
    return { text: `${knowledge.profile.background}\nEducation: ${education}\nExperience: ${knowledge.profile.experience}`, links: [] };
  }

  if (matchesAny(query, ['cv', 'resume', 'curriculum vitae', 'download resume', 'download cv'])) {
    const link = safeLink(knowledge.links.cv);
    return link
      ? { text: 'You can download my CV here.', links: [link] }
      : { text: 'The CV download link has not been configured yet.', links: [] };
  }

  if (matchesAny(query, ['linkedin', 'linked in'])) {
    const link = safeLink(knowledge.links.linkedIn);
    return link
      ? { text: 'My LinkedIn profile is available here.', links: [link] }
      : { text: 'The LinkedIn profile link has not been configured yet.', links: [] };
  }

  if (matchesAny(query, ['github', 'git hub', 'repository', 'repositories', 'source code', 'source'])) {
    const link = safeLink(knowledge.links.github);
    return link
      ? { text: 'You can find my public profile and repositories on GitHub.', links: [link] }
      : { text: 'The GitHub profile link has not been configured yet.', links: [] };
  }

  if (matchesAny(query, ['contact', 'email', 'reach', 'get in touch', 'how can i contact', 'contact details'])) {
    const emailLink = safeLink(knowledge.links.email);
    const linkedIn = safeLink(knowledge.links.linkedIn);
    return {
      text: `You can contact me at ${knowledge.links.email.address}.`,
      links: linksFrom(emailLink, linkedIn)
    };
  }

  if (matchesAny(query, ['language', 'languages', 'programming language', 'programming languages'])) {
    return { text: `The portfolio lists these programming languages and web fundamentals: ${knowledge.languages.join(', ')}.`, links: [] };
  }

  const requestedGroups = knowledge.skills.filter(({ category }) => {
    const key = normalise(category);
    if (key === 'frontend') return matchesAny(query, ['frontend', 'front end', 'client side', 'interface']);
    if (key === 'backend') return matchesAny(query, ['backend', 'back end', 'server side', 'server']);
    if (key === 'databases') return matchesAny(query, ['database', 'databases', 'data storage']);
    if (key === 'workflow') return matchesAny(query, ['workflow', 'development tools', 'tools', 'version control']);
    if (key === 'ai and data') return matchesAny(query, ['ai', 'artificial intelligence', 'data', 'machine learning']);
    return matchesAny(query, ['strengths', 'soft skills', 'core strengths']);
  });

  if (requestedGroups.length) {
    return { text: formatSkills(requestedGroups), links: [] };
  }

  if (technologies.length > 0) {
    const requestedGroups = technologies.flatMap(({ name }) => skillsForTechnology(name, knowledge));
    const uniqueGroups = [...new Map(requestedGroups.map((group) => [group.category, group])).values()];
    const reportedSkills = uniqueGroups.length ? uniqueGroups : knowledge.skills
      .map(({ category, items }) => ({ category, items: items.filter((item) => technologies.some(({ name }) => normalise(name) === normalise(item))) }))
      .filter(({ items }) => items.length > 0);
    const projectMatches = knowledge.projects.filter((project) => project.technologies.some((item) => technologies.some(({ name }) => normalise(name) === normalise(item))));
    if (reportedSkills.length) {
      const relatedProjects = projectMatches.length ? `\nProjects listing these technologies: ${projectMatches.map(({ name }) => name).join(', ')}.` : '';
      return { text: `These documented skills include ${technologies.map(({ name }) => name).join(', ')}:\n${formatSkills(reportedSkills)}.${relatedProjects}`, links: linksFrom(projectMatches.map(projectLinks)) };
    }
    return { text: `The portfolio doesn't list ${technologies.map(({ name }) => name).join(', ')} as a skill.`, links: [] };
  }

  if (matchesAny(query, ['skill', 'skills', 'technology', 'technologies', 'framework', 'frameworks', 'stack', 'what can you do'])) {
    return { text: `Here are my documented technical skills:\n${formatSkills(knowledge.skills)}`, links: [] };
  }

  if (matchesAny(query, ['name', 'who are you', 'who is abram', 'about you', 'your background', 'introduce yourself'])) {
    return { text: `${knowledge.profile.name} is a ${knowledge.profile.role}. ${knowledge.profile.background}`, links: [] };
  }

  return {
    text: 'I’m a rule-based portfolio helper, so I can answer questions about Abram’s background, skills, projects, education, CV, and contact links. Try one of the suggested questions.',
    links: []
  };
}

export { normalise };