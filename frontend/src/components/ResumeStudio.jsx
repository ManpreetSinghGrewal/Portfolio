import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Code,
  Eye,
  RefreshCw,
  Edit3,
  Layers,
  Columns,
  ListFilter
} from 'lucide-react';
import { resumeTemplatesList, generateTemplateLatex } from '../data/resumeTemplates';
import '../styles/ResumeStudio.css';

// Master baseline data matching Manpreet's exact LaTeX resume template
const defaultResumeData = {
  personalInfo: {
    name: "Manpreet Singh",
    phone: "+91 7888344778",
    email: "manpreetsgrewal5911@gmail.com",
    location: "Dehlon, Punjab, India",
    linkedin: "https://linkedin.com/in/manpreet-singh",
    github: "https://github.com/ManpreetSinghGrewal"
  },
  careerObjective: "Computer Science student passionate about building useful and reliable web applications from idea to implementation. Interested in growing as a full-stack developer by working on real-world products, learning from experienced teams, and turning practical challenges into simple, user-friendly solutions.",
  technicalSkills: {
    "Programming Languages": "Java, C++, JavaScript",
    "Web Development": "HTML, CSS, React.js",
    "Backend": "Node.js, Express.js",
    "Database": "MongoDB",
    "Developer Tools": "Git, GitHub, VS Code, Socket.io"
  },
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
      githubUrl: "",
      bullets: [
        "Architected and developed a real-time **multiplayer quiz platform** supporting live matchmaking and interactive battles through Socket.io.",
        "Integrated **Google Gemini AI** with OpenTDB fallback to dynamically generate challenging, topic-specific Computer Science quizzes.",
        "Developed an analytics dashboard to track user performance while storing quiz histories, answers and solutions in **MongoDB**.",
        "Implemented secure **email OTP authentication, JWT authorization and bcrypt password hashing** to protect user accounts."
      ]
    },
    {
      id: "siteflow-ai",
      title: "SiteFlow AI",
      techStack: "React.js, JavaScript, Tailwind CSS, Express.js, MongoDB",
      githubUrl: "https://github.com/ManpreetSinghGrewal/SiteFlow-AI",
      bullets: [
        "Developed an AI-powered platform that generates websites from business descriptions and supports the workflow from user input to website preview.",
        "Built responsive dashboards, project management interfaces, navigation systems and AI chat functionality using **React.js**.",
        "Created reusable UI components with **Tailwind CSS** and integrated **Express.js and MongoDB** for project storage and backend workflows."
      ]
    }
  ],
  achievements: [
    {
      text: "**300+ LeetCode problems solved** – ",
      linkText: "LeetCode Profile",
      linkUrl: "https://leetcode.com/u/ManpreetSG/"
    },
    {
      text: "**Sandbox 2.0 Hackathon Finalist** – Project selected for the final round."
    },
    {
      text: "**University Hackathon** – Selected as the **only team among 24 participating groups** to advance to the next stage."
    }
  ],
  certifications: [
    "**Python Foundation Certification**",
    "**Cybersecurity for Everyone** – University of Maryland (Coursera)",
    "**Red Hat System Administration I & II** – RH124 & RH134"
  ]
};

