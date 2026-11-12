import { lazy, Suspense, useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { ArrowUpRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const ThemeControl = lazy(() => import('./ThemeControl.jsx'));

const links = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Certificates', to: '/certificates' },
  { label: 'CV', to: '/cv' }
];

export default function SiteHeader({ theme = 'dark', onThemeToggle = () => {} }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <Navbar expand="lg" className={`site-nav ${scrolled ? 'is-scrolled' : ''}`} sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" aria-label="TECHNOVERSE, Abram Mohlamonyane home" className="brand-lockup">
          <span className="brand-monogram">T<span>.</span></span>
          <span className="brand-copy"><strong>TECHNOVERSE</strong><small>ABRAM / DEVELOPER</small></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="portfolio-navigation" aria-label="Toggle navigation" />
        <Navbar.Collapse id="portfolio-navigation">
          <Nav className="ms-auto align-items-lg-center nav-links">
            {links.map(({ label, to, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                {label}
              </NavLink>
            ))}
            <Suspense fallback={null}><ThemeControl theme={theme} onThemeToggle={onThemeToggle} /></Suspense>
            <Nav.Link
              as={NavLink}
              to="/contact"
              className={`nav-contact${location.pathname === '/contact' ? ' active' : ''}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Let&apos;s talk <ArrowUpRight size={15} aria-hidden="true" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}