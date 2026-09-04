import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  RefreshCw,
  Edit3
} from 'lucide-react';
import '../styles/ResumeStudio.css';

// Master baseline data matching Manpreet's official sample resume exactly
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

const sampleJDs = [
  {
    label: "Full-Stack Engineer",
    role: "Full-Stack Developer",
    text: `Looking for a Full-Stack Developer skilled in React.js, Node.js, Express.js, and MongoDB. The ideal candidate has experience building interactive web applications, real-time features with Socket.io, and robust REST APIs. Strong foundations in C++/Java and DSA are essential.`
  },
  {
    label: "Frontend Specialist",
    role: "Frontend Developer",
    text: `Seeking a talented Frontend Developer proficient in React.js, modern JavaScript, HTML/CSS, Tailwind, and animated landing pages. Experience creating reusable components, building admin dashboards, and integrating modern UI interactions is required.`
  },
  {
    label: "WebRTC / Real-Time",
    role: "Full-Stack WebRTC Engineer",
    text: `Hiring a developer with experience in Node.js, WebSockets, Socket.io, and WebRTC for real-time peer-to-peer audio/video streaming and live chat applications. MongoDB database modeling and OTP authentication experience preferred.`
  }
];

// Helper to render markdown bolding (**text**) seamlessly
const renderFormatted = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
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
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [editable, setEditable] = useState(false);
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
    const keywords = ['react', 'react.js', 'node', 'node.js', 'webrtc', 'socket.io', 'mongodb', 'express', 'tailwind', 'gemini'];
    const matched = keywords.filter(k => lower.includes(k));
    const missing = keywords.filter(k => !lower.includes(k));

    const role = targetRole || (lower.includes('frontend') ? 'frontend developer' : 'full-stack developer');
    const matchedSkills = matched.slice(0, 3).map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ');

    setResumeData(prev => ({
      ...prev,
      careerObjective: `Computer Science student passionate about building useful and reliable web applications from idea to implementation. Interested in growing as a ${role} with focus on ${matchedSkills || 'modern web technologies'}, learning from experienced teams, and turning practical challenges into simple, user-friendly solutions.`
    }));

    setMatchData({
      score: Math.min(98, 76 + matched.length * 4),
      matched,
      missing: missing.slice(0, 4),
      mode: 'ats-engine'
    });
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
${resumeData.personalInfo.name}
${resumeData.personalInfo.phone} | ${resumeData.personalInfo.email} | ${resumeData.personalInfo.location}

CAREER OBJECTIVE
${resumeData.careerObjective}

EDUCATION
Study\tYear\tSchool / University
${resumeData.education.map(e => `${e.study}\t${e.year}\t${e.school}`).join('\n')}

TECHNICAL SKILLS
${Object.entries(resumeData.technicalSkills).map(([k, v]) => `${k}: ${v}`).join('\n')}

EXPERIENCE
${resumeData.experience.map(exp => `${exp.company}\t${exp.period}\n${exp.role}\t${exp.location}\n${exp.bullets.map(b => `– ${b.replace(/\*\*/g, '')}`).join('\n')}`).join('\n\n')}

PROJECTS
${resumeData.projects.map(p => `${p.title} | ${p.techStack}\n${p.bullets.map(b => `– ${b.replace(/\*\*/g, '')}`).join('\n')}`).join('\n\n')}

ACHIEVEMENTS
${resumeData.achievements.map(a => `• ${a.replace(/\*\*/g, '')}`).join('\n')}

