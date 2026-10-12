import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <Card className="project-card h-100">
      <div className={`project-art art-${project.art}`} aria-hidden="true">
        <div className="art-topline"><span>AB / WORK</span><span>{project.badge}</span></div>
        <div className="art-window">
          <div className="art-window-head"><i /><i /><i /></div>
          <div className="art-window-body">
            <span className="art-orbit" />
            <span className="art-signal art-signal-one" />
            <span className="art-signal art-signal-two" />
            <span className="art-signal art-signal-three" />
          </div>
        </div>
        <span className="art-index">{project.slug.toUpperCase()}</span>
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="project-card-meta">
          <span className="project-type">{project.categories.includes('ai') ? 'AI / DATA' : project.categories.includes('fullstack') ? 'FULL-STACK' : 'SOFTWARE'}</span>
          <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </div>
        <Card.Title as="h3">{project.name}</Card.Title>
        <Card.Text>{project.summary}</Card.Text>
        <div className="tech-tags mb-4">
          {project.technologies.slice(0, 3).map((technology) => (
            <Badge key={technology} bg="transparent" className="tech-tag">{technology}</Badge>
          ))}
        </div>
        <Button as={Link} to={`/projects/${project.slug}`} variant="outline-light" className="project-link mt-auto">
          Explore project <i className="bi bi-arrow-right" aria-hidden="true" />
        </Button>
      </Card.Body>
    </Card>
  );
}