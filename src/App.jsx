import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Modal, Nav, Row, Toast, ToastContainer } from 'react-bootstrap';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import ContactForm from './components/ContactForm.jsx';
import ChatbotWidget from './components/ChatbotWidget.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import { ToastContext } from './components/ToastContext.jsx';
import { certificates, cvFile, profileImage, projects, skillGroups } from './data.js';

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
    const project = pathname.startsWith('/projects/')
      ? projects.find((item) => pathname.endsWith(item.slug))
      : null;
    document.title = project ? `${project.name} | Abram Mohlamonyane` : pageTitles[pathname] || 'Portfolio | Abram Mohlamonyane';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function PageHeading({ eyebrow, title, description, compact = false }) {
  return (
    <header className={`page-heading${compact ? ' page-heading-compact' : ''}`}>
      <p className="eyebrow"><span />{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="page-lede">{description}</p>}
    </header>
  );
}

function TechnologyChips({ items }) {
  return <div className="tech-tags">{items.map((item) => <Badge bg="transparent" className="tech-tag" key={item}>{item}</Badge>)}</div>;
}

function HomePage() {
  const featuredProjects = ['sentix', 'unidigital', 'pathfinder-ai'].map((slug) => projects.find((project) => project.slug === slug));

  return (
    <>
      <section className="home-hero">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={7} className="hero-copy">
              <div className="availability"><span className="availability-dot" /> Open to software opportunities</div>
              <p className="hero-overline">Software developer · Cape Town, South Africa</p>
              <h1>Building useful software,<br /><span>from interface to intelligence.</span></h1>
              <p className="hero-summary">I’m Abram, an ICT Application Development graduate creating dependable full-stack products and thoughtful AI experiences.</p>
              <div className="d-flex flex-wrap gap-3 hero-actions">
                <Button as={Link} to="/projects" className="button-primary">Explore my work <i className="bi bi-arrow-up-right ms-2" aria-hidden="true" /></Button>
                <Button as={Link} to="/contact" variant="outline-light" className="button-outline">Get in touch <i className="bi bi-chat-dots ms-2" aria-hidden="true" /></Button>
              </div>
              <div className="hero-skills" aria-label="Areas of focus">
                <span>Full-stack</span><span>Applied AI</span><span>Product-minded</span>
              </div>
            </Col>
            <Col lg={5}>
              <div className="portrait-stage">
                <div className="portrait-coordinate">AOM / SOFTWARE ENGINEERING</div>
                <div className="portrait-frame">
                  <img src={profileImage} alt="Abram Onthatile Mohlamonyane" />
                </div>
                <div className="portrait-caption"><span className="caption-mark">01</span><span>Thoughtful systems.<br />Clear experiences.</span><i className="bi bi-arrow-down-right" aria-hidden="true" /></div>
                <span className="portrait-axis portrait-axis-x" /><span className="portrait-axis portrait-axis-y" />
              </div>
            </Col>
          </Row>
          <div className="hero-baseline row g-0">
            <div className="col-sm-4"><span>01</span> Product thinking</div>
            <div className="col-sm-4"><span>02</span> Full-stack delivery</div>
            <div className="col-sm-4"><span>03</span> Responsible AI</div>
          </div>
        </Container>
      </section>

      <section className="section-block">
        <Container>
          <div className="section-intro d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
            <div><p className="eyebrow"><span /> Selected work</p><h2>Projects with a purpose.</h2></div>
            <Button as={Link} to="/projects" variant="link" className="text-link">All projects <i className="bi bi-arrow-right" aria-hidden="true" /></Button>
          </div>
          <Row className="g-4">
            {featuredProjects.map((project) => <Col md={6} xl={4} key={project.slug}><ProjectCard project={project} /></Col>)}
          </Row>
        </Container>
      </section>

      <section className="capability-band">
        <Container>
          <Row className="gy-4 align-items-start">
            <Col lg={4}>
              <p className="eyebrow"><span /> How I work</p>
              <h2>Build with clarity.<br />Ship with care.</h2>
            </Col>
            <Col lg={8}>
              <Row className="g-4">
                <Col sm={4}><div className="capability-item"><i className="bi bi-layers" aria-hidden="true" /><h3>Product to platform</h3><p>From usable interfaces to APIs and data flows, I think across the whole product.</p></div></Col>
                <Col sm={4}><div className="capability-item"><i className="bi bi-cpu" aria-hidden="true" /><h3>Practical AI</h3><p>Machine learning and automation should make real tasks clearer and more useful.</p></div></Col>
                <Col sm={4}><div className="capability-item"><i className="bi bi-check2-circle" aria-hidden="true" /><h3>Reliable details</h3><p>Accessible interactions, considered edge cases, and maintainable implementation matter.</p></div></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <Container className="page-container">
      <PageHeading eyebrow="About" title={<>A practical developer,<br /><span>curious by design.</span></>} description="I enjoy taking a real problem, understanding the people behind it, and building software that makes the next step easier." />
      <Row className="g-4 align-items-stretch about-layout">
        <Col lg={7}>
          <Card className="content-panel h-100"><Card.Body>
            <p className="panel-index">PROFILE / 001</p>
            <h2>From a software idea to a usable product.</h2>
            <p>I am an ICT Application Development graduate from Cape Peninsula University of Technology with hands-on experience building web applications, backend systems, APIs, databases, and AI-related projects.</p>
            <p>I enjoy turning ideas into working software and continuously improving my development skills through practical projects. My focus is on dependable digital solutions that are practical, user-friendly, and technically solid.</p>
            <div className="about-focus"><span>Currently focused on</span><strong>Full-stack engineering · Applied AI · Product quality</strong></div>
          </Card.Body></Card>
        </Col>
        <Col lg={5}>
          <Card className="content-panel facts-panel h-100"><Card.Body>
            <p className="panel-index">AT A GLANCE / 002</p>
            <dl className="fact-list">
              <div><dt>Education</dt><dd>Diploma in ICT Application Development</dd></div>
              <div><dt>Institution</dt><dd>Cape Peninsula University of Technology</dd></div>
              <div><dt>Development journey</dt><dd>Bootcamp projects and applied learning</dd></div>
              <div><dt>Enjoy building</dt><dd>Web apps, APIs, backend systems, AI features</dd></div>
            </dl>
            <Button as={Link} to="/cv" variant="link" className="text-link p-0">View my CV <i className="bi bi-arrow-right" aria-hidden="true" /></Button>
          </Card.Body></Card>
        </Col>
      </Row>
      <section className="page-section">
        <div className="section-intro"><p className="eyebrow"><span /> Principles</p><h2>What I bring to the work.</h2></div>
        <Row className="g-3">
          {[
            ['01', 'Stay curious', 'Keep learning through practical work and thoughtful iteration.'],
            ['02', 'Make it usable', 'Treat accessibility, clarity, and user flow as core engineering concerns.'],
            ['03', 'Solve the right thing', 'Ground implementation choices in the problem the product needs to solve.']
          ].map(([number, title, description]) => <Col md={4} key={number}><div className="principle-panel"><span>{number}</span><h3>{title}</h3><p>{description}</p></div></Col>)}
        </Row>
      </section>
    </Container>
  );
}

