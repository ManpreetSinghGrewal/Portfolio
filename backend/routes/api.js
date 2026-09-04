const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// @route   POST /api/contact
// @desc    Submit a contact message
// @access  Public
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all fields' });
    }

    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
});

// @route   GET /api/projects
// @desc    Get portfolio projects (mocked for now)
// @access  Public
router.get('/projects', (req, res) => {
  const data = {
    featuredProjects: [
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
    ],
    internshipProjects: [
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
    ]
  };
  res.json(data);
});

module.exports = router;
