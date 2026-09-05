import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Code,
  Eye,
  RefreshCw,
  Edit3
} from 'lucide-react';
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

// Generates compilable LaTeX code matching user's exact template
const generateLatexFileContent = (data) => {
  const d = data || defaultResumeData;

  const skillsLatex = Object.entries(d.technicalSkills)
    .map(([category, val]) => `\\textbf{${category}:}\n${val}\n\\\\[4pt]`)
    .join('\n\n');

  const educationRows = d.education
    .map((edu, idx) => {
      const spacing = idx < d.education.length - 1 ? '\\\\[5pt]' : '';
      return `${edu.study} &\n${edu.year.replace(/–/g, '--')} &\n${edu.school}\n${spacing}`.trim();
    })
    .join('\n\n');

  const experienceLatex = d.experience
    .map(exp => {
      const bullets = exp.bullets.map(b => {
        const latexBullet = b.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}').replace(/–/g, '--');
        return `\\resumeItem{\n${latexBullet}\n}`;
      }).join('\n');
      return `\\resumeSubheading\n{${exp.company}}{${exp.period.replace(/–/g, '--')}}\n{${exp.role}}{${exp.location}}\n\n\\resumeItemListStart\n${bullets}\n\\resumeItemListEnd`;
    })
    .join('\n\n');

  const projectsLatex = d.projects
    .map(p => {
      const gitLink = p.githubUrl
        ? `{\\href{${p.githubUrl}}{\\underline{GitHub}}}`
        : `{}`;
      const bullets = p.bullets.map(b => {
        const latexBullet = b.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}').replace(/–/g, '--');
        return `\\resumeItem{\n${latexBullet}\n}`;
      }).join('\n');
      return `\\resumeProjectHeading\n{\\textbf{${p.title}} $|$\n\\emph{${p.techStack}}}\n${gitLink}\n\n\\resumeItemListStart\n${bullets}\n\\resumeItemListEnd`;
    })
    .join('\n\n');

  const achievementsLatex = d.achievements
    .map(a => {
      if (typeof a === 'string') {
        const clean = a.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}').replace(/–/g, '--');
        return `\\resumeItem{\n${clean}\n}`;
      }
      const prefix = a.text.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}').replace(/–/g, '--');
      const link = a.linkUrl ? `\\href{${a.linkUrl}}{\\underline{${a.linkText}}}.` : '';
      return `\\resumeItem{\n${prefix}${link}\n}`;
    })
    .join('\n');

  const certificationsLatex = d.certifications
    .map(c => {
      const clean = c.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}').replace(/&/g, '\\&').replace(/–/g, '--');
      return `\\resumeItem{\n${clean}\n}`;
    })
    .join('\n');

  return `%-------------------------
% Resume in Latex
% Customized for Manpreet Singh
%------------------------

\\documentclass[letterpaper,10pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

%----------FONT----------
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}

%----------PAGE STYLE----------
\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

%----------MARGINS----------
\\addtolength{\\oddsidemargin}{-0.55in}
\\addtolength{\\evensidemargin}{-0.55in}
\\addtolength{\\textwidth}{1.1in}
\\addtolength{\\topmargin}{-0.62in}
\\addtolength{\\textheight}{1.22in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

%----------SECTION FORMATTING----------
\\titleformat{\\section}
{\\scshape\\raggedright\\large}
{}{0em}{}
[\\color{black}\\titlerule]

\\titlespacing{\\section}
{0pt}{9pt}{5pt}

%----------ATS----------
\\pdfgentounicode=1

%----------CUSTOM COMMANDS----------

\\newcommand{\\resumeItem}[1]{
    \\item\\small{#1}
}

\\newcommand{\\resumeSubheading}[4]{
    \\vspace{2pt}
    \\item
    \\begin{tabular*}{0.97\\textwidth}[t]{
        l@{\\extracolsep{\\fill}}r
    }
        \\textbf{#1} & #2 \\\\
        \\textit{\\small#3} & \\textit{\\small#4} \\\\
    \\end{tabular*}
    \\vspace{-3pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\vspace{2pt}
    \\item
    \\begin{tabular*}{0.97\\textwidth}{
        l@{\\extracolsep{\\fill}}r
    }
        \\small#1 & #2 \\\\
    \\end{tabular*}
    \\vspace{-2pt}
}

\\newcommand{\\resumeSubHeadingListStart}{
    \\begin{itemize}[
        leftmargin=0.15in,
        label={},
        itemsep=0pt,
        topsep=0pt,
        parsep=0pt
    ]
}

\\newcommand{\\resumeSubHeadingListEnd}{
    \\end{itemize}
}

\\newcommand{\\resumeItemListStart}{
    \\begin{itemize}[
        leftmargin=0.18in,
        itemsep=2pt,
        topsep=2pt,
        parsep=0pt
    ]
}

\\newcommand{\\resumeItemListEnd}{
    \\end{itemize}
}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%
%-------------------------------------------

\\begin{document}

%----------HEADING----------

\\begin{center}

    \\textbf{\\Huge \\scshape ${d.personalInfo.name}}\\\\[3pt]

    \\small
    ${d.personalInfo.phone} $|$
    \\href{mailto:${d.personalInfo.email}}
    {\\underline{${d.personalInfo.email}}} $|$
    ${d.personalInfo.location}

\\end{center}

\\vspace{2pt}

%-----------CAREER OBJECTIVE-----------

\\section{Career Objective}

\\small{
${d.careerObjective}
}

%-----------TECHNICAL SKILLS-----------

\\section{Technical Skills}

\\small{

${skillsLatex}

}

%-----------EDUCATION-----------

\\section{Education}

\\renewcommand{\\arraystretch}{1.25}

\\begin{tabularx}{\\textwidth}{
p{4.2cm} p{1.8cm} X
}

\\textbf{Study} &
\\textbf{Year} &
\\textbf{School / University}
\\\\[5pt]

${educationRows}

\\end{tabularx}

\\vspace{5pt}

%-----------EXPERIENCE-----------

\\section{Experience}

\\resumeSubHeadingListStart

${experienceLatex}

\\resumeSubHeadingListEnd

%-----------PROJECTS-----------

\\section{Projects}

\\resumeSubHeadingListStart

${projectsLatex}

\\resumeSubHeadingListEnd

%-----------ACHIEVEMENTS-----------

\\section{Achievements}

\\resumeItemListStart

${achievementsLatex}

\\resumeItemListEnd

%-----------CERTIFICATIONS-----------

\\section{Certifications}

\\resumeItemListStart

${certificationsLatex}

\\resumeItemListEnd

\\end{document}
`;
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