function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const filters = [
    ['all', 'All work'], ['ai', 'AI & data'], ['fullstack', 'Full-stack'], ['web', 'Web'], ['backend', 'Backend'], ['frontend', 'Frontend']
  ];
  const filtered = filter === 'all' ? projects : projects.filter((project) => project.categories.includes(filter));

  return (
    <Container className="page-container">
      <PageHeading eyebrow="Portfolio" title={<>Selected work<span>.</span></>} description="A cross-section of software projects spanning full-stack products, applied AI, data workflows, and game logic." />
      <div className="filter-row" role="group" aria-label="Filter projects">
        {filters.map(([value, label]) => <Button key={value} type="button" className={`filter-chip${filter === value ? ' active' : ''}`} onClick={() => setFilter(value)} aria-pressed={filter === value}>{label}</Button>)}
        <span className="filter-count ms-md-auto">{filtered.length} projects</span>
      </div>
      {filtered.length > 0 ? <Row className="g-4 project-list">{filtered.map((project) => <Col md={6} xl={4} key={project.slug}><ProjectCard project={project} /></Col>)}</Row> : <Alert variant="dark" className="empty-state">No projects match that category.</Alert>}
    </Container>
  );
}

function SkillsPage() {
  return (
    <Container className="page-container">
      <PageHeading eyebrow="Capabilities" title={<>Tools I use to<br /><span>make things work.</span></>} description="A practical toolkit built across coursework, collaborative projects, and hands-on application development." />
      <Row className="g-3 skills-list">
        {skillGroups.map((group, index) => <Col md={6} xl={4} key={group.name}>
          <Card className="skill-card h-100"><Card.Body>
            <div className="skill-card-head"><span className="skill-icon"><i className={`bi ${group.icon}`} aria-hidden="true" /></span><span className="skill-number">0{index + 1}</span></div>
            <h2>{group.name}</h2>
            <TechnologyChips items={group.items} />
          </Card.Body></Card>
        </Col>)}
      </Row>
    </Container>
  );
}

