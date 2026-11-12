import { Card } from 'react-bootstrap';
import {
  siBootstrap,
  siCss,
  siDjango,
  siExpress,
  siFlask,
  siGit,
  siGithub,
  siHtml5,
  siLaravel,
  siMui,
  siNodedotjs,
  siReact,
  siSpringboot
} from 'simple-icons';

const technologyIcons = {
  springboot: siSpringboot,
  django: siDjango,
  flask: siFlask,
  laravel: siLaravel,
  express: siExpress,
  nodedotjs: siNodedotjs,
  react: siReact,
  bootstrap: siBootstrap,
  mui: siMui,
  html5: siHtml5,
  css: siCss,
  git: siGit,
  github: siGithub
};

export default function FrameworkCard({ technology }) {
  const icon = technologyIcons[technology.icon];

  return (
    <Card className="framework-card h-100">
      <Card.Body>
        <div className="framework-card-topline">
          <span className="technology-icon" style={{ '--technology-color': `#${icon.hex}` }} aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d={icon.path} /></svg>
          </span>
          <span className="framework-card-index" aria-hidden="true">TECH / 0{Object.keys(technologyIcons).indexOf(technology.icon) + 1}</span>
        </div>
        <h4>{technology.name}</h4>
        <p>{technology.description}</p>
      </Card.Body>
    </Card>
  );
}