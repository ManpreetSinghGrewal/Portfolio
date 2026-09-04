// Master Resume Data for Manpreet Singh
// Serves as the single source of truth for portfolio-based resume generation.

const masterResume = {
  personalInfo: {
    name: "Manpreet Singh",
    title: "Full-Stack Software Engineer & AI Enthusiast",
    email: "manpreet1405.becse24@chitkara.edu.in",
    phone: "+91 7888344778",
    location: "Punjab, India",
    linkedin: "https://linkedin.com/in/manpreet-singh",
    github: "https://github.com/ManpreetSinghGrewal",
    portfolio: "https://portfolio.dev"
  },
  summary: "High-achieving Computer Science undergraduate (CGPA 9.26, Top 5%) and Full-Stack Software Engineer with demonstrated experience building scalable web applications, real-time WebRTC platforms, and generative AI solutions. Proven record of solving 250+ LeetCode problems and delivering production-grade web experiences during software engineering internship.",
  education: [
    {
      institution: "Chitkara University",
      degree: "Bachelor of Engineering in Computer Science and Engineering",
      location: "Punjab, India",
      period: "2024 – 2028",
      cgpa: "9.26 / 10.00 (Top 5% of batch)",
      highlights: [
        "Ranked among the Top 5% students of the engineering batch with academic distinction.",
        "Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks."
      ]
    }
  ],
  experience: [
    {
      role: "Software Engineering Intern",
      company: "Algoryx Technology",
      location: "Remote",
      period: "2024 – Present",
      bullets: [
        "Engineered the 'Algoryx Commun' interactive web experience, optimizing complex user flows, fluid responsive layouts, and modern UI/UX principles.",
        "Built high-performance dynamic landing pages leveraging scroll-driven animations, CSS keyframe transitions, and reactive glassmorphic UI elements.",
        "Developed modular analytics and project management dashboards in React.js, enhancing state management and real-time visualization."
      ]
    }
  ],
  projects: [
    {
      id: "hosteladda",
      title: "HostelAdda – Real-Time Peer Video & Campus Lounge Platform",
      role: "Lead Full-Stack Developer",
      techStack: ["React.js", "Node.js", "WebRTC", "Socket.io", "MongoDB", "Brevo API", "Google OAuth 2.0"],
      liveUrl: "https://hosteladda-tawny.vercel.app/",
      bullets: [
        "Architected a real-time peer-to-peer video matchmaking and student lounge platform featuring 1-on-1 random peer matching and dedicated hostel rooms.",
        "Implemented low-latency audio/video streaming protocols with WebRTC and bi-directional Socket.io signaling servers, supporting live presence and messaging.",
        "Integrated Brevo API for 6-digit email OTP authentication alongside Google OAuth 2.0 SSO, ensuring verified student access and session security.",
        "Modeled MongoDB schemas for active session tracking, chat history persistence, and dynamic room lifecycle handling."
      ]
    },
    {
      id: "siteflow-ai",
      title: "SiteFlow AI – Generative AI Website Builder",
      role: "Full-Stack Developer",
      techStack: ["React.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Express.js", "MongoDB"],
      liveUrl: "https://site-flow-ai-eight.vercel.app/",
      bullets: [
        "Engineered an AI-powered system that transforms plain-language business descriptions into full website layouts, responsive sections, and marketing copy.",
        "Constructed intuitive canvas editing interfaces and component libraries with React.js, TypeScript, and Tailwind CSS for rapid real-time customization.",
        "Implemented RESTful backend architecture with Express.js and MongoDB to manage user projects, asset storage, and site export pipelines."
      ]
    },
    {
      id: "quiz-arena",
      title: "Quiz Arena – Full-Stack Competitive Quiz Platform",
      role: "Backend & Full-Stack Developer",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API"],
      liveUrl: "https://quiz-arena-lake.vercel.app/",
      bullets: [
        "Built a competitive testing platform for exam aspirants featuring Speed Quiz, Daily Challenges, Battle Mode, and timed evaluations.",
        "Integrated Google Gemini API to dynamically generate algorithmic and domain-specific questions with instant conceptual explanations.",
        "Designed high-concurrency Node.js/MongoDB APIs for live leaderboard synchronization, score calculation, and user performance analytics."
      ]
    },
    {
      id: "smartvfm",
      title: "SmartVFM 2.0 – Global & Indian Smartphone Specification & Value-for-Money Indexing Platform",
      role: "Lead Data Engineer & Developer",
      techStack: ["Python", "Pandas", "Streamlit", "Plotly", "Kaggle API", "Data Analytics"],
      liveUrl: "https://smartvfm-global-smartphone-specification.onrender.com/",
      bullets: [
        "Architected an end-to-end data analytics platform evaluating 400+ smartphones with dynamic Value-for-Money (VFM) scoring and non-linear market price curve analysis.",
        "Built core data engineering engines using Python and Pandas for min-max hardware normalization, case-insensitive dataset deduplication, and real-time dual-currency (₹ INR & $ USD) conversions.",
        "Engineered interactive Head-to-Head Radar Comparisons and customizable buyer personas (Gamer, Creator, Battery Warrior) powered by Plotly and Streamlit.",
        "Integrated Kaggle API to federate multi-source smartphone datasets, establishing automated ingestion pipelines and data hygiene protocols."
      ]
    }
  ],
  skills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "Python", "C++", "HTML5", "CSS3 / Sass"],
    frontend: ["React.js", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Three.js / Canvas", "Responsive Web Design"],
    backend: ["Node.js", "Express.js", "RESTful APIs", "WebRTC", "Socket.io", "MongoDB / Mongoose"],
    toolsAndCloud: ["Git", "GitHub", "Linux / Bash", "VS Code", "Vercel", "Netlify", "Pandas", "Streamlit", "Plotly", "Postman"],
    coreCS: ["Data Structures & Algorithms (250+ LeetCode)", "Object-Oriented Programming (OOP)", "Database Design", "Operating Systems", "Networking"]
  },
  achievements: [
    "Academic Merit: Ranked in Top 5% of Computer Science Engineering batch with 9.26 CGPA.",
    "Competitive Programming: Solved 250+ Data Structures & Algorithms challenges on LeetCode.",
    "Hackathons & Innovation: Built 4+ full-stack and data engineering production applications deployed live to thousands of potential users."
  ]
};

module.exports = masterResume;
