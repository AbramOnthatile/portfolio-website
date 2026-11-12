import { Button, Container, Nav } from 'react-bootstrap';
import { ArrowUpRight, GitBranch, Mail, MoveUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from './ToastContext.jsx';

const email = 'onthatileabram@gmail.com';

export default function SiteFooter() {
  const showToast = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      showToast('Email address copied.');
    } catch {
      showToast(`Email: ${email}`);
    }
  };

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main row gy-4 align-items-start">
          <div className="col-lg-5">
            <p className="footer-kicker">TECHNOVERSE / THE DEVELOPER&apos;S DIGITAL SPACE</p>
            <p className="footer-name">Abram Onthatile Mohlamonyane</p>
            <p className="footer-role">Software Developer · Backend &amp; Full-Stack</p>
          </div>
          <div className="col-6 col-lg-3">
            <p className="footer-label">Explore</p>
            <Nav className="footer-nav flex-column">
              <Nav.Link as={Link} to="/projects">Selected work</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/skills">Technical skills</Nav.Link>
              <Nav.Link as={Link} to="/certificates">Certificates</Nav.Link>
              <Nav.Link as={Link} to="/cv">Curriculum vitae</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
          </div>
          <div className="col-6 col-lg-4">
            <p className="footer-label">Find me</p>
            <div className="footer-socials">
              <a href="https://github.com/abramonthatile" target="_blank" rel="noreferrer">
                GitHub <GitBranch size={14} aria-hidden="true" />
              </a>
              <a href="https://www.linkedin.com/in/onthatile-mohlamonyane" target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={`mailto:${email}`} className="footer-email">
                <Mail size={14} aria-hidden="true" /> {email} <MoveUpRight size={13} aria-hidden="true" />
              </a>
              <Button variant="link" className="copy-email" onClick={copyEmail}>
                Copy email
              </Button>
            </div>
          </div>
        </div>
        <div className="footer-bottom d-flex flex-column flex-sm-row justify-content-between gap-2">
          <span>© {new Date().getFullYear()} Abram Onthatile Mohlamonyane</span>
          <Link to="/" className="footer-home-link">Back to the top <ArrowUpRight size={13} /></Link>
        </div>
      </Container>
    </footer>
  );
}