import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  ExternalLink, 
  AlertCircle,
  RefreshCw,
  Edit3
} from 'lucide-react';
import '../styles/ResumeStudio.css';

// Master baseline data for Manpreet Singh
const defaultResumeData = {
  personalInfo: {
    name: "Manpreet Singh",
    title: "Full-Stack Software Engineer & AI Solutions Developer",
    email: "manpreet1405.becse24@chitkara.edu.in",
    phone: "+91 7888344778",
    location: "Punjab, India",
    linkedin: "https://linkedin.com/in/manpreet-singh",
    github: "https://github.com/ManpreetSinghGrewal",
    portfolio: "https://portfolio.dev"
  },
  summary: "High-achieving Computer Science undergraduate (CGPA 9.26, Top 5%) and Full-Stack Software Engineer with demonstrated experience building scalable web applications, real-time WebRTC platforms, and generative AI solutions. Proven track record of solving 250+ LeetCode problems and delivering production-grade web experiences during software engineering internship.",
  education: [
    {
      institution: "Chitkara University",
      degree: "Bachelor of Engineering in Computer Science and Engineering",
      location: "Punjab, India",
      period: "2024 – 2028",
      cgpa: "9.26 / 10.00 (Top 5% of batch)",
      highlights: [
        "Ranked in the Top 5% students across the entire engineering cohort with a 9.26 CGPA.",
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
        "Engineered the 'Algoryx Commun' interactive web experience, optimizing dynamic user flows, fluid responsive layouts, and modern UI/UX principles.",
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
      techStack: ["React.js", "Node.js", "WebRTC", "Socket.io", "MongoDB", "Brevo API"],
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
      title: "SmartVFM 2.0 – Global Smartphone Specification & Value Platform",
      role: "Lead Data Engineer & Developer",
      techStack: ["Python", "Pandas", "Streamlit", "Plotly", "Kaggle API"],
      liveUrl: "https://smartvfm-global-smartphone-specification.onrender.com/",
      bullets: [
        "Architected an end-to-end data analytics platform evaluating 400+ smartphones with dynamic Value-for-Money (VFM) scoring and non-linear market price curve analysis.",
        "Built core data engineering engines using Python and Pandas for min-max hardware normalization, case-insensitive dataset deduplication, and real-time dual-currency conversions.",
        "Engineered interactive Head-to-Head Radar Comparisons and customizable buyer personas (Gamer, Creator, Battery Warrior) with Plotly and Streamlit.",
        "Integrated Kaggle API to federate multi-source smartphone datasets, establishing automated ingestion pipelines."
      ]
    }
  ],
  skills: {
    languages: ["JavaScript (ES6+)", "TypeScript", "Python", "C++", "HTML5", "CSS3 / Sass"],
    frontend: ["React.js", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Three.js", "Responsive Design"],
    backend: ["Node.js", "Express.js", "RESTful APIs", "WebRTC", "Socket.io", "MongoDB / Mongoose"],
    toolsAndCloud: ["Git", "GitHub", "Linux / Bash", "VS Code", "Vercel", "Netlify", "Pandas", "Streamlit", "Plotly", "Postman"],
    coreCS: ["Data Structures & Algorithms (250+ LeetCode)", "OOP", "Database Design", "Operating Systems", "Networking"]
  },
  achievements: [
    "Academic Merit: Ranked in Top 5% of Computer Science Engineering batch with 9.26 CGPA.",
    "Competitive Programming: Solved 250+ Data Structures & Algorithms challenges on LeetCode.",
    "Production Delivery: Deployed 4+ production applications live with active real-time and analytics features."
  ]
};

const sampleJDs = [
  {
    label: "Full-Stack Engineer",
    role: "Full-Stack Software Engineer",
    text: `We are looking for a Full-Stack Software Engineer proficient in React.js, Node.js, Express, and MongoDB. The ideal candidate has experience building responsive web applications, integrating RESTful APIs, and implementing real-time features using WebSockets or WebRTC. Strong grasp of Data Structures, Algorithms, TypeScript, and Git version control is essential. Experience with Generative AI / LLM APIs is a strong plus.`
  },
  {
    label: "Frontend Specialist",
    role: "Frontend Developer (React / TypeScript)",
    text: `Seeking a talented Frontend Developer with deep expertise in React.js, modern JavaScript/TypeScript, CSS/Tailwind, and performance optimization. You will design interactive user experiences, implement smooth animations, and work closely with backend REST APIs. Must have proven ability to build clean, maintainable UI components and responsive dashboards.`
  },
  {
    label: "Backend & Systems",
    role: "Backend & Systems Engineer",
    text: `Hiring a Backend Engineer skilled in Node.js, Express, MongoDB, and real-time streaming architectures. Responsibilities include building scalable APIs, database modeling, authentication systems (OAuth/OTP), and handling high-concurrency socket connections. Strong problem solving skills and CS fundamentals required.`
  }
];

const ResumeStudio = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [editable, setEditable] = useState(false);
  const resumePrintRef = useRef(null);

  // Load sample JD
  const handleLoadSample = (sample) => {
    setJobDescription(sample.text);
    setTargetRole(sample.role);
  };

  // Submit JD to backend for tailoring
  const handleTailorResume = async (e) => {
    e?.preventDefault();
    if (!jobDescription.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/resume/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription,
          targetRole,
          customMaster: resumeData
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.tailoredResume) {
          setResumeData(data.tailoredResume);
          setMatchData({
            score: data.matchScore,
            matched: data.matchedKeywords || [],
            missing: data.missingKeywords || [],
            mode: data.mode
          });
        }
      } else {
        // Local fallback if backend is unreachable
        runLocalTailor();
      }
    } catch (err) {
      console.warn('Backend unavailable, running local ATS optimizer:', err);
      runLocalTailor();
    } finally {
      setLoading(false);
    }
  };

  // Resilient client-side fallback if backend server is not running
  const runLocalTailor = () => {
    const lower = jobDescription.toLowerCase();
    const keywords = ['react', 'node', 'typescript', 'mongodb', 'express', 'webrtc', 'socket.io', 'tailwind', 'api', 'gemini', 'dsa'];
    const matched = keywords.filter(k => lower.includes(k));
    const missing = keywords.filter(k => !lower.includes(k));

    const role = targetRole || (lower.includes('frontend') ? 'Frontend Software Engineer' : 'Full-Stack Software Engineer');
    const matchedStr = matched.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ');

    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        title: role
      },
      summary: `Results-driven ${role} and Top 5% Computer Science student (CGPA 9.26) with specialized expertise in ${matchedStr || 'React.js, Node.js, and TypeScript'}. Proven track record of developing real-time WebRTC platforms, generative AI web builders, and scalable cloud solutions backed by 250+ solved LeetCode problems.`
    }));

    setMatchData({
      score: Math.min(96, 75 + matched.length * 3),
      matched,
      missing: missing.slice(0, 4),
      mode: 'ats-engine'
    });
  };

  // Direct native vector print / PDF download
  const handlePrintPdf = () => {
    window.print();
  };

  // Copy plain text for direct pasting into ATS forms
  const handleCopyText = () => {
    const text = `
${resumeData.personalInfo.name}
${resumeData.personalInfo.title}
Email: ${resumeData.personalInfo.email} | Phone: ${resumeData.personalInfo.phone} | Location: ${resumeData.personalInfo.location}
LinkedIn: ${resumeData.personalInfo.linkedin} | GitHub: ${resumeData.personalInfo.github}

PROFESSIONAL SUMMARY
${resumeData.summary}

EDUCATION
${resumeData.education.map(e => `${e.degree} - ${e.institution} (${e.period}) | CGPA: ${e.cgpa}`).join('\n')}

TECHNICAL SKILLS
Languages: ${resumeData.skills.languages.join(', ')}
Frontend: ${resumeData.skills.frontend.join(', ')}
Backend: ${resumeData.skills.backend.join(', ')}
Tools & Cloud: ${resumeData.skills.toolsAndCloud.join(', ')}
Core CS: ${resumeData.skills.coreCS.join(', ')}

EXPERIENCE
${resumeData.experience.map(exp => `${exp.role} - ${exp.company} (${exp.period})\n${exp.bullets.map(b => `• ${b}`).join('\n')}`).join('\n\n')}

PROJECTS
${resumeData.projects.map(p => `${p.title} | ${p.techStack.join(', ')}\n${p.bullets.map(b => `• ${b}`).join('\n')}`).join('\n\n')}

ACHIEVEMENTS
${resumeData.achievements.map(a => `• ${a}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setResumeData(defaultResumeData);
    setJobDescription('');
    setTargetRole('');
    setMatchData(null);
  };

  return (
    <section id="resume-studio" className="resume-studio-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        AI Resume <span className="gradient-text">Studio</span>
      </motion.h2>

      <p className="studio-subtitle">
        Paste any Job Description below. Our ATS engine tailors your resume, aligns project bullets, highlights role-relevant skills, and generates an ATS-compliant 1-page PDF.
      </p>

      <div className="studio-grid">
        {/* Left Side: Controls & JD Input */}
        <motion.div 
          className="studio-controls glass-panel"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="control-group">
            <label className="control-label">
              <Sparkles size={16} color="#0284c7" /> Target Role / Job Title
            </label>
            <input 
              type="text"
              className="control-input"
              placeholder="e.g. Full-Stack Software Engineer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
            />
          </div>

          <div className="control-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="control-label">
                <FileText size={16} color="#0284c7" /> Paste Job Description (JD)
              </label>
              {jobDescription && (
                <button 
                  onClick={() => setJobDescription('')}
                  style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Clear
                </button>
              )}
            </div>
            <textarea 
              className="control-textarea"
              placeholder="Paste the job requirements, responsibilities, or desired qualifications here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          {/* Quick sample chips */}
          <div className="control-group">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Or try a sample JD:
            </span>
            <div className="sample-chips">
              {sampleJDs.map((s, idx) => (
                <button 
                  key={idx}
                  type="button"
                  className="chip-btn"
                  onClick={() => handleLoadSample(s)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="button"
            className="tailor-submit-btn"
            onClick={handleTailorResume}
            disabled={loading || !jobDescription.trim()}
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="spin-icon" /> Tailoring Resume...
              </>
            ) : (
              <>
                <Sparkles size={18} /> Tailor Resume to this JD
              </>
            )}
          </button>

          {/* Match Score & Keywords card */}
          {matchData && (
            <motion.div 
              className="match-overview-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="match-header">
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  ATS Match Score
                </span>
                <span className={`match-score-pill ${matchData.score < 80 ? 'warning' : ''}`}>
                  {matchData.score}% Match
                </span>
              </div>

              {matchData.matched.length > 0 && (
                <div className="match-keywords-section">
                  <span className="keyword-label">Matched Target Keywords:</span>
                  <div className="keyword-chips-list">
                    {matchData.matched.map((kw, i) => (
                      <span key={i} className="kw-badge matched">✓ {kw}</span>
                    ))}
                  </div>
                </div>
              )}

              {matchData.missing.length > 0 && (
                <div className="match-keywords-section">
                  <span className="keyword-label">Opportunity Keywords:</span>
                  <div className="keyword-chips-list">
                    {matchData.missing.map((kw, i) => (
                      <span key={i} className="kw-badge missing">+ {kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Right Side: Live Resume Document Sheet */}
        <div className="resume-preview-container">
          <div className="preview-toolbar">
            <div className="preview-title">
              <FileText size={18} color="#0284c7" />
              <span>ATS-Optimized 1-Page Resume Preview</span>
            </div>

            <div className="toolbar-actions">
              <button 
                type="button"
                className="action-btn primary"
                onClick={handlePrintPdf}
                title="Download / Print crisp vector PDF"
              >
                <Download size={16} /> Download PDF
              </button>

              <button 
                type="button"
                className="action-btn secondary"
                onClick={handlePrintPdf}
                title="Print preview"
              >
                <Printer size={16} /> Print
              </button>

              <button 
                type="button"
                className="action-btn secondary"
                onClick={handleCopyText}
                title="Copy formatted ATS text"
              >
                {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy Text'}
              </button>

              <button 
                type="button"
                className="action-btn secondary"
                onClick={() => setEditable(!editable)}
                title="Toggle editable mode"
              >
                <Edit3 size={16} />
                {editable ? 'Done Editing' : 'Edit Text'}
              </button>

              {matchData && (
                <button 
                  type="button"
                  className="action-btn secondary"
                  onClick={handleReset}
                  title="Reset to master default"
                >
                  <RefreshCw size={14} /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Printable White Paper Sheet */}
          <div className="resume-sheet-wrapper">
            <div 
              ref={resumePrintRef} 
              className="resume-paper" 
              contentEditable={editable}
              suppressContentEditableWarning={true}
            >
              {/* Header */}
              <header className="rp-header">
                <h1 className="rp-name">{resumeData.personalInfo.name}</h1>
                <p className="rp-title">{resumeData.personalInfo.title}</p>
                <div className="rp-contacts">
                  <span>{resumeData.personalInfo.location}</span>
                  <span>•</span>
                  <span>{resumeData.personalInfo.phone}</span>
                  <span>•</span>
                  <a href={`mailto:${resumeData.personalInfo.email}`}>{resumeData.personalInfo.email}</a>
                  <span>•</span>
                  <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                  <span>•</span>
                  <a href={resumeData.personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </header>

              {/* Summary */}
              <section className="rp-section">
                <h2 className="rp-section-title">Professional Summary</h2>
                <p className="rp-summary-text">{resumeData.summary}</p>
              </section>

              {/* Technical Skills */}
              <section className="rp-section">
                <h2 className="rp-section-title">Technical Skills</h2>
                <div className="rp-skills-list">
                  <div className="rp-skill-row">
                    <span className="rp-skill-label">Languages:</span>
                    <span>{resumeData.skills.languages.join(', ')}</span>
                  </div>
                  <div className="rp-skill-row">
                    <span className="rp-skill-label">Frontend:</span>
                    <span>{resumeData.skills.frontend.join(', ')}</span>
                  </div>
                  <div className="rp-skill-row">
                    <span className="rp-skill-label">Backend & DB:</span>
                    <span>{resumeData.skills.backend.join(', ')}</span>
                  </div>
                  <div className="rp-skill-row">
                    <span className="rp-skill-label">Tools & Cloud:</span>
                    <span>{resumeData.skills.toolsAndCloud.join(', ')}</span>
                  </div>
                  <div className="rp-skill-row">
                    <span className="rp-skill-label">Core CS:</span>
                    <span>{resumeData.skills.coreCS.join(', ')}</span>
                  </div>
                </div>
              </section>

              {/* Work Experience */}
              <section className="rp-section">
                <h2 className="rp-section-title">Work Experience</h2>
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="rp-entry">
                    <div className="rp-entry-header">
                      <div>
                        <span className="rp-entry-role">{exp.role}</span>
                        <span className="rp-entry-company"> – {exp.company}</span>
                      </div>
                      <span className="rp-entry-date">{exp.period}</span>
                    </div>
                    <ul className="rp-bullets">
                      {exp.bullets.map((bullet, bi) => (
                        <li key={bi}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Projects */}
              <section className="rp-section">
                <h2 className="rp-section-title">Key Projects</h2>
                {resumeData.projects.map((proj, i) => (
                  <div key={i} className="rp-entry">
                    <div className="rp-entry-header">
                      <div>
                        <span className="rp-entry-role">{proj.title}</span>
                      </div>
                      <span className="rp-entry-date">
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#0284c7', textDecoration: 'underline' }}>
                            Live Demo ↗
                          </a>
                        )}
                      </span>
                    </div>
                    <div className="rp-entry-sub">
                      Tech Stack: {proj.techStack.join(', ')}
                    </div>
                    <ul className="rp-bullets">
                      {proj.bullets.map((bullet, bi) => (
                        <li key={bi}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Education & Achievements */}
              <section className="rp-section">
                <h2 className="rp-section-title">Education & Honors</h2>
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="rp-entry">
                    <div className="rp-entry-header">
                      <div>
                        <span className="rp-entry-role">{edu.institution}</span>
                        <span className="rp-entry-company"> – {edu.degree}</span>
                      </div>
                      <span className="rp-entry-date">{edu.period}</span>
                    </div>
                    <div className="rp-entry-sub" style={{ color: '#16a34a' }}>
                      CGPA: {edu.cgpa}
                    </div>
                    <ul className="rp-bullets">
                      {edu.highlights.map((h, hi) => (
                        <li key={hi}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeStudio;
