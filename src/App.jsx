import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Modal, Row, Toast, ToastContainer } from 'react-bootstrap';
import { ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, BriefcaseBusiness, Code2, Database, Download, GitBranch, GraduationCap, LayoutTemplate, Mail, MapPin, Server, Workflow } from 'lucide-react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import ChatbotWidget from './components/ChatbotWidget.jsx';
import ContactForm from './components/ContactForm.jsx';
import DeveloperTerminal from './components/DeveloperTerminal.jsx';
import FrameworkCard from './components/FrameworkCard.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import { ToastContext } from './components/ToastContext.jsx';
import { certificates, cvFile, frameworkGroups, profileImage, projects, showcasedProjects, skillGroups } from './data.js';

const pageTitles = {
  '/': 'Abram Mohlamonyane | Software Developer',
  '/about': 'About | Abram Mohlamonyane',
  '/projects': 'Projects | Abram Mohlamonyane',
  '/skills': 'Skills | Abram Mohlamonyane',
  '/certificates': 'Certificates | Abram Mohlamonyane',
  '/cv': 'CV | Abram Mohlamonyane',
  '/contact': 'Contact | Abram Mohlamonyane'
};

function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const project = pathname.startsWith('/projects/') ? projects.find((item) => pathname.endsWith(item.slug)) : null;
    document.title = project ? `${project.name} | Abram Onthatile Mohlamonyane` : pageTitles[pathname] || 'TECHNOVERSE | Abram Mohlamonyane';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function PageHeading({ eyebrow, title, description }) {
  return (
    <header className="page-heading">
      <p className="eyebrow"><span />{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="page-lede">{description}</p>}
    </header>
  );
}

function TechnologyChips({ items }) {
  return <div className="tech-tags">{items.map((item) => <Badge bg="transparent" className="tech-tag" key={item}>{item}</Badge>)}</div>;
}

const skillIcons = {
  code: Code2,
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  workflow: Workflow,
  sparkles: BrainCircuit
};

