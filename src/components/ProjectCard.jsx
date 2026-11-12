import { ArrowRight, ArrowUpRight, GitBranch } from 'lucide-react';
import { Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProjectPreview({ project }) {
  if (project.slug === 'hoodline') {
    return (
      <div className="project-preview preview-hoodline" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=82" alt="" loading="lazy" />
        <div className="preview-shade" />
        <div className="preview-browser"><span /><span /><span /><b>HOODLINE / SHOP</b></div>
        <div className="preview-copy"><small>BUILT LOCAL. BECOME VERSATILE.</small><strong>Find your<br />next uniform.</strong><span>DISCOVER THE COLLECTION <ArrowRight size={12} /></span></div>
        <span className="preview-caption">ECOMMERCE / 01</span>
      </div>
    );
  }

  if (project.slug === 'pathfinder-ai') {
    return (
      <div className="project-preview preview-pathfinder" aria-hidden="true">
        <div className="preview-browser"><span /><span /><span /><b>PATHFINDER / YOUR NEXT STEP</b></div>
        <div className="pathfinder-preview-content"><small>FIND YOUR NEXT STEP</small><strong>Tech with purpose.</strong><p>A practical route, shaped around your interests.</p><div className="pathway-match"><span>YOUR MATCH</span><b>87%</b><i /></div><div className="pathway-footer"><span>01 / EXPLORE</span><span>VIEW PATHWAY <ArrowUpRight size={11} /></span></div></div>
        <span className="preview-caption">CAREER GUIDANCE / 02</span>
      </div>
    );
  }

  if (project.slug === 'ai-kitchen-recipe-generator') return (
    <div className="project-preview preview-kitchen" aria-hidden="true">
      <div className="preview-browser"><span /><span /><span /><b>KITCHENCHEF / AI RECIPE STUDIO</b></div>
      <div className="kitchen-preview-content"><small>YOUR PERSONAL COOKING ASSISTANT</small><strong>What&apos;s in your<br />kitchen?</strong><div className="ingredient-list"><span>Tomatoes</span><span>Rice</span><span>Spinach</span><i>+ add</i></div><div className="recipe-preview-action">CREATE A RECIPE <ArrowUpRight size={12} /></div></div>
      <span className="preview-caption">GENERATIVE AI / 03</span>
    </div>
  );

  return (
    <div className="project-preview preview-generic" aria-hidden="true">
      <div className="preview-browser"><span /><span /><span /><b>PROJECT / {project.badge}</b></div>
      <div className="generic-preview-content"><small>TECHNOVERSE / PROJECT FILE</small><strong>{project.name}</strong><p>{project.technologies.slice(0, 3).join(' · ')}</p></div>
      <span className="preview-caption">{project.slug.toUpperCase()}</span>
    </div>
  );
}

export default function ProjectCard({ project, index = 0, visualOnly = false }) {
  return (
    <Card className="project-card h-100" style={{ '--card-index': index }}>
      <ProjectPreview project={project} />
      {!visualOnly && <Card.Body className="d-flex flex-column">
        <div className="project-card-meta"><span className="project-type">{project.categories.includes('fullstack') ? 'FULL-STACK / COMMERCE' : project.slug === 'pathfinder-ai' ? 'APPLIED AI / GUIDANCE' : 'GENERATIVE AI / FOOD'}</span><span className="project-number">0{index + 1}</span></div>
        <Card.Title as="h3">{project.name}</Card.Title>
        <Card.Text>{project.summary}</Card.Text>
        <div className="tech-tags project-tags">{project.technologies.slice(0, 4).map((technology) => <Badge key={technology} bg="transparent" className="tech-tag">{technology}</Badge>)}</div>
        <div className="project-card-actions"><Link to={`/projects/${project.slug}`} className="project-main-link">View project <ArrowRight size={16} /></Link><div className="project-quick-links">{project.repository && <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub repository`} title="GitHub repository"><GitBranch size={16} /></a>}{project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`} title="Live demo"><ArrowUpRight size={16} /></a>}</div></div>
        {project.demo && <a className="project-demo-text" href={project.demo} target="_blank" rel="noreferrer">Open live demo <ArrowUpRight size={14} /></a>}
      </Card.Body>}
    </Card>
  );
}