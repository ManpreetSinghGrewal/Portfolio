import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
        <li><a href="#home" onClick={closeMobileMenu}>Home</a></li>
        <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
        <li><a href="#skills" onClick={closeMobileMenu}>Skills</a></li>
        <li><a href="#projects" onClick={closeMobileMenu}>Projects</a></li>
        <li><a href="#contact" className="nav-cta" onClick={closeMobileMenu}>Let's Talk</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
