import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import '../styles/Projects.css';

const ProjectCard = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="project-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <motion.div
        className="project-card glass-panel"
        style={{ x, y, rotateX, rotateY, z: 100 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
      >
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-tech">
            {project.techStack.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback data if backend is not running
        setProjects([
          {
            id: 1,
            title: 'Quiz Arena | Full-Stack Quiz Platform',
            description: 'Built a quiz platform for GATE and UCA aspirants featuring Normal Quiz, Daily Challenge, Battle Mode, and Speed Quiz. Developed backend APIs for authentication, quiz management, score tracking, and data persistence using Node.js and MongoDB. Integrated Gemini API and contributed to responsive frontend development using React.js.',
            techStack: ['React.js', 'Node.js', 'MongoDB', 'Gemini API']
          },
          {
            id: 2,
            title: 'SiteFlow AI | AI-Powered Website Generator',
            description: 'Developed an AI-powered platform that transforms business descriptions into complete website structures and content. Built responsive dashboards, project management views, navigation systems, and AI chat interfaces using React.js and TypeScript. Created reusable and scalable UI components with Tailwind CSS and shadcn/ui. Integrated backend services with Express.js and MongoDB.',
            techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Express.js', 'MongoDB']
          }
        ]);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured <span className="gradient-text">Projects</span>
      </motion.h2>

      <div className="projects-grid">
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;
