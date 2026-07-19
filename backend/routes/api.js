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
  const projects = [
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
  ];
  res.json(projects);
});

module.exports = router;