// Helper to render bold text and markdown properly
const renderFormatted = (text) => {
  if (!text) return null;
  // Convert \textbf{...} to **...** if present
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
    const keywords = ['react', 'react.js', 'node', 'node.js', 'webrtc', 'socket.io', 'mongodb', 'express', 'tailwind', 'gemini', 'dsa'];
    const matched = keywords.filter(k => lower.includes(k));
    const missing = keywords.filter(k => !lower.includes(k));

    const role = targetRole || (lower.includes('frontend') ? 'frontend developer' : 'full-stack developer');
    const matchedSkills = matched.slice(0, 3).map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ');

    setResumeData(prev => ({
      ...prev,
      careerObjective: `Computer Science student passionate about building useful and reliable web applications from idea to implementation. Interested in growing as a ${role} with focus on ${matchedSkills || 'modern full-stack engineering'}, learning from experienced teams, and turning practical challenges into simple, user-friendly solutions.`
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

  const handleDownloadTex = () => {
    const content = generateLatexFileContent(resumeData);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Manpreet_Singh_Resume.tex';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyLatex = () => {
    const content = generateLatexFileContent(resumeData);
    navigator.clipboard.writeText(content);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2500);
  };

  const handleCopyPlainText = () => {
    const text = `
${resumeData.personalInfo.name}
${resumeData.personalInfo.phone} | ${resumeData.personalInfo.email} | ${resumeData.personalInfo.location}

CAREER OBJECTIVE
${resumeData.careerObjective}

TECHNICAL SKILLS
${Object.entries(resumeData.technicalSkills).map(([k, v]) => `${k}: ${v}`).join('\n')}

EDUCATION
Study\tYear\tSchool / University
${resumeData.education.map(e => `${e.study}\t${e.year}\t${e.school}`).join('\n')}

EXPERIENCE
${resumeData.experience.map(exp => `${exp.company}\t${exp.period}\n${exp.role}\t${exp.location}\n${exp.bullets.map(b => `• ${b.replace(/\*\*/g, '').replace(/\\textbf\{([^}]+)\}/g, '$1')}`).join('\n')}`).join('\n\n')}

PROJECTS
${resumeData.projects.map(p => `${p.title} | ${p.techStack}\n${p.bullets.map(b => `• ${b.replace(/\*\*/g, '').replace(/\\textbf\{([^}]+)\}/g, '$1')}`).join('\n')}`).join('\n\n')}

ACHIEVEMENTS
${resumeData.achievements.map(a => typeof a === 'string' ? `• ${a.replace(/\*\*/g, '')}` : `• ${a.text.replace(/\*\*/g, '')}${a.linkText || ''}`).join('\n')}

CERTIFICATIONS
${resumeData.certifications.map(c => `• ${c.replace(/\*\*/g, '')}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
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
        Paste any Job Description to generate a tailored, ATS-compliant 1-page resume matching your exact official LaTeX template with 1-click vector PDF and .tex download.
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

        {/* Right Side: Exact LaTeX-Style Resume View */}
        <div className="resume-preview-container">
          <div className="preview-toolbar">
            <div className="preview-title">
              <FileText size={18} color="#0284c7" />
              <span>Official LaTeX Academic Resume (1-Page)</span>
            </div>

            <div className="toolbar-actions">
              {/* Toggle Preview / LaTeX Source */}
              <button 
                type="button"
                className={`action-btn ${viewMode === 'preview' ? 'secondary' : 'secondary'}`}
                onClick={() => setViewMode(viewMode === 'preview' ? 'latex' : 'preview')}
                title="Toggle between PDF visual preview and LaTeX source code"
              >
                {viewMode === 'preview' ? <Code size={16} /> : <Eye size={16} />}
                {viewMode === 'preview' ? 'View .tex Code' : 'View Preview'}
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

          {/* VIEW: LATEX SOURCE CODE */}
          {viewMode === 'latex' ? (
            <div className="latex-code-container">
              <div className="latex-code-header">
                <span>LaTeX Source (compilable with pdflatex / Overleaf)</span>
                <button 
                  onClick={handleCopyLatex}
                  className="action-btn secondary"
                  style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
                >
                  {copiedLatex ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <pre className="latex-code-block">
                {generateLatexFileContent(resumeData)}
              </pre>
            </div>
          ) : (
            /* VIEW: EXACT LATEX ACADEMIC RESUME SHEET */
            <div className="resume-sheet-wrapper">
              <div 
                ref={resumePrintRef} 
                className="resume-paper latex-paper" 
                contentEditable={editable}
                suppressContentEditableWarning={true}
              >
                {/* 1. Header: Name & Contact */}
                <div className="latex-header">
                  <h1 className="latex-name">{resumeData.personalInfo.name}</h1>
                  <div className="latex-contact">
                    <span>{resumeData.personalInfo.phone}</span>
                    <span className="latex-sep">|</span>
                    <a href={`mailto:${resumeData.personalInfo.email}`}>{resumeData.personalInfo.email}</a>
                    <span className="latex-sep">|</span>
                    <span>{resumeData.personalInfo.location}</span>
                  </div>
                </div>

                {/* 2. Career Objective (Section 1 in User's LaTeX) */}
                <div className="latex-section">
                  <h2 className="latex-section-title">Career Objective</h2>
                  <p className="latex-objective-text">
                    {resumeData.careerObjective}
                  </p>
                </div>

                {/* 3. Technical Skills (Section 2 in User's LaTeX) */}
                <div className="latex-section">
                  <h2 className="latex-section-title">Technical Skills</h2>
                  <div className="latex-skills-block">
                    {Object.entries(resumeData.technicalSkills).map(([cat, val], i) => (
                      <div key={i} className="latex-skill-line">
                        <strong>{cat}:</strong> {val}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Education (Section 3 in User's LaTeX) */}
                <div className="latex-section">
                  <h2 className="latex-section-title">Education</h2>
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
                </div>

                {/* 5. Experience (Section 4 in User's LaTeX) */}
                <div className="latex-section">
                  <h2 className="latex-section-title">Experience</h2>
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

                {/* 6. Projects (Section 5 in User's LaTeX) */}
                <div className="latex-section">
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
                          <li key={bi}>{renderFormatted(b)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* 7. Achievements (Section 6 in User's LaTeX) */}
                <div className="latex-section">
                  <h2 className="latex-section-title">Achievements</h2>
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

                {/* 8. Certifications (Section 7 in User's LaTeX) */}
                <div className="latex-section">
                  <h2 className="latex-section-title">Certifications</h2>
                  <ul className="latex-bullets">
                    {resumeData.certifications.map((cert, i) => (
                      <li key={i}>{renderFormatted(cert)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeStudio;