function HomePage() {
  return (
    <>
      <section className="home-hero" id="home">
        <Container>
          <div className="hero-topline"><span>TECHNOVERSE <i>/</i> THE DEVELOPER&apos;S DIGITAL SPACE</span><span className="availability"><i /> OPEN TO OPPORTUNITIES</span></div>
          <Row className="align-items-center gy-5 hero-grid">
            <Col lg={7} className="hero-copy">
              <p className="hero-overline"><span /> SOFTWARE DEVELOPER · CAPE TOWN, ZA</p>
              <h1>Hello, I&apos;m<br /><span>Abram.</span></h1>
              <p className="hero-role">Backend &amp; Full-Stack Development</p>
              <p className="hero-summary">I&apos;m an ICT Application Development graduate who enjoys building dependable web applications, thoughtful backend systems, and software that solves practical problems.</p>
              <div className="hero-actions">
                <Button as={Link} to="/projects" className="button-primary">View projects <ArrowRight size={17} /></Button>
                <Button href={cvFile} download className="button-outline">Download CV <Download size={16} /></Button>
                <Button as={Link} to="/contact" variant="link" className="hero-contact-link">Contact me <ArrowUpRight size={16} /></Button>
              </div>
              <div className="hero-stack"><span>BUILDING WITH</span><b>Java</b><i /><b>Spring Boot</b><i /><b>React</b><i /><b>Python</b></div>
            </Col>
            <Col lg={5}>
              <div className="hero-visual">
                <div className="hero-image-frame"><img src={profileImage} alt="Abram Onthatile Mohlamonyane" fetchPriority="high" /></div>
                <div className="hero-image-label"><span>ABRAM ONTHATILE MOHLAMONYANE</span><span>SOFTWARE / 01</span></div>
                <div className="hero-location"><MapPin size={14} /> Cape Town, South Africa</div>
                <DeveloperTerminal />
              </div>
            </Col>
          </Row>
          <a className="hero-scroll" href="#selected-work"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </Container>
      </section>

      <section className="section-block selected-work" id="selected-work">
        <Container>
          <div className="section-intro"><div><p className="eyebrow"><span /> SELECTED WORK / 03</p><h2>Software built<br /><em>for real people.</em></h2></div><p className="section-aside">A selection of live products across commerce, career guidance, and applied AI.</p></div>
          <Row className="g-4 project-list">{showcasedProjects.map((project, index) => <Col md={6} xl={4} key={project.slug}><ProjectCard project={project} index={index} /></Col>)}</Row>
          <div className="section-endnote"><span>01 — 03</span><span>SELECTED PROJECTS</span><Link to="/projects">Explore the work <ArrowUpRight size={15} /></Link></div>
        </Container>
      </section>

      <section className="about-band">
        <Container><Row className="g-5 align-items-start"><Col lg={4}><p className="eyebrow"><span /> A LITTLE ABOUT ME</p><h2>Curiosity,<br />with a <em>purpose.</em></h2></Col><Col lg={8}><p className="about-lede">I&apos;m a software developer and ICT Application Development graduate from Cape Peninsula University of Technology.</p><p className="about-copy">I like working where product thinking meets engineering: understanding the problem, shaping a clear user flow, and building the systems that make it work. My project experience spans web applications, APIs, data, and backend development.</p><Link className="text-link" to="/about">More about Abram <ArrowRight size={16} /></Link></Col></Row></Container>
      </section>

      <section className="section-block skills-preview">
        <Container><div className="section-intro"><div><p className="eyebrow"><span /> TECHNICAL TOOLKIT</p><h2>Tools for the<br /><em>whole stack.</em></h2></div><Link className="text-link" to="/skills">View all skills <ArrowRight size={16} /></Link></div>
          <Row className="g-3">{skillGroups.slice(0, 4).map((group) => { const Icon = skillIcons[group.icon]; return <Col sm={6} xl={3} key={group.name}><div className="skill-preview-item"><Icon size={20} /><span>{group.name}</span><strong>{group.items.slice(0, 3).join(' · ')}</strong></div></Col>; })}</Row>
        </Container>
      </section>

      <section className="journey-band">
        <Container><div className="section-intro"><div><p className="eyebrow"><span /> EDUCATION &amp; EXPERIENCE</p><h2>Grounded in learning.<br /><em>Proven in projects.</em></h2></div><Link className="text-link" to="/cv">View CV <ArrowUpRight size={15} /></Link></div>
          <div className="journey-list"><article className="journey-item"><div className="journey-marker"><GraduationCap size={19} /></div><div><span className="journey-date">2025 · EDUCATION</span><h3>Diploma in ICT Application Development</h3><p>Cape Peninsula University of Technology</p></div><span className="journey-index">01</span></article><article className="journey-item"><div className="journey-marker"><BriefcaseBusiness size={19} /></div><div><span className="journey-date">PROJECT-BASED EXPERIENCE</span><h3>Applied software development</h3><p>Hands-on work across web applications, backend systems, APIs, databases, and AI-related projects.</p></div><span className="journey-index">02</span></article></div>
        </Container>
      </section>

      <section className="contact-cta"><Container><div><p className="eyebrow"><span /> NEXT UP</p><h2>Have a good problem<br />to <em>solve together?</em></h2></div><Button as={Link} to="/contact" className="button-primary">Start a conversation <ArrowUpRight size={17} /></Button></Container></section>
    </>
  );
}

