import { cvFile, projects, skillGroups } from '../data.js';

const profile = {
  name: 'Abram Onthatile Mohlamonyane',
  role: 'Junior Software Developer and ICT Application Development graduate',
  background: 'An ICT Application Development graduate from Cape Peninsula University of Technology with hands-on experience building web applications, backend systems, APIs, databases, and AI-related projects.',
  education: [
    {
      qualification: 'Diploma in ICT Application Development',
      institution: 'Cape Peninsula University of Technology',
      year: '2025'
    }
  ],
  experience: 'Hands-on project experience building web applications, backend systems, APIs, databases, and AI-related projects. The portfolio does not document formal employment history or a number of years in industry.'
};

export const portfolioKnowledge = {
  profile,
  skills: skillGroups.map(({ name, items }) => ({ category: name, items })),
  languages: ['HTML', 'CSS', 'JavaScript', 'Java', 'Python'],
  projects: projects.map((project) => ({
    name: project.name,
    slug: project.slug,
    aliases: [...new Set([project.slug, ...project.name.split(/[—/]/).map((name) => name.trim())])],
    description: project.summary,
    technologies: project.technologies,
    repository: project.repository || null,
    demo: project.demo || null,
    detailUrl: `#/projects/${project.slug}`
  })),
  technologyAliases: [
    { name: 'Spring Boot', aliases: ['spring boot', 'spring'] },
    { name: 'JavaScript', aliases: ['javascript', 'js'] },
    { name: 'React', aliases: ['react', 'react js', 'reactjs'] },
    { name: 'Python', aliases: ['python', 'py'] },
    { name: 'Java', aliases: ['java'] },
    { name: 'HTML', aliases: ['html', 'html5'] },
    { name: 'CSS', aliases: ['css', 'css3'] },
    { name: 'Bootstrap', aliases: ['bootstrap', 'bootstrap 5'] },
    { name: 'Django', aliases: ['django'] },
    { name: 'Flask', aliases: ['flask'] },
    { name: 'MySQL', aliases: ['mysql'] },
    { name: 'PostgreSQL', aliases: ['postgresql', 'postgres'] },
    { name: 'MongoDB', aliases: ['mongodb', 'mongo'] },
    { name: 'SQLite', aliases: ['sqlite'] },
    { name: 'Machine Learning', aliases: ['machine learning', 'ml'] },
    { name: 'Sentiment Analysis', aliases: ['sentiment analysis', 'sentiment'] },
    { name: 'REST APIs', aliases: ['rest api', 'rest apis', 'api', 'apis'] },
    { name: 'SQL', aliases: ['sql'] },
    { name: 'NFC', aliases: ['nfc'] },
    { name: 'Git', aliases: ['git'] },
    { name: 'GitHub', aliases: ['github'] },
    { name: 'UI/UX', aliases: ['ui ux', 'ux'] }
  ],
  links: {
    cv: { label: 'Download CV', href: cvFile },
    github: { label: 'GitHub profile', href: 'https://github.com/abramonthatile' },
    linkedIn: { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/onthatile-mohlamonyane' },
    email: { label: 'Email Abram', href: 'mailto:onthatileabram@gmail.com', address: 'onthatileabram@gmail.com' }
  }
};