// All 4 major portfolio projects ready for intelligent JD swapping
const allAvailableProjects = [
  {
    id: "quiz-arena",
    title: "Quiz Arena",
    techStack: "React.js, Node.js, Express.js, MongoDB, Socket.io, Gemini AI",
    githubUrl: "",
    tags: ["node", "express", "mongodb", "socket.io", "gemini", "ai", "real-time", "auth", "jwt", "api", "backend", "full-stack"],
    bullets: [
      "Architected and developed a real-time **multiplayer quiz platform** supporting live matchmaking and interactive battles through Socket.io.",
      "Integrated **Google Gemini AI** with OpenTDB fallback to dynamically generate challenging, topic-specific Computer Science quizzes.",
      "Developed an analytics dashboard to track user performance while storing quiz histories, answers and solutions in **MongoDB**.",
      "Implemented secure **email OTP authentication, JWT authorization and bcrypt password hashing** to protect user accounts."
    ]
  },
  {
    id: "siteflow-ai",
    title: "SiteFlow AI",
    techStack: "React.js, JavaScript, Tailwind CSS, Express.js, MongoDB",
    githubUrl: "https://github.com/ManpreetSinghGrewal/SiteFlow-AI",
    tags: ["react", "javascript", "typescript", "tailwind", "express", "mongodb", "ai", "generative ai", "frontend", "ui", "full-stack"],
    bullets: [
      "Developed an AI-powered platform that generates websites from business descriptions and supports the workflow from user input to website preview.",
      "Built responsive dashboards, project management interfaces, navigation systems and AI chat functionality using **React.js**.",
      "Created reusable UI components with **Tailwind CSS** and integrated **Express.js and MongoDB** for project storage and backend workflows."
    ]
  },
  {
    id: "hosteladda",
    title: "HostelAdda",
    techStack: "React.js, Node.js, WebRTC, Socket.io, MongoDB, Brevo API",
    githubUrl: "https://github.com/ManpreetSinghGrewal/HostelAdda",
    tags: ["webrtc", "video", "audio", "streaming", "socket.io", "real-time", "node", "mongodb", "oauth", "auth", "chat"],
    bullets: [
      "Architected an exclusive real-time **video matchmaking and campus lounge platform** featuring 1-on-1 random peer matching and hostel rooms.",
      "Implemented low-latency audio/video streaming using **WebRTC** and bi-directional **Socket.io** signaling servers.",
      "Integrated **Brevo API** for 6-digit email OTP verification alongside **Google OAuth 2.0 SSO** for verified student onboarding.",
      "Engineered **MongoDB** schemas for active session state management, chat persistence, and automated room lifecycle."
    ]
  },
  {
    id: "smartvfm",
    title: "SmartVFM 2.0",
    techStack: "Python, Pandas, Streamlit, Plotly, Kaggle API",
    githubUrl: "https://smartvfm-global-smartphone-specification.onrender.com/",
    tags: ["python", "pandas", "data", "analytics", "visualization", "streamlit", "plotly", "kaggle", "api", "machine learning", "scoring", "dashboard", "hardware", "smartphone"],
    bullets: [
      "Engineered an end-to-end **smartphone data analytics platform** analyzing 400+ devices with dynamic Value-for-Money (VFM) scoring and market price curve evaluation.",
      "Developed data pipelines using **Python & Pandas** for min-max hardware normalization, dataset deduplication, and real-time dual-currency (₹ INR & $ USD) conversion.",
      "Built interactive **Plotly radar comparison charts** and customizable user personas (Gamer, Creator, Battery Warrior) inside a high-performance **Streamlit** dashboard.",
      "Integrated **Kaggle API** for live multi-dataset federation, automated ingestion, and spec indexing across global and Indian smartphone releases."
    ]
  }
];

const sampleJDs = [
  {
    label: "Full-Stack Engineer",
    role: "Full-Stack Developer",
    text: `Looking for a Full-Stack Developer skilled in React.js, Node.js, Express.js, and MongoDB. The ideal candidate has experience building interactive web applications, real-time features with Socket.io, and robust REST APIs. Strong foundations in C++/Java and DSA are essential.`
  },
  {
    label: "Frontend Specialist",
    role: "Frontend Developer",
    text: `Seeking a talented Frontend Developer proficient in React.js, modern JavaScript, HTML/CSS, Tailwind CSS, and animated landing pages. Experience creating reusable components, building admin dashboards, and integrating modern UI interactions is required.`
  },
  {
    label: "WebRTC / Real-Time",
    role: "Full-Stack WebRTC Engineer",
    text: `Hiring a developer with experience in Node.js, WebSockets, Socket.io, and WebRTC for real-time peer-to-peer audio/video streaming and live chat applications. MongoDB database modeling and OTP authentication experience preferred.`
  },
  {
    label: "Python & Data Analytics",
    role: "Data Analyst / Python Developer",
    text: `Looking for a Python Developer with experience in Pandas, data pipelines, and analytics dashboards. Experience building data visualization tools, working with Streamlit or Plotly, and integrating external data APIs like Kaggle is highly desired.`
  }
];

