import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import '../styles/Projects.css';

const ProjectCard = ({ project, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-6, 6]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="project-card-wrapper"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="project-card glass-panel"
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="project-content">
          <div className="project-header">
            <h3 className="project-title">{project.title}</h3>
          </div>

          <p className="project-description">{project.description}</p>

          <div className="project-tech">
            {project.techStack?.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>

          {project.liveUrl && (
            <div className="project-actions">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="live-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Live Demo</span>
                <ExternalLink size={16} className="btn-icon" />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
