import { cvFile, showcasedProjects } from '../data.js';

const profile = {
  name: 'Abram Onthatile Mohlamonyane',
  role: 'Junior Software Developer and ICT Application Development graduate',
  background: 'Abram is an ICT Application Development graduate from Cape Peninsula University of Technology with practical experience building web applications, APIs, backend systems, databases, and AI-related projects.',
  education: [
    {
      qualification: 'Diploma in ICT Application Development',
      institution: 'Cape Peninsula University of Technology (CPUT)',
      completed: 2025,
      graduated: 2026
    }
  ],
  experience: [
    {
      title: 'Computer Lab Assistant',
      organisation: 'Cape Peninsula University of Technology (CPUT)',
      details: 'The role is documented, but dates and responsibilities are not available in the portfolio knowledge base.'
    },
    {
      title: 'Digital Associate – Software Development',
      organisation: 'CAPACITI',
      dates: '2026',
      details: [
        'Participated in hands-on full-stack software development training and built practical projects using React, Java, Spring Boot, Django, Node.js/Express, and REST APIs.',
        'Designed relational database schemas and built REST endpoints for data-driven web applications.',
        'Collaborated in simulated Agile sprints, daily stand-ups, and peer code reviews using Git and GitHub.',
        'Developed application features, tested third-party API integrations, and incorporated AI-driven modules into software capstones.',
        'Participated in technical workshops, peer reviews, and mentorship sessions.'
      ]
    }
  ]
};

const additionalSkills = [
  { category: 'Programming languages', items: ['Java', 'JavaScript', 'Python', 'PHP', 'Kotlin (basic)'] },
  { category: 'Backend frameworks and runtimes', items: ['Spring Boot', 'Django', 'Flask', 'Laravel', 'Express.js', 'Node.js'] },
  { category: 'Frontend technologies', items: ['React', 'Bootstrap', 'HTML5', 'CSS3', 'Material UI'] },
  { category: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'] },
  { category: 'Developer tools', items: ['Git', 'GitHub', 'IntelliJ IDEA', 'Visual Studio Code'] }
];

export const portfolioKnowledge = {
  profile,
  skills: additionalSkills.map(({ category, items }) => ({ category, items })),
  languages: additionalSkills[0].items,
  projects: showcasedProjects.map((project) => ({
    name: project.name,
    slug: project.slug,
    aliases: [...new Set([project.slug, ...project.name.split(/[—/]/).map((name) => name.trim())])],
    description: project.summary,
    overview: project.overview,
    role: project.role,
    features: project.features,
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
    { name: 'PHP', aliases: ['php'] },
    { name: 'Kotlin', aliases: ['kotlin'] },
    { name: 'HTML5', aliases: ['html', 'html5'] },
    { name: 'CSS3', aliases: ['css', 'css3'] },
    { name: 'Bootstrap', aliases: ['bootstrap', 'bootstrap 5'] },
    { name: 'Django', aliases: ['django'] },
    { name: 'Flask', aliases: ['flask'] },
    { name: 'Laravel', aliases: ['laravel'] },
    { name: 'Express.js', aliases: ['express', 'express js'] },
    { name: 'Node.js', aliases: ['node', 'node js'] },
    { name: 'Material UI', aliases: ['material ui', 'mui'] },
    { name: 'MySQL', aliases: ['mysql'] },
    { name: 'PostgreSQL', aliases: ['postgresql', 'postgres'] },
    { name: 'MongoDB', aliases: ['mongodb', 'mongo'] },
    { name: 'SQLite', aliases: ['sqlite'] },
    { name: 'Machine Learning', aliases: ['machine learning', 'ml'] },
    { name: 'REST APIs', aliases: ['rest api', 'rest apis', 'api', 'apis'] },
    { name: 'Git', aliases: ['git'] },
    { name: 'GitHub', aliases: ['github'] },
    { name: 'IntelliJ IDEA', aliases: ['intellij', 'intellij idea'] },
    { name: 'Visual Studio Code', aliases: ['vs code', 'visual studio code', 'vscode'] },
    { name: 'UI/UX', aliases: ['ui ux', 'ux'] }
  ],
  links: {
    cv: { label: 'Download CV', href: cvFile },
    github: { label: 'GitHub profile', href: 'https://github.com/abramonthatile' },
    linkedIn: { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/onthatile-mohlamonyane' },
    email: { label: 'Email Abram', href: 'mailto:onthatileabram@gmail.com', address: 'onthatileabram@gmail.com' }
  }
};
