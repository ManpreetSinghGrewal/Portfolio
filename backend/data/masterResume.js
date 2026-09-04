// Master Resume Data for Manpreet Singh
// Exactly modeled after Manpreet's official sample resume template.

const masterResume = {
  personalInfo: {
    name: "Manpreet Singh",
    phone: "+91 7888344778",
    email: "manpreetsgrewal5911@gmail.com",
    location: "Dehlon, Punjab, India",
    linkedin: "https://linkedin.com/in/manpreet-singh",
    github: "https://github.com/ManpreetSinghGrewal"
  },
  careerObjective: "Computer Science student passionate about building useful and reliable web applications from idea to implementation. Interested in growing as a full-stack developer by working on real-world products, learning from experienced teams, and turning practical challenges into simple, user-friendly solutions.",
  education: [
    {
      study: "B.E. CSE",
      year: "2024–2028",
      school: "Chitkara University, Punjab"
    },
    {
      study: "Class XII (CBSE)",
      year: "2024",
      school: "The Cambridge School"
    },
    {
      study: "Class X (CBSE)",
      year: "2022",
      school: "The Cambridge School"
    }
  ],
  technicalSkills: {
    "Programming Languages": "Java, C++, JavaScript",
    "Web Development": "HTML, CSS, React.js",
    "Backend": "Node.js, Express.js",
    "Database": "MongoDB",
    "Developer Tools": "Git, GitHub, VS Code, Socket.io"
  },
  experience: [
    {
      company: "Algoryx Technologies",
      role: "Frontend Developer Intern",
      period: "June 2026 – July 2026",
      location: "Remote",
      bullets: [
        "Built a production-ready **React Admin Dashboard** with reusable and responsive components.",
        "Developed an animated, responsive **landing page** focused on performance, usability and modern UI interactions.",
        "Integrated **3D assets** into interactive web experiences and created and published an original 3D model on Algoryx Community."
      ]
    }
  ],
  projects: [
    {
      id: "quiz-arena",
      title: "Quiz Arena",
      techStack: "React.js, Node.js, Express.js, MongoDB, Socket.io, Gemini AI",
      githubUrl: "https://github.com/ManpreetSinghGrewal",
      liveUrl: "https://quiz-arena-lake.vercel.app/",
      bullets: [
        "Architected and developed a real-time **multiplayer quiz platform** supporting live matchmaking and interactive battles through **Socket.io**.",
        "Integrated **Google Gemini AI** with OpenTDB fallback to dynamically generate challenging, topic-specific Computer Science quizzes.",
        "Developed an **analytics dashboard** to track user performance while storing quiz histories, answers and solutions in **MongoDB**.",
        "Implemented secure **email OTP authentication**, **JWT authorization** and **bcrypt password hashing** to protect user accounts."
      ]
    },
    {
      id: "siteflow-ai",
      title: "SiteFlow AI",
      techStack: "React.js, JavaScript, Tailwind CSS, Express.js, MongoDB",
      githubUrl: "https://github.com/ManpreetSinghGrewal",
      liveUrl: "https://site-flow-ai-eight.vercel.app/",
      bullets: [
        "Developed an **AI-powered platform** that generates websites from business descriptions and supports the workflow from user input to website preview.",
        "Built responsive dashboards, project management interfaces, navigation systems and AI chat functionality using **React.js**.",
        "Created reusable UI components with **Tailwind CSS** and integrated **Express.js** and **MongoDB** for project storage and backend workflows."
      ]
    },
    {
      id: "hosteladda",
      title: "HostelAdda",
      techStack: "React.js, Node.js, WebRTC, Socket.io, MongoDB, Brevo API",
      githubUrl: "https://github.com/ManpreetSinghGrewal",
      liveUrl: "https://hosteladda-tawny.vercel.app/",
      bullets: [
        "Architected an exclusive real-time **video matchmaking & campus lounge platform** featuring 1-on-1 random peer matching and hostel rooms.",
        "Implemented low-latency audio/video streaming using **WebRTC** and bi-directional **Socket.io** signaling servers.",
        "Integrated **Brevo API** for 6-digit email OTP verification alongside **Google OAuth 2.0 SSO** for verified student onboarding.",
        "Engineered **MongoDB** schemas for active session state management, chat persistence, and automated room lifecycle."
      ]
    }
  ],
  achievements: [
    "**300+ LeetCode problems solved** – LeetCode Profile.",
    "**Sandbox 2.0 Hackathon Finalist** – Project selected for the final round.",
    "**University Hackathon** – Selected as the only team among 24 participating groups to advance to the next stage."
  ],
  certifications: [
    "**Python Foundation Certification**",
    "**Cybersecurity for Everyone** – University of Maryland (Coursera)",
    "**Red Hat System Administration I & II** – RH124 & RH134"
  ]
};

module.exports = masterResume;
