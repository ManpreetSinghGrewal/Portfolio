import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ProjectCard from './ProjectCard';
import '../styles/Projects.css';

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
    techStack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Express.js', 'MongoDB'],
    liveUrl: 'https://site-flow-ai-eight.vercel.app/'
  },
  {
    id: 3,
    title: 'HostelAdda | Real-Time Peer Video & Hostel Lounge Platform',
    description: 'Built an exclusive real-time video matchmaking and community platform for university students featuring Omegle-style 1-on-1 random peer matching and dedicated Hostel Block lounges. Developed backend APIs and WebRTC signaling with Socket.io for low-latency peer-to-peer audio/video streaming, real-time presence indicators, and live messaging. Integrated Brevo API for 6-digit email OTP verification alongside Google OAuth 2.0 SSO, with MongoDB for user management and chat persistence.',
    techStack: ['React.js', 'Node.js', 'WebRTC', 'Socket.io', 'MongoDB', 'Brevo API'],
    liveUrl: 'https://hosteladda-tawny.vercel.app/'
  },
  {
    id: 4,
    title: 'SmartVFM 2.0 | Global & Indian Smartphone Specification & Value-for-Money Indexing Platform',
    description: 'Built an end-to-end data analytics platform for smartphone buyers featuring dynamic Value-for-Money (VFM) scoring, non-linear market price curve evaluation, Head-to-Head Radar Comparison, and customizable User Personas (Gamer, Creator, Battery Warrior). Developed core backend engines for min-max hardware normalization, case-insensitive dataset deduplication, and real-time dual-currency translation (₹ INR & $ USD) using Python and Pandas. Integrated Kaggle API for live multi-dataset federation, curated a 400+ device mega-catalog, and built a responsive dashboard using Streamlit, Plotly, and custom CSS.',
    techStack: ['Python', 'Pandas', 'Streamlit', 'Plotly', 'Kaggle API'],
    liveUrl: 'https://smartvfm-global-smartphone-specification.onrender.com/'
  }
];

const Projects = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        if (data.featuredProjects) {
          setFeaturedProjects(data.featuredProjects);
        } else if (Array.isArray(data)) {
          setFeaturedProjects(data);
        } else {
          setFeaturedProjects(fallbackFeatured);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setFeaturedProjects(fallbackFeatured);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-badge-wrapper">
        <span className="section-pill-badge">
          <Sparkles size={15} /> Portfolio Showcase
        </span>
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
          <p className="loading-text">Loading projects...</p>
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