function CertificatesPage() {
  const [selected, setSelected] = useState(null);

  return (
    <Container className="page-container">
      <PageHeading eyebrow="Learning record" title={<>Credentials &amp;<br /><span>continued learning.</span></>} description="Formal education and focused learning in software development, data, and artificial intelligence." />
      <Row className="g-3 certificate-list">
        {certificates.map((certificate, index) => <Col md={6} xl={4} key={certificate.file}>
          <Card className="certificate-card h-100"><Card.Body className="d-flex flex-column">
            <div className="certificate-topline"><span>{certificate.type}</span><span>0{index + 1}</span></div>
            <div className="certificate-icon"><i className="bi bi-award" aria-hidden="true" /></div>
            <h2>{certificate.title}</h2>
            <p className="certificate-organisation">{certificate.organisation}</p>
            <p className="certificate-detail">{certificate.detail}</p>
            <div className="certificate-actions mt-auto">
              <Button type="button" variant="link" className="text-link p-0" onClick={() => setSelected(certificate)}>View certificate <i className="bi bi-arrow-up-right" aria-hidden="true" /></Button>
              <a href={certificate.url} download={certificate.file} aria-label={`Download ${certificate.title}`}><i className="bi bi-download" aria-hidden="true" /></a>
            </div>
          </Card.Body></Card>
        </Col>)}
      </Row>
      <Modal show={Boolean(selected)} onHide={() => setSelected(null)} centered size="xl" contentClassName="certificate-modal-content">
        <Modal.Header closeButton><Modal.Title>{selected?.title}</Modal.Title></Modal.Header>
        <Modal.Body className="certificate-preview">{selected && <iframe title={`${selected.title} preview`} src={selected.url} />}</Modal.Body>
      </Modal>
    </Container>
  );
}

function CvPage() {
  return (
    <Container className="page-container">
      <PageHeading eyebrow="Curriculum vitae" title={<>Ready to contribute.<br /><span>Built to keep learning.</span></>} description="A concise overview of my background, technical focus, and approach to building useful software." />
      <Row className="g-3 cv-grid">
        <Col lg={7}><Card className="content-panel h-100"><Card.Body>
          <p className="panel-index">PROFILE / SUMMARY</p><h2>Professional profile</h2>
          <p>Junior Software Developer with a Diploma in ICT Application Development and a strong interest in full-stack development, AI-powered solutions, and practical digital products.</p>
          <ul className="cv-points">
            <li>Focused on building user-friendly web applications and backend systems</li>
            <li>Experienced in front-end design, data handling, application logic, and API integration</li>
            <li>Comfortable with HTML, CSS, JavaScript, Java, Python, and SQL</li>
            <li>Motivated by clean code, strong problem-solving, and real-world impact</li>
          </ul>
        </Card.Body></Card></Col>
        <Col lg={5}><Card className="content-panel h-100"><Card.Body>
          <p className="panel-index">TOOLKIT / SELECTED</p><h2>Technical skills</h2>
          <TechnologyChips items={['HTML', 'CSS', 'JavaScript', 'React', 'Java', 'Spring Boot', 'Python', 'SQL', 'AI', 'APIs', 'UX', 'Problem solving']} />
          <hr className="panel-rule" />
          <p className="education-kicker">Education</p><h3>Diploma in ICT Application Development</h3><p className="mb-0">Cape Peninsula University of Technology · 2025</p>
        </Card.Body></Card></Col>
      </Row>
      <div className="cv-actions">
        <Button href={cvFile} download className="button-primary">Download CV <i className="bi bi-download ms-2" aria-hidden="true" /></Button>
        <Button as={Link} to="/contact" variant="outline-light" className="button-outline">Contact me <i className="bi bi-arrow-up-right ms-2" aria-hidden="true" /></Button>
      </div>
    </Container>
  );
}

