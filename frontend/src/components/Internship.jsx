import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import ProjectCard from './ProjectCard';
import '../styles/Projects.css';

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

const Internship = () => {
  const [internshipProjects, setInternshipProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternshipProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        if (data.internshipProjects) {
          setInternshipProjects(data.internshipProjects);
        } else {
          setInternshipProjects(fallbackInternship);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching internship projects:', error);
        setInternshipProjects(fallbackInternship);
        setLoading(false);
      }
    };

    fetchInternshipProjects();
  }, []);

  return (
    <section id="internship" className="internship-section">
      <div className="section-badge-wrapper">
        <span className="section-pill-badge">
          <Briefcase size={15} /> Work Experience
        </span>
      </div>

      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Internship Work: <span className="gradient-text">Algoryx Technology</span>
      </motion.h2>

      <div className="projects-grid">
        {loading ? (
          <p className="loading-text">Loading internship projects...</p>
        ) : (
          internshipProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))
        )}
      </div>
    </section>
  );
};

export default Internship;