// Helper to render bold text and markdown properly
const renderFormatted = (text) => {
  if (!text) return null;
  let clean = text.replace(/\\textbf\{([^}]+)\}/g, '**$1**');
  clean = clean.replace(/\\emph\{([^}]+)\}/g, '$1');
  clean = clean.replace(/--/g, '–');
  
  const parts = clean.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ResumeStudio = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLatex, setCopiedLatex] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'latex'
  const resumePrintRef = useRef(null);

  const handleLoadSample = (sample) => {
    setJobDescription(sample.text);
    setTargetRole(sample.role);
  };

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
          customMaster: resumeData,
          templateId: selectedTemplate
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
        runLocalTailor();
      }
    } catch (err) {
      console.warn('Backend unavailable, running local ATS engine:', err);
      runLocalTailor();
    } finally {
      setLoading(false);
    }
  };

  const runLocalTailor = () => {
    const lower = jobDescription.toLowerCase();
    const keywords = [
      'react', 'react.js', 'node', 'node.js', 'webrtc', 'socket.io', 'mongodb', 
      'express', 'tailwind', 'gemini', 'dsa', 'typescript', 'video', 'streaming', 
      'python', 'pandas', 'analytics', 'data', 'visualization', 'streamlit', 
      'plotly', 'kaggle', 'frontend', 'backend', 'smartphone'
    ];
    const matched = keywords.filter(k => lower.includes(k));
    const missing = keywords.filter(k => !lower.includes(k));

    const role = targetRole || (
      lower.includes('python') || lower.includes('pandas') || lower.includes('analytics') ? 'Data Analyst / Python Developer' :
      lower.includes('frontend') ? 'Frontend Developer' :
      lower.includes('backend') ? 'Backend Developer' :
      lower.includes('webrtc') || lower.includes('video') ? 'Full-Stack WebRTC Engineer' :
      'Full-Stack Developer'
    );
    const matchedSkills = matched.slice(0, 3).map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ');

    // Score and pick the best 2 projects among all 4 for this JD
    const scoredProjects = allAvailableProjects.map(proj => {
      let matchCount = 0;
      proj.tags.forEach(t => {
        if (lower.includes(t)) matchCount += 2;
      });

      if ((lower.includes('python') || lower.includes('pandas') || lower.includes('analytics') || lower.includes('data') || lower.includes('visualization') || lower.includes('streamlit') || lower.includes('kaggle') || lower.includes('smartphone')) && proj.id === 'smartvfm') {
        matchCount += 8;
      }
      if ((lower.includes('webrtc') || lower.includes('video') || lower.includes('streaming') || lower.includes('audio')) && proj.id === 'hosteladda') {
        matchCount += 8;
      }
      if ((lower.includes('tailwind') || lower.includes('typescript') || lower.includes('ai') || lower.includes('frontend')) && proj.id === 'siteflow-ai') {
        matchCount += 5;
      }
      if ((lower.includes('socket.io') || lower.includes('auth') || lower.includes('jwt') || lower.includes('backend')) && proj.id === 'quiz-arena') {
        matchCount += 5;
      }
      return { ...proj, matchCount };
    });

    scoredProjects.sort((a, b) => b.matchCount - a.matchCount);
    const selectedProjects = scoredProjects.slice(0, 2).map(({ matchCount, tags, ...p }) => p);

    // Tailor Skills
    const tailoredSkills = { ...defaultResumeData.technicalSkills };
    if (lower.includes('typescript') && !tailoredSkills['Web Development'].includes('TypeScript')) {
      tailoredSkills['Web Development'] += ', TypeScript';
    }
    if (lower.includes('tailwind') && !tailoredSkills['Web Development'].includes('Tailwind CSS')) {
      tailoredSkills['Web Development'] += ', Tailwind CSS';
    }
    if (lower.includes('webrtc') && !tailoredSkills['Developer Tools'].includes('WebRTC')) {
      tailoredSkills['Developer Tools'] += ', WebRTC';
    }
    if ((lower.includes('python') || lower.includes('pandas')) && !tailoredSkills['Programming Languages'].includes('Python')) {
      tailoredSkills['Programming Languages'] = 'Python, ' + tailoredSkills['Programming Languages'];
    }
    if (lower.includes('pandas') && !tailoredSkills['Developer Tools'].includes('Pandas')) {
      tailoredSkills['Developer Tools'] += ', Pandas, Streamlit';
    }

    setResumeData(prev => ({
      ...prev,
      careerObjective: `Computer Science student passionate about building useful and reliable web applications from idea to implementation. Interested in growing as a ${role.toLowerCase()} with focus on ${matchedSkills || 'modern full-stack engineering'}, learning from experienced teams, and turning practical challenges into simple, user-friendly solutions.`,
      technicalSkills: tailoredSkills,
      projects: selectedProjects
    }));

    setMatchData({
      score: Math.min(98, 76 + matched.length * 3),
      matched,
      missing: missing.slice(0, 4),
      mode: 'ats-engine'
    });
  };

  const handlePrintPdf = () => {
    const originalTitle = document.title;
    document.title = `Manpreet_Singh_${selectedTemplate}_Resume`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleDownloadTex = () => {
    const content = generateTemplateLatex(selectedTemplate, resumeData);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Manpreet_Singh_${selectedTemplate}_Resume.tex`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyLatex = () => {
    const content = generateTemplateLatex(selectedTemplate, resumeData);
    navigator.clipboard.writeText(content);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2500);
  };

  const handleReset = () => {
    setResumeData(defaultResumeData);
    setJobDescription('');
    setTargetRole('');
    setMatchData(null);
  };

  const activeTemplateMeta = resumeTemplatesList.find(t => t.id === selectedTemplate) || resumeTemplatesList[0];

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
        Paste any Job Description to generate an ATS-optimized, 1-page resume matching multiple LaTeX templates with 1-click vector PDF and .tex download.
      </p>

      {/* TEMPLATE PICKER BAR */}
      <div className="template-picker-container glass-panel">
        <div className="template-picker-header">
          <span className="template-picker-label">
            <Layers size={16} color="#0284c7" /> Select Resume Style / LaTeX Template:
          </span>
          <span className="template-current-desc">
            {activeTemplateMeta.description}
          </span>
        </div>
        <div className="template-tabs">
          {resumeTemplatesList.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              className={`template-tab-btn ${selectedTemplate === tpl.id ? 'active' : ''}`}
              onClick={() => setSelectedTemplate(tpl.id)}
            >
              <span className="tab-name">{tpl.name}</span>
              <span className="tab-badge">{tpl.badge}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="studio-grid">
        {/* Left Side: JD Input & Controls */}
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
              placeholder="e.g. Full-Stack Developer or Python Analyst"
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
              placeholder="Paste job requirements, tech stack, or qualifications here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

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

          {/* Match Score & Keywords */}
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

        {/* Right Side: Exact LaTeX-Style Resume View */}
        <div className="resume-preview-container">
          <div className="preview-toolbar">
            <div className="preview-title">
              <FileText size={18} color="#0284c7" />
              <span>
                {activeTemplateMeta.name} {matchData ? `(${matchData.score}% ATS Match)` : '(Initial Given)'}
              </span>
            </div>

            <div className="toolbar-actions">
              <button 
                type="button"
                className="action-btn secondary"
                onClick={() => setViewMode(viewMode === 'preview' ? 'latex' : 'preview')}
                title="Toggle between PDF visual preview and LaTeX source code"
              >
                {viewMode === 'preview' ? <Code size={16} /> : <Eye size={16} />}
                {viewMode === 'preview' ? 'View .tex' : 'View Preview'}
              </button>

              <button 
                type="button"
                className="action-btn primary"
                onClick={handlePrintPdf}
                title="Download / Print exact vector PDF"
              >
                <Download size={16} /> Download PDF
              </button>

              <button 
                type="button"
                className="action-btn secondary"
                onClick={handleDownloadTex}
                title="Download compilable .tex file"
              >
                <Download size={15} /> .tex File
              </button>

              <button 
                type="button"
                className="action-btn secondary"
                onClick={handleCopyLatex}
                title="Copy full LaTeX source for Overleaf"
              >
                {copiedLatex ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                {copiedLatex ? 'Copied .tex!' : 'Copy LaTeX'}
              </button>

              <button 
                type="button"
                className="action-btn secondary"
                onClick={() => setEditable(!editable)}
                title="Toggle editable mode"
              >
                <Edit3 size={16} />
                {editable ? 'Done' : 'Edit Text'}
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

          {/* VIEW: LATEX SOURCE CODE */}
          {viewMode === 'latex' ? (
            <div className="latex-code-container">
              <div className="latex-code-header">
                <span>LaTeX Source ({activeTemplateMeta.name} - compilable with pdflatex)</span>
                <button 
                  onClick={handleCopyLatex}
                  className="action-btn secondary"
                  style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
                >
                  {copiedLatex ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="latex-code-block">
                {generateTemplateLatex(selectedTemplate, resumeData)}
              </pre>
            </div>
          ) : (
            /* VIEW: EXACT LATEX RESUME SHEET */
            <div className="resume-sheet-wrapper">
              <div 
                ref={resumePrintRef} 
                className={`resume-paper latex-paper template-${selectedTemplate}`} 
                contentEditable={editable}
                suppressContentEditableWarning={true}
              >
                {/* 1. Header: Name & Contact */}
                <div className="latex-header">
                  <h1 className="latex-name">{resumeData.personalInfo.name}</h1>
                  {selectedTemplate === 'modern-navy' && (
                    <div className="latex-subtitle-line">
                      Software Developer | Computer Science Engineering Student
                    </div>
                  )}
                  {selectedTemplate === 'software-dev' && (
                    <div className="latex-subtitle-line">
                      Software Developer
                    </div>
                  )}
                  <div className="latex-contact">
                    <span>{resumeData.personalInfo.phone}</span>
                    <span className="latex-sep">|</span>
                    <a href={`mailto:${resumeData.personalInfo.email}`}>{resumeData.personalInfo.email}</a>
                    <span className="latex-sep">|</span>
                    <span>{resumeData.personalInfo.location}</span>
                    {(selectedTemplate === 'modern-navy' || selectedTemplate === 'minimalist' || selectedTemplate === 'software-dev') && (
                      <>
                        <span className="latex-sep">|</span>
                        <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                        <span className="latex-sep">|</span>
                        <a href={resumeData.personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
                      </>
                    )}
                  </div>
                </div>

                {/* ------------------------------------------------------------------- */}
                {/* RENDER FOR TWO-COLUMN (PARACOL) LAYOUT */}
                {/* ------------------------------------------------------------------- */}
                {selectedTemplate === 'two-column' ? (
                  <div className="two-column-layout">
                    {/* Left Sidebar */}
                    <div className="col-sidebar">
                      <div className="latex-section">
                        <h2 className="latex-section-title">CONTACT</h2>
                        <div className="sidebar-contact-list">
                          <div>{resumeData.personalInfo.location}</div>
                          <div>{resumeData.personalInfo.phone}</div>
                          <div><a href={`mailto:${resumeData.personalInfo.email}`}>{resumeData.personalInfo.email}</a></div>
                          <div><a href={resumeData.personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
                          <div><a href={resumeData.personalInfo.github} target="_blank" rel="noreferrer">GitHub</a></div>
                        </div>
                      </div>

                      <div className="latex-section">
                        <h2 className="latex-section-title">SKILLS</h2>
                        <ul className="latex-bullets sidebar-bullets">
                          {Object.entries(resumeData.technicalSkills).map(([cat, val], i) => (
                            <li key={i}><strong>{cat}:</strong> {val}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="latex-section">
                        <h2 className="latex-section-title">ACHIEVEMENTS</h2>
                        <ul className="latex-bullets sidebar-bullets">
                          {resumeData.achievements.map((ach, i) => (
                            <li key={i}>
                              {typeof ach === 'string' ? renderFormatted(ach) : renderFormatted(ach.text)}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="latex-section">
                        <h2 className="latex-section-title">CERTIFICATIONS</h2>
                        <ul className="latex-bullets sidebar-bullets">
                          {resumeData.certifications.map((cert, i) => (
                            <li key={i}>{renderFormatted(typeof cert === 'string' ? cert : cert.text)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Main Column */}
                    <div className="col-main">
                      <div className="latex-section">
                        <h2 className="latex-section-title">PROFILE</h2>
                        <p className="latex-objective-text">{resumeData.careerObjective}</p>
                      </div>

                      <div className="latex-section">
                        <h2 className="latex-section-title">EDUCATION</h2>
                        {resumeData.education.map((edu, i) => (
                          <div key={i} className="edu-entry-block">
                            <div className="latex-row-split">
                              <strong>{edu.study}</strong>
                              <span>{edu.year.replace(/--/g, '–')}</span>
                            </div>
                            <div className="latex-row-split text-muted">
                              <span>{edu.school}</span>
                              {i === 0 && <span className="cgpa-pill">CGPA: 9.26/10</span>}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="latex-section">
                        <h2 className="latex-section-title">EXPERIENCE</h2>
                        {resumeData.experience.map((exp, i) => (
                          <div key={i} className="latex-entry">
                            <div className="latex-row-split">
                              <strong className="latex-company">{exp.company}</strong>
                              <span>{exp.period.replace(/--/g, '–')}</span>
                            </div>
                            <div className="latex-row-split" style={{ marginBottom: '2px' }}>
                              <span className="latex-italic">{exp.role}</span>
                              <span className="latex-italic">{exp.location}</span>
                            </div>
                            <ul className="latex-bullets">
                              {exp.bullets.map((b, bi) => (
                                <li key={bi}>{renderFormatted(b)}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="latex-section">
                        <h2 className="latex-section-title">PROJECTS</h2>
                        {resumeData.projects.map((proj, i) => (
                          <div key={i} className="latex-entry">
                            <div className="latex-row-split" style={{ marginBottom: '2px' }}>
                              <div>
                                <strong>{proj.title}</strong> | <span className="latex-italic">{proj.techStack}</span>
                              </div>
                              {proj.githubUrl && (
                                <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="latex-link">
                                  {proj.githubUrl.includes('render') ? 'Live Demo' : 'GitHub'}
                                </a>
                              )}
                            </div>
                            <ul className="latex-bullets">
                              {proj.bullets.map((b, bi) => (
                                <li key={bi}>{renderFormatted(b)}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ------------------------------------------------------------------- */
                  /* RENDER FOR SINGLE-COLUMN LAYOUTS (Classic, Modern Navy, Software Dev, Minimalist) */
                  /* ------------------------------------------------------------------- */
                  <>
                    {/* Career Objective / Profile / Summary */}
                    <div className="latex-section">
                      <h2 className="latex-section-title">
                        {selectedTemplate === 'modern-navy' ? 'PROFILE' : 
                         selectedTemplate === 'software-dev' ? 'SUMMARY' : 'Career Objective'}
                      </h2>
                      <p className="latex-objective-text">
                        {resumeData.careerObjective}
                      </p>
                    </div>

                    {/* Technical Skills */}
                    <div className="latex-section">
                      <h2 className="latex-section-title">
                        {selectedTemplate === 'modern-navy' ? 'SKILLS' : 'Technical Skills'}
                      </h2>
                      {selectedTemplate === 'software-dev' ? (
                        <div className="tabular-skills-grid">
                          {Object.entries(resumeData.technicalSkills).map(([cat, val], i) => (
                            <div key={i} className="tabular-skill-row">
                              <span className="tabular-cat">{cat}</span>
                              <span className="tabular-val">{val}</span>
                            </div>
                          ))}
                        </div>
                      ) : selectedTemplate === 'minimalist' ? (
                        <ul className="latex-bullets">
                          {Object.entries(resumeData.technicalSkills).map(([cat, val], i) => (
                            <li key={i}><strong>{cat}:</strong> {val}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="latex-skills-block">
                          {Object.entries(resumeData.technicalSkills).map(([cat, val], i) => (
                            <div key={i} className="latex-skill-line">
                              <strong>{cat}:</strong> {val}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Education */}
                    <div className="latex-section">
                      <h2 className="latex-section-title">
                        {selectedTemplate === 'modern-navy' ? 'EDUCATION' : 'Education'}
                      </h2>
                      {selectedTemplate === 'classic' ? (
                        <table className="latex-edu-table">
                          <thead>
                            <tr>
                              <th style={{ width: '40%', textAlign: 'left' }}>Study</th>
                              <th style={{ width: '22%', textAlign: 'left' }}>Year</th>
                              <th style={{ textAlign: 'left' }}>School / University</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resumeData.education.map((edu, i) => (
                              <tr key={i}>
                                <td>{edu.study}</td>
                                <td>{edu.year.replace(/--/g, '–')}</td>
                                <td>{edu.school}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="edu-list-modern">
                          {resumeData.education.map((edu, i) => (
                            <div key={i} className="edu-row-modern">
                              <div className="latex-row-split">
                                <strong>{edu.study}</strong>
                                <span>{edu.year.replace(/--/g, '–')}</span>
                              </div>
                              <div className="latex-row-split text-muted">
                                <span>{edu.school}</span>
                                {i === 0 && <span className="cgpa-pill">CGPA: 9.26/10</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Experience / Internship */}
                    <div className="latex-section">
                      <h2 className="latex-section-title">
                        {selectedTemplate === 'software-dev' ? 'INTERNSHIP' : 
                         selectedTemplate === 'modern-navy' ? 'EXPERIENCE' : 'Experience'}
                      </h2>
                      {resumeData.experience.map((exp, i) => (
                        <div key={i} className="latex-entry">
                          <div className="latex-row-split">
                            <strong className="latex-company">{exp.company}</strong>
                            <span>{exp.period.replace(/--/g, '–')}</span>
                          </div>
                          <div className="latex-row-split" style={{ marginBottom: '2px' }}>
                            <span className="latex-italic">{exp.role}</span>
                            <span className="latex-italic">{exp.location}</span>
                          </div>
                          <ul className="latex-bullets">
                            {exp.bullets.map((b, bi) => (
                              <li key={bi}>{renderFormatted(b)}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Projects */}
                    <div className="latex-section">
                      <h2 className="latex-section-title">
                        {selectedTemplate === 'modern-navy' ? 'PROJECTS' : 'Projects'}
                      </h2>
                      {resumeData.projects.map((proj, i) => (
                        <div key={i} className="latex-entry">
                          <div className="latex-row-split" style={{ marginBottom: '2px' }}>
                            <div>
                              <strong>{proj.title}</strong> | <span className="latex-italic">{proj.techStack}</span>
                            </div>
                            {proj.githubUrl && (
                              <a 
                                href={proj.githubUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="latex-link"
                              >
                                {proj.githubUrl.includes('render') ? 'Live Demo' : 'GitHub'}
                              </a>
                            )}
                          </div>
                          <ul className="latex-bullets">
                            {proj.bullets.map((b, bi) => (
                              <li key={bi}>{renderFormatted(b)}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div className="latex-section">
                      <h2 className="latex-section-title">
                        {selectedTemplate === 'modern-navy' ? 'ACHIEVEMENTS' : 'Achievements'}
                      </h2>
                      <ul className="latex-bullets">
                        {resumeData.achievements.map((ach, i) => {
                          if (typeof ach === 'string') {
                            return <li key={i}>{renderFormatted(ach)}</li>;
                          }
                          return (
                            <li key={i}>
                              {renderFormatted(ach.text)}
                              {ach.linkUrl && (
                                <a 
                                  href={ach.linkUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="latex-link"
                                >
                                  {ach.linkText}
                                </a>
                              )}
                              .
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Certifications */}
                    <div className="latex-section">
                      <h2 className="latex-section-title">
                        {selectedTemplate === 'modern-navy' ? 'CERTIFICATIONS' : 'Certifications'}
                      </h2>
                      <ul className="latex-bullets">
                        {resumeData.certifications.map((cert, i) => (
                          <li key={i}>{renderFormatted(typeof cert === 'string' ? cert : cert.text)}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeStudio;
