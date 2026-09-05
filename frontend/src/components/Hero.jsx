import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import manpreetHero from '../assets/manpreet-hero.png';
import '../styles/Hero.css';

// Rich skills arsenal to randomly cycle and float around the portrait
const SKILLS_POOL = [
  { id: 'react', name: 'React.js', color: '#06b6d4', icon: '⚛️' },
  { id: 'node', name: 'Node.js', color: '#10b981', icon: '🟢' },
  { id: 'python', name: 'Python', color: '#3b82f6', icon: '🐍' },
  { id: 'webrtc', name: 'WebRTC', color: '#8b5cf6', icon: '📹' },
  { id: 'socket', name: 'Socket.io', color: '#f59e0b', icon: '⚡' },
  { id: 'mongo', name: 'MongoDB', color: '#059669', icon: '🍃' },
  { id: 'ts', name: 'TypeScript', color: '#2563eb', icon: '🔷' },
  { id: 'tailwind', name: 'Tailwind CSS', color: '#0ea5e9', icon: '🎨' },
  { id: 'gemini', name: 'Gemini AI', color: '#ec4899', icon: '✨' },
  { id: 'express', name: 'Express.js', color: '#6366f1', icon: '🚀' },
  { id: 'cpp', name: 'C++', color: '#3b82f6', icon: '⚙️' },
  { id: 'pandas', name: 'Pandas', color: '#14b8a6', icon: '📊' },
];

// 6 geometric anchor positions distributed around the circle
const SLOT_CONFIGS = [
  { className: 'orbit-slot-0', label: 'Top-Left' },
  { className: 'orbit-slot-1', label: 'Top-Right' },
  { className: 'orbit-slot-2', label: 'Right' },
  { className: 'orbit-slot-3', label: 'Bottom-Right' },
  { className: 'orbit-slot-4', label: 'Bottom-Left' },
  { className: 'orbit-slot-5', label: 'Left' },
];

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
  // Start with 6 distinct skills
  const [activeSkills, setActiveSkills] = useState([
    SKILLS_POOL[0], // React.js
    SKILLS_POOL[1], // Node.js
    SKILLS_POOL[2], // Python
    SKILLS_POOL[3], // WebRTC
    SKILLS_POOL[4], // Socket.io
    SKILLS_POOL[5], // MongoDB
  ]);

  // Periodically randomly pick a slot and swap in a fresh skill from the pool
  useEffect(() => {
    const interval = setInterval(() => {
      const slotIndex = Math.floor(Math.random() * SLOT_CONFIGS.length);
      
      setActiveSkills((current) => {
        const currentIds = current.map((s) => s.id);
        const available = SKILLS_POOL.filter((s) => !currentIds.includes(s.id));
        if (available.length === 0) return current;
        
        const randomNewSkill = available[Math.floor(Math.random() * available.length)];
        const next = [...current];
        next[slotIndex] = randomNewSkill;
        return next;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

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

          {/* Orbiting / Randomly Appearing Tech Skills */}
          {SLOT_CONFIGS.map((slot, index) => {
            const skill = activeSkills[index] || SKILLS_POOL[index];
            return (
              <div key={index} className={`skill-orbit-node ${slot.className}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={skill.id}
                    className="orbit-skill-pill glass-panel"
                    initial={{ opacity: 0, scale: 0.45, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.45, y: -8 }}
                    whileHover={{ scale: 1.14, transition: { duration: 0.2 } }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 22,
                    }}
                    style={{
                      '--skill-color': skill.color,
                    }}
                  >
                    <span 
                      className="orbit-skill-dot" 
                      style={{ backgroundColor: skill.color }}
                    ></span>
                    <span className="orbit-skill-icon">{skill.icon}</span>
                    <span className="orbit-skill-name">{skill.name}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
