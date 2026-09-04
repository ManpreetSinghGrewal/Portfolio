import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'internship', 'resume-studio', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="nav-brand">
        <a href="#home" onClick={closeMobileMenu}>MS<span className="dot">.</span></a>
      </div>
      
      <div className={`mobile-menu-btn ${isMobileOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isMobileOpen ? 'mobile-open' : ''}`}>
        <li>
          <a 
            href="#home" 
            className={activeSection === 'home' ? 'active-nav' : ''} 
            onClick={closeMobileMenu}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active-nav' : ''} 
            onClick={closeMobileMenu}
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="#skills" 
            className={activeSection === 'skills' ? 'active-nav' : ''} 
            onClick={closeMobileMenu}
          >
            Skills
          </a>
        </li>
        <li>
          <a 
            href="#projects" 
            className={activeSection === 'projects' ? 'active-nav' : ''} 
            onClick={closeMobileMenu}
          >
            Projects
          </a>
        </li>
        <li>
          <a 
            href="#internship" 
            className={`nav-link-internship ${activeSection === 'internship' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="internship-dot"></span>
        <li>
          <a 
            href="#resume-studio" 
            className={activeSection === 'resume-studio' ? 'active-nav' : ''} 
            onClick={closeMobileMenu}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <span>Resume Studio</span>
            <span style={{ 
              fontSize: '0.65rem', 
              background: 'var(--accent-gradient)', 
              color: '#fff', 
              padding: '1px 6px', 
              borderRadius: '8px', 
              fontWeight: '700' 
            }}>AI</span>
          </a>
        </li>
        <li>
          <a href="#contact" className="nav-cta" onClick={closeMobileMenu}>
            Let's Talk
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