function ContactPage() {
  return (
    <Container className="page-container">
      <PageHeading eyebrow="Contact" title={<>Let’s make something<br /><span>useful together.</span></>} description="Have an opportunity, project, or technical problem in mind? Send me a note and I’ll get back to you." />
      <Row className="g-4 contact-layout">
        <Col lg={7}><Card className="contact-panel"><Card.Body><div className="panel-index">SEND A MESSAGE / 001</div><ContactForm /></Card.Body></Card></Col>
        <Col lg={5}>
          <div className="contact-aside">
            <p className="eyebrow"><span /> Direct channels</p><h2>Good conversations start with a clear brief.</h2>
            <a className="contact-social" href="https://www.linkedin.com/in/onthatile-mohlamonyane" target="_blank" rel="noreferrer"><span className="social-icon"><i className="bi bi-linkedin" aria-hidden="true" /></span><span><small>Professional profile</small><strong>Connect on LinkedIn</strong></span><i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
            <a className="contact-social" href="https://github.com/abramonthatile" target="_blank" rel="noreferrer"><span className="social-icon"><i className="bi bi-github" aria-hidden="true" /></span><span><small>Projects and code</small><strong>Explore GitHub</strong></span><i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
            <div className="contact-note"><i className="bi bi-clock" aria-hidden="true" /><span>Messages submitted here stay on this page. You’ll see a confirmation after the service accepts the request.</span></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <NotFoundPage />;

  const story = [
    ['Problem', project.problem],
    ['Approach', project.solution],
    ['What I developed', project.developed],
    ['Process', project.process],
    ['Challenge', project.challenge],
    ['What I learned', project.learned]
  ].filter(([, content]) => content);

  return (
    <Container className="page-container project-detail-page">
      <Link to="/projects" className="back-link"><i className="bi bi-arrow-left" aria-hidden="true" /> All projects</Link>
      <div className="detail-heading">
        <div><p className="eyebrow"><span /> Project / {project.badge}</p><h1>{project.name}</h1><p className="page-lede">{project.summary}</p></div>
        <div className="detail-links">
          {project.repository && <Button href={project.repository} target="_blank" rel="noreferrer" className="button-outline">GitHub <i className="bi bi-arrow-up-right ms-2" aria-hidden="true" /></Button>}
          {project.demo && <Button href={project.demo} target="_blank" rel="noreferrer" className="button-primary">Live demo <i className="bi bi-arrow-up-right ms-2" aria-hidden="true" /></Button>}
        </div>
      </div>
      <div className={`detail-art project-art art-${project.art}`} aria-hidden="true"><div className="art-topline"><span>AB / CASE STUDY</span><span>{project.badge}</span></div><div className="detail-art-label">{project.name}</div><div className="detail-art-index">{project.slug.toUpperCase()}</div></div>
      <Row className="g-4 detail-content">
        <Col lg={4}>
          <Card className="detail-sidecard"><Card.Body>
            <p className="panel-index">PROJECT SNAPSHOT</p><h2>Technologies</h2><TechnologyChips items={project.technologies} />
            <hr className="panel-rule" /><p className="education-kicker">My role</p><p className="mb-0">{project.role}</p>
          </Card.Body></Card>
        </Col>
        <Col lg={8}>
          <Card className="content-panel overview-panel"><Card.Body><p className="panel-index">OVERVIEW / 01</p><h2>Project overview</h2><p>{project.overview}</p>
            {project.features?.length > 0 && <><h3 className="feature-heading">Key features</h3><ul className="feature-list">{project.features.map((feature) => <li key={feature}><i className="bi bi-check2" aria-hidden="true" />{feature}</li>)}</ul></>}
          </Card.Body></Card>
          <Row className="g-3 mt-1">
            {story.map(([title, content], index) => <Col md={6} key={title}><Card className="story-card h-100"><Card.Body><span className="story-index">0{index + 2}</span><h3>{title}</h3><p>{content}</p></Card.Body></Card></Col>)}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function NotFoundPage() {
  return <Container className="page-container not-found"><p className="eyebrow"><span /> 404 / Not found</p><h1>This page isn’t in the map.</h1><p className="page-lede">The page may have moved, but the rest of the portfolio is right here.</p><Button as={Link} to="/" className="button-primary">Return home <i className="bi bi-arrow-right ms-2" aria-hidden="true" /></Button></Container>;
}

export default function App() {
  const [notice, setNotice] = useState('');

  return (
    <ToastContext.Provider value={setNotice}>
      <div className="app-shell">
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <RouteEffects />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/cv" element={<CvPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <SiteFooter />
        <ChatbotWidget />
        <ToastContainer className="portfolio-toasts" position="bottom-end" containerPosition="fixed">
          <Toast show={Boolean(notice)} onClose={() => setNotice('')} delay={3200} autohide>
            <Toast.Body><i className="bi bi-info-circle me-2" aria-hidden="true" />{notice}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </ToastContext.Provider>
  );
}