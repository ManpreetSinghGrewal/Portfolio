import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2 } from 'lucide-react';
import manpreetHero from '../assets/manpreet-hero.png';
import '../styles/Hero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants} className="greeting">Hi, I'm</motion.h2>
          <motion.h1 variants={itemVariants} className="name gradient-text">Manpreet Singh</motion.h1>
          <motion.h3 variants={itemVariants} className="role">Full-Stack Engineer & AI Enthusiast</motion.h3>
          <motion.p variants={itemVariants} className="bio">
            Top 5% CS Student at Chitkara University. <br/>
            I build modern, scalable web applications and AI-powered solutions.
          </motion.p>
          <motion.div variants={itemVariants} className="cta-buttons">
            <a href="#projects" className="btn btn-primary">View Work</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="hero-visuals"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <div className="hero-avatar-frame">
          {/* Ambient soft glow matching background liquid blobs */}
          <div className="hero-avatar-ambient-glow"></div>
          
          {/* Frosted Liquid Glass Bezel Ring */}
          <div className="hero-avatar-ring">
            <img 
              src={manpreetHero} 
              alt="Manpreet Singh" 
              className="hero-avatar-img"
              loading="eager"
            />
          </div>

          {/* Floating Glass Pill Badges */}
          <motion.div 
            className="hero-floating-badge badge-top-right glass-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Sparkles size={16} className="badge-icon-sparkle" />
            <span>Chitkara • <strong>9.26 CGPA</strong></span>
          </motion.div>

          <motion.div 
            className="hero-floating-badge badge-bottom-left glass-panel"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Code2 size={16} className="badge-icon-code" />
            <span>Full-Stack & AI Engineer</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
