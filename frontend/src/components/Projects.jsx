import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import '../styles/Projects.css';

const ProjectCard = ({ project, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { stiffness: 150, damping: 20 });

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="project-card glass-panel"
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-tech">
            {project.techStack.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>
          {project.liveUrl && (
            <div className="project-actions">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="live-btn"
              >
                Live Demo ↗
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [internshipProjects, setInternshipProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackInternship = [
    {
      id: 'int-1',
      title: 'Algoryx Commun Web Experience',
      description: 'An interactive web experience showcasing dynamic user flows and modern UI/UX principles built during my internship at Algoryx Technology.',
      techStack: ['React.js', 'Animations', 'Vercel', 'UI/UX'],
      liveUrl: 'https://web-experience-using-algoryx-commun.vercel.app/#'
    },
    {
      id: 'int-2',
      title: 'Scroll-Based Animated Landing Page',
      description: 'A highly engaging, interactive landing page leveraging immersive scroll animations, modern parallax transitions, and reactive UI design.',
      techStack: ['React.js', 'CSS Animations', 'Vercel', 'Frontend'],
      liveUrl: 'https://scroll-based-animated-landing-page.vercel.app/'
    },
    {
      id: 'int-3',
      title: 'React Dashboard Development',
      description: 'A dynamic, data-driven analytics and project development dashboard designed for responsiveness and real-time visualization.',
      techStack: ['React.js', 'Dashboard', 'Netlify', 'State Management'],
      liveUrl: 'https://react-dashboard-development.netlify.app/'
    }
  ];

  const fallbackFeatured = [
    {
      id: 1,
      title: 'Quiz Arena | Full-Stack Quiz Platform',
      description: 'Built a quiz platform for GATE and UCA aspirants featuring Normal Quiz, Daily Challenge, Battle Mode, and Speed Quiz. Developed backend APIs for authentication, quiz management, score tracking, and data persistence using Node.js and MongoDB. Integrated Gemini API and contributed to responsive frontend development using React.js.',
      techStack: ['React.js', 'Node.js', 'MongoDB', 'Gemini API'],
      liveUrl: 'https://quiz-arena-lake.vercel.app/'
    },
    {
      id: 2,
      title: 'SiteFlow AI | AI-Powered Website Generator',
      description: 'Developed an AI-powered platform that transforms business descriptions into complete website structures and content. Built responsive dashboards, project management views, navigation systems, and AI chat interfaces using React.js and TypeScript. Created reusable and scalable UI components with Tailwind CSS and shadcn/ui. Integrated backend services with Express.js and MongoDB.',
      techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Express.js', 'MongoDB']
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        if (data.internshipProjects && data.featuredProjects) {
          setInternshipProjects(data.internshipProjects);
          setFeaturedProjects(data.featuredProjects);
        } else if (Array.isArray(data)) {
          setFeaturedProjects(data);
          setInternshipProjects(fallbackInternship);
        } else {
          setInternshipProjects(fallbackInternship);
          setFeaturedProjects(fallbackFeatured);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setInternshipProjects(fallbackInternship);
        setFeaturedProjects(fallbackFeatured);
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
        Internship Work: <span className="gradient-text">Algoryx Technology</span>
      </motion.h2>

      <div className="projects-grid" style={{ marginBottom: '6rem' }}>
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          internshipProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>

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
          featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;
