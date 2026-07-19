import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        About <span className="gradient-text">Me</span>
      </motion.h2>

      <div className="about-content">
        <motion.div 
          className="about-card glass-panel"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Education</h3>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <h4>Bachelor of Engineering in Computer Science Engineering</h4>
            <p className="institution">Chitkara University | Punjab</p>
            <p className="duration">2024 - 2028</p>
            <p className="details">
              <strong>CGPA:</strong> 9.26 / 10.00
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="about-card glass-panel"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3>Key Achievements</h3>
          <ul className="achievements-list">
            <li>
              <span className="achievement-icon">🏆</span>
              <p>Ranked among the <strong>Top 5%</strong> students of the batch with a CGPA of 9.26.</p>
            </li>
            <li>
              <span className="achievement-icon">💻</span>
              <p>Solved <strong>250+</strong> Data Structures and Algorithms problems on LeetCode.</p>
            </li>
            <li>
              <span className="achievement-icon">🚀</span>
              <p>Passionate about building scalable AI-powered platforms and full-stack solutions.</p>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