CERTIFICATIONS
${resumeData.certifications.map(c => `• ${c.replace(/\*\*/g, '')}`).join('\n')}
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
        Paste any Job Description to generate a tailored, ATS-compliant 1-page resume matching your exact sample template with 1-click vector PDF download.
      </p>

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
              placeholder="e.g. Full-Stack Developer"
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

        {/* Right Side: Exact LaTeX-Style Sample Resume View */}
        <div className="resume-preview-container">
          <div className="preview-toolbar">
            <div className="preview-title">
              <FileText size={18} color="#0284c7" />
              <span>Exact LaTeX Format 1-Page Resume</span>
            </div>

            <div className="toolbar-actions">
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
                onClick={handlePrintPdf}
                title="Print preview"
              >
                <Printer size={16} /> Print
              </button>

              <button 
                type="button"
                className="action-btn secondary"
                onClick={handleCopyText}
                title="Copy formatted text"
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

          {/* EXACT LATEX ACADEMIC RESUME SHEET */}
          <div className="resume-sheet-wrapper">
            <div 
              ref={resumePrintRef} 
              className="resume-paper latex-paper" 
              contentEditable={editable}
              suppressContentEditableWarning={true}
            >
              {/* Header: Name & Contact */}
              <header className="latex-header">
                <h1 className="latex-name">{resumeData.personalInfo.name}</h1>
                <div className="latex-contact">
                  <span>{resumeData.personalInfo.phone}</span>
                  <span className="latex-sep">|</span>
                  <a href={`mailto:${resumeData.personalInfo.email}`}>{resumeData.personalInfo.email}</a>
                  <span className="latex-sep">|</span>
                  <span>{resumeData.personalInfo.location}</span>
                </div>
              </header>

              {/* Career Objective */}
              <section className="latex-section">
                <h2 className="latex-section-title">Career Objective</h2>
                <p className="latex-objective-text">
                  {resumeData.careerObjective}
                </p>
              </section>

              {/* Education Table */}
              <section className="latex-section">
                <h2 className="latex-section-title">Education</h2>
                <table className="latex-edu-table">
                  <thead>
                    <tr>
                      <th style={{ width: '30%', textAlign: 'left' }}>Study</th>
                      <th style={{ width: '18%', textAlign: 'left' }}>Year</th>
                      <th style={{ textAlign: 'left' }}>School / University</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumeData.education.map((edu, i) => (
                      <tr key={i}>
                        <td>{edu.study}</td>
                        <td>{edu.year}</td>
                        <td>{edu.school}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* Technical Skills */}
              <section className="latex-section">
                <h2 className="latex-section-title">Technical Skills</h2>
                <div className="latex-skills-block">
                  {Object.entries(resumeData.technicalSkills).map(([cat, val], i) => (
                    <div key={i} className="latex-skill-line">
                      <strong>{cat}:</strong> {val}
                    </div>
                  ))}
                </div>
              </section>

              {/* Experience */}
              <section className="latex-section">
                <h2 className="latex-section-title">Experience</h2>
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="latex-entry">
                    <div className="latex-row-split">
                      <strong className="latex-company">{exp.company}</strong>
                      <span className="latex-italic">{exp.period}</span>
                    </div>
                    <div className="latex-row-split" style={{ marginBottom: '3px' }}>
                      <span className="latex-italic">{exp.role}</span>
                      <span className="latex-italic">{exp.location}</span>
                    </div>
                    <ul className="latex-bullets">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi}>– {renderFormatted(b)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Projects */}
              <section className="latex-section">
                <h2 className="latex-section-title">Projects</h2>
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
                          GitHub
                        </a>
                      )}
                    </div>
                    <ul className="latex-bullets">
                      {proj.bullets.map((b, bi) => (
                        <li key={bi}>– {renderFormatted(b)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Achievements */}
              <section className="latex-section">
                <h2 className="latex-section-title">Achievements</h2>
                <ul className="latex-bullets-circle">
                  {resumeData.achievements.map((ach, i) => (
                    <li key={i}>• {renderFormatted(ach)}</li>
                  ))}
                </ul>
              </section>

              {/* Certifications */}
              <section className="latex-section">
                <h2 className="latex-section-title">Certifications</h2>
                <ul className="latex-bullets-circle">
                  {resumeData.certifications.map((cert, i) => (
                    <li key={i}>• {renderFormatted(cert)}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeStudio;
