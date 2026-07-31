import React from 'react';
import { motion } from 'framer-motion';
import profilePic from '../assets/profile.png';
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
      <div className="hero-visuals">
        <motion.div 
          className="hero-image-container glass-panel"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src={profilePic} 
            alt="Manpreet Singh" 
            className="hero-image" 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