function AboutPage() {
  return (
    <Container className="page-container">
      <PageHeading eyebrow="TECHNOVERSE / ABOUT" title={<>A practical developer,<br /><span>curious by design.</span></>} description="I enjoy taking a real problem, understanding the people behind it, and building software that makes the next step easier." />
      <Row className="g-5 about-layout"><Col lg={7}><div className="about-prose"><p className="panel-index">PROFILE / 001</p><h2>From software idea<br />to usable product.</h2><p>I am an ICT Application Development graduate from Cape Peninsula University of Technology. I&apos;m interested in software development, backend systems, web applications, and solving real-world problems through technology.</p><p>Across project work, I&apos;ve explored product flows, application logic, APIs, databases, and AI-related features. I value clear communication, reliable implementation, and learning through building.</p><div className="about-focus"><span>AREAS OF INTEREST</span><strong>Backend engineering · Full-stack products · Applied AI</strong></div></div></Col><Col lg={5}><div className="about-facts"><p className="panel-index">AT A GLANCE / 002</p><dl className="fact-list"><div><dt>Education</dt><dd>Diploma in ICT Application Development</dd></div><div><dt>Institution</dt><dd>Cape Peninsula University of Technology</dd></div><div><dt>Location</dt><dd>Cape Town, South Africa</dd></div><div><dt>Experience</dt><dd>Project-based software development</dd></div></dl><Button as={Link} to="/cv" variant="link" className="text-link p-0">View my CV <ArrowRight size={16} /></Button></div></Col></Row>
      <section className="page-section"><div className="section-intro"><div><p className="eyebrow"><span /> EDUCATION &amp; EXPERIENCE</p><h2>A learning journey in practice.</h2></div></div><div className="journey-list"><article className="journey-item"><div className="journey-marker"><GraduationCap size={19} /></div><div><span className="journey-date">2025 · EDUCATION</span><h3>Diploma in ICT Application Development</h3><p>Cape Peninsula University of Technology</p></div><span className="journey-index">01</span></article><article className="journey-item"><div className="journey-marker"><BriefcaseBusiness size={19} /></div><div><span className="journey-date">PROJECT-BASED EXPERIENCE</span><h3>Applied software development</h3><p>Practical work across full-stack applications, backend systems, APIs, databases, and AI-related projects.</p></div><span className="journey-index">02</span></article></div></section>
      <section className="page-section"><div className="section-intro"><div><p className="eyebrow"><span /> PRINCIPLES</p><h2>What I bring to the work.</h2></div></div><Row className="g-3">{[['01', 'Stay curious', 'Keep learning through practical work and thoughtful iteration.'], ['02', 'Make it usable', 'Treat accessibility, clarity, and user flow as core engineering concerns.'], ['03', 'Solve the right thing', 'Ground implementation choices in the problem the product needs to solve.']].map(([number, title, description]) => <Col md={4} key={number}><div className="principle-panel"><span>{number}</span><h3>{title}</h3><p>{description}</p></div></Col>)}</Row></section>
    </Container>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const filters = [['all', 'All projects'], ['ai', 'Applied AI'], ['fullstack', 'Full-stack'], ['web', 'Web']];
  const filtered = filter === 'all' ? showcasedProjects : showcasedProjects.filter((project) => project.categories.includes(filter));

  return (
    <Container className="page-container">
      <PageHeading eyebrow="TECHNOVERSE / SELECTED WORK" title={<>A few things<br /><span>I&apos;ve built.</span></>} description="Three live projects across commerce, career guidance, and applied AI. Each one starts with a practical problem and a focus on making the experience work." />
      <div className="filter-row" role="group" aria-label="Filter projects">{filters.map(([value, label]) => <Button key={value} type="button" className={`filter-chip${filter === value ? ' active' : ''}`} onClick={() => setFilter(value)} aria-pressed={filter === value}>{label}</Button>)}<span className="filter-count ms-md-auto">{filtered.length} projects</span></div>
      <Row className="g-4 project-list">{filtered.map((project, index) => <Col md={6} xl={4} key={project.slug}><ProjectCard project={project} index={index} /></Col>)}</Row>
    </Container>
  );
}

function SkillsPage() {
  const frameworkNames = new Set(frameworkGroups.flatMap(({ items }) => items.map(({ name }) => name.toLocaleLowerCase())));
  const coreSkillGroups = skillGroups
    .filter(({ name }) => !['Frontend development', 'Backend development'].includes(name))
    .map((group) => ({ ...group, items: group.items.filter((item) => !frameworkNames.has(item.toLocaleLowerCase())) }))
    .filter(({ items }) => items.length > 0);

  return (
    <Container className="page-container">
      <PageHeading eyebrow="TECHNOVERSE / TOOLKIT" title={<>The tools I use<br /><span>to make things work.</span></>} description="Frameworks, libraries, languages, and tools from my software development experience." />
      <section className="frameworks-section" aria-labelledby="frameworks-heading">
        <div className="skills-section-heading"><div><p className="eyebrow"><span /> FRAMEWORKS &amp; LIBRARIES</p><h2 id="frameworks-heading">Frameworks &amp; Libraries</h2></div><span className="skills-section-count">13 TECHNOLOGIES</span></div>
        {frameworkGroups.map((group) => (
          <section className="framework-category" key={group.name} aria-labelledby={`framework-${group.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}>
            <div className="framework-category-heading"><div><h3 id={`framework-${group.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}>{group.name}</h3><p>{group.description}</p></div><span>{String(group.items.length).padStart(2, '0')}</span></div>
            <Row className="g-3">{group.items.map((technology) => <Col sm={6} xl={4} key={technology.name}><FrameworkCard technology={technology} /></Col>)}</Row>
          </section>
        ))}
      </section>
      <section className="core-skills-section" aria-labelledby="core-skills-heading">
        <div className="skills-section-heading"><div><p className="eyebrow"><span /> CORE SKILLS</p><h2 id="core-skills-heading">Languages &amp; practice</h2></div></div>
        <Row className="g-3 skills-list">{coreSkillGroups.map((group, index) => { const Icon = skillIcons[group.icon] || Code2; return <Col md={6} xl={3} key={group.name}><Card className="skill-card h-100"><Card.Body><div className="skill-card-head"><span className="skill-icon"><Icon size={20} /></span><span className="skill-number">0{index + 1}</span></div><h3>{group.name}</h3><TechnologyChips items={group.items} /></Card.Body></Card></Col>; })}</Row>
      </section>
    </Container>
  );
}

function CertificatesPage() {
  const [selected, setSelected] = useState(null);

  return (
    <Container className="page-container">
      <PageHeading eyebrow="TECHNOVERSE / LEARNING RECORD" title={<>Credentials &amp;<br /><span>continued learning.</span></>} description="Formal education and focused learning in software development, data, and artificial intelligence." />
      <Row className="g-3 certificate-list">{certificates.map((certificate, index) => <Col md={6} xl={4} key={certificate.file}><Card className="certificate-card h-100"><Card.Body className="d-flex flex-column"><div className="certificate-topline"><span>{certificate.type}</span><span>0{index + 1}</span></div><div className="certificate-icon"><GraduationCap size={21} /></div><h2>{certificate.title}</h2><p className="certificate-organisation">{certificate.organisation}</p><p className="certificate-detail">{certificate.detail}</p><div className="certificate-actions mt-auto"><Button type="button" variant="link" className="text-link p-0" onClick={() => setSelected(certificate)}>View certificate <ArrowUpRight size={15} /></Button><a href={certificate.url} download={certificate.file} aria-label={`Download ${certificate.title}`}><Download size={15} /></a></div></Card.Body></Card></Col>)}</Row>
      <Modal show={Boolean(selected)} onHide={() => setSelected(null)} centered size="xl" contentClassName="certificate-modal-content"><Modal.Header closeButton><Modal.Title>{selected?.title}</Modal.Title></Modal.Header><Modal.Body className="certificate-preview">{selected && <iframe title={`${selected.title} preview`} src={selected.url} />}</Modal.Body></Modal>
    </Container>
  );
}

function CvPage() {
  return (
    <Container className="page-container">
      <PageHeading eyebrow="TECHNOVERSE / CURRICULUM VITAE" title={<>Ready to contribute.<br /><span>Built to keep learning.</span></>} description="A concise overview of my background, technical focus, and approach to building useful software." />
      <Row className="g-3 cv-grid"><Col lg={7}><Card className="content-panel h-100"><Card.Body><p className="panel-index">PROFILE / SUMMARY</p><h2>Professional profile</h2><p>Junior Software Developer and ICT Application Development graduate with a strong interest in backend and full-stack development, AI-powered solutions, and practical digital products.</p><ul className="cv-points"><li>Building user-focused web applications and backend systems</li><li>Project experience with application logic, data handling, and API integration</li><li>Working knowledge of Java, JavaScript, Python, PHP, and SQL</li><li>Motivated by clean code, problem-solving, and real-world impact</li></ul></Card.Body></Card></Col><Col lg={5}><Card className="content-panel h-100"><Card.Body><p className="panel-index">EDUCATION / 2025</p><h2>Academic background</h2><p className="education-kicker">Cape Peninsula University of Technology</p><h3>Diploma in ICT Application Development</h3><hr className="panel-rule" /><p className="panel-index">TECHNOLOGY / SELECTED</p><TechnologyChips items={['Java', 'Spring Boot', 'JavaScript', 'React', 'Python', 'PHP', 'MySQL', 'Git', 'REST APIs']} /></Card.Body></Card></Col></Row>
      <div className="cv-actions"><Button href={cvFile} download className="button-primary">Download CV <Download size={16} /></Button><Button as={Link} to="/contact" variant="outline-light" className="button-outline">Contact me <ArrowUpRight size={16} /></Button></div>
    </Container>
  );
}

function ContactPage() {
  return (
    <Container className="page-container">
      <PageHeading eyebrow="TECHNOVERSE / CONTACT" title={<>Let&apos;s make something<br /><span>useful together.</span></>} description="Have an opportunity, a project, or a technical problem in mind? I&apos;d be glad to hear about it." />
      <Row className="g-4 contact-layout"><Col lg={7}><Card className="contact-panel"><Card.Body><div className="panel-index">SEND A MESSAGE / 001</div><ContactForm /></Card.Body></Card></Col><Col lg={5}><div className="contact-aside"><p className="eyebrow"><span /> DIRECT CHANNELS</p><h2>Good conversations start with a clear brief.</h2><a className="contact-social" href="mailto:onthatileabram@gmail.com"><span className="social-icon"><Mail size={18} /></span><span><small>EMAIL</small><strong>onthatileabram@gmail.com</strong></span><ArrowUpRight size={16} /></a><a className="contact-social" href="https://www.linkedin.com/in/onthatile-mohlamonyane" target="_blank" rel="noreferrer"><span className="social-icon"><i className="bi bi-linkedin" aria-hidden="true" /></span><span><small>PROFESSIONAL PROFILE</small><strong>Connect on LinkedIn</strong></span><ArrowUpRight size={16} /></a><a className="contact-social" href="https://github.com/abramonthatile" target="_blank" rel="noreferrer"><span className="social-icon"><GitBranch size={18} /></span><span><small>PROJECTS &amp; CODE</small><strong>Explore GitHub</strong></span><ArrowUpRight size={16} /></a><p className="contact-note">The form uses the existing email delivery service. You&apos;ll see a confirmation after it accepts your message.</p></div></Col></Row>
    </Container>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFoundPage />;

  const story = [['Problem', project.problem], ['Approach', project.solution], ['What I developed', project.developed], ['Process', project.process], ['Challenge', project.challenge], ['What I learned', project.learned]].filter(([, content]) => content);

  return (
    <Container className="page-container project-detail-page">
      <Link to="/projects" className="back-link"><ArrowRight size={16} /> All selected work</Link>
      <div className="detail-heading"><div><p className="eyebrow"><span /> PROJECT / {project.badge}</p><h1>{project.name}</h1><p className="page-lede">{project.summary}</p></div><div className="detail-links">{project.repository && <Button href={project.repository} target="_blank" rel="noreferrer" className="button-outline"><GitBranch size={16} /> GitHub <ArrowUpRight size={15} /></Button>}{project.demo && <Button href={project.demo} target="_blank" rel="noreferrer" className="button-primary">Live demo <ArrowUpRight size={15} /></Button>}</div></div>
      <ProjectCard project={project} index={0} visualOnly />
      <Row className="g-4 detail-content"><Col lg={4}><Card className="detail-sidecard"><Card.Body><p className="panel-index">PROJECT SNAPSHOT</p><h2>Technologies</h2><TechnologyChips items={project.technologies} /><hr className="panel-rule" /><p className="education-kicker">My role</p><p className="mb-0">{project.role}</p></Card.Body></Card></Col><Col lg={8}><Card className="content-panel overview-panel"><Card.Body><p className="panel-index">OVERVIEW / 01</p><h2>Project overview</h2><p>{project.overview}</p>{project.features?.length > 0 && <><h3 className="feature-heading">Key features</h3><ul className="feature-list">{project.features.map((feature) => <li key={feature}><span>+</span>{feature}</li>)}</ul></>}</Card.Body></Card><Row className="g-3 mt-1">{story.map(([title, content], index) => <Col md={6} key={title}><Card className="story-card h-100"><Card.Body><span className="story-index">0{index + 2}</span><h3>{title}</h3><p>{content}</p></Card.Body></Card></Col>)}</Row></Col></Row>
    </Container>
  );
}

function NotFoundPage() {
  return <Container className="page-container not-found"><p className="eyebrow"><span /> 404 / NOT FOUND</p><h1>This page isn&apos;t in the map.</h1><p className="page-lede">The page may have moved, but the rest of the portfolio is right here.</p><Button as={Link} to="/" className="button-primary">Return home <ArrowRight size={16} /></Button></Container>;
}

export default function App() {
  const [notice, setNotice] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <ToastContext.Provider value={setNotice}>
      <div className="app-shell" data-theme={theme}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader theme={theme} onThemeToggle={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />
        <RouteEffects />
        <main id="main-content" tabIndex={-1}>
          <Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/projects" element={<ProjectsPage />} /><Route path="/projects/:slug" element={<ProjectDetailPage />} /><Route path="/skills" element={<SkillsPage />} /><Route path="/certificates" element={<CertificatesPage />} /><Route path="/cv" element={<CvPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="*" element={<NotFoundPage />} /></Routes>
        </main>
        <SiteFooter />
        <ChatbotWidget />
        <ToastContainer className="portfolio-toasts" position="bottom-end" containerPosition="fixed"><Toast show={Boolean(notice)} onClose={() => setNotice('')} delay={3200} autohide><Toast.Body><i className="bi bi-info-circle me-2" aria-hidden="true" />{notice}</Toast.Body></Toast></ToastContainer>
      </div>
    </ToastContext.Provider>
  );
}