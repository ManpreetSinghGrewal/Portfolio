import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Skills.css';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'React.js', 'TypeScript']
  },
  {
    title: 'Backend & DB',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'Python']
  },
  {
    title: 'Tools & Data',
    skills: ['Git', 'GitHub', 'Linux', 'Pandas', 'Streamlit']
  },
  {
    title: 'Core CS',
    skills: ['Data Structures', 'Algorithms', 'OOP', 'OS', 'Networks']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Technical <span className="gradient-text">Skills</span>
      </motion.h2>

      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <motion.div 
            key={index} 
            className="skill-card glass-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <h3>{category.title}</h3>
            <div className="skill-tags">
              {category.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
