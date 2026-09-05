// Master Resume Data & LaTeX Generator for Manpreet Singh
// Initial state matches Manpreet's given LaTeX resume verbatim.

const initialGivenResume = {
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
        "Built a production-ready \\textbf{React Admin Dashboard} with reusable and responsive components.",
        "Developed an animated, responsive \\textbf{landing page} focused on performance, usability and modern UI interactions.",
        "Integrated \\textbf{3D assets} into interactive web experiences and created and published an original 3D model on Algoryx Community."
      ]
    }
  ],
  // Initially the exact 2 projects from the user's given resume:
  projects: [
    {
      id: "quiz-arena",
      title: "Quiz Arena",
      techStack: "React.js, Node.js, Express.js, MongoDB, Socket.io, Gemini AI",
      githubUrl: "",
      bullets: [
        "Architected and developed a real-time \\textbf{multiplayer quiz platform} supporting live matchmaking and interactive battles through Socket.io.",
        "Integrated \\textbf{Google Gemini AI} with OpenTDB fallback to dynamically generate challenging, topic-specific Computer Science quizzes.",
        "Developed an analytics dashboard to track user performance while storing quiz histories, answers and solutions in \\textbf{MongoDB}.",
        "Implemented secure \\textbf{email OTP authentication, JWT authorization and bcrypt password hashing} to protect user accounts."
      ]
    },
    {
      id: "siteflow-ai",
      title: "SiteFlow AI",
      techStack: "React.js, JavaScript, Tailwind CSS, Express.js, MongoDB",
      githubUrl: "https://github.com/ManpreetSinghGrewal/SiteFlow-AI",
      bullets: [
        "Developed an AI-powered platform that generates websites from business descriptions and supports the workflow from user input to website preview.",
        "Built responsive dashboards, project management interfaces, navigation systems and AI chat functionality using \\textbf{React.js}.",
        "Created reusable UI components with \\textbf{Tailwind CSS} and integrated \\textbf{Express.js and MongoDB} for project storage and backend workflows."
      ]
    }
  ],
  achievements: [
    "\\textbf{300+ LeetCode problems solved} -- \\href{https://leetcode.com/u/ManpreetSG/}{\\underline{LeetCode Profile}}.",
    "\\textbf{Sandbox 2.0 Hackathon Finalist} -- Project selected for the final round.",
    "\\textbf{University Hackathon} -- Selected as the \\textbf{only team among 24 participating groups} to advance to the next stage."
  ],
  certifications: [
    "\\textbf{Python Foundation Certification}",
    "\\textbf{Cybersecurity for Everyone} -- University of Maryland (Coursera)",
    "\\textbf{Red Hat System Administration I \\& II} -- RH124 \\& RH134"
  ]
};

// All available portfolio projects to dynamically swap in based on JD
const allPortfolioProjects = [
  {
    id: "quiz-arena",
    title: "Quiz Arena",
    techStack: "React.js, Node.js, Express.js, MongoDB, Socket.io, Gemini AI",
    githubUrl: "",
    tags: ["node", "express", "mongodb", "socket.io", "gemini", "ai", "real-time", "auth", "jwt", "api", "backend", "full-stack"],
    bullets: [
      "Architected and developed a real-time \\textbf{multiplayer quiz platform} supporting live matchmaking and interactive battles through Socket.io.",
      "Integrated \\textbf{Google Gemini AI} with OpenTDB fallback to dynamically generate challenging, topic-specific Computer Science quizzes.",
      "Developed an analytics dashboard to track user performance while storing quiz histories, answers and solutions in \\textbf{MongoDB}.",
      "Implemented secure \\textbf{email OTP authentication, JWT authorization and bcrypt password hashing} to protect user accounts."
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
      "Built responsive dashboards, project management interfaces, navigation systems and AI chat functionality using \\textbf{React.js}.",
      "Created reusable UI components with \\textbf{Tailwind CSS} and integrated \\textbf{Express.js and MongoDB} for project storage and backend workflows."
    ]
  },
  {
    id: "hosteladda",
    title: "HostelAdda",
    techStack: "React.js, Node.js, WebRTC, Socket.io, MongoDB, Brevo API",
    githubUrl: "https://github.com/ManpreetSinghGrewal/HostelAdda",
    tags: ["webrtc", "video", "audio", "streaming", "socket.io", "real-time", "node", "mongodb", "oauth", "auth", "chat"],
    bullets: [
      "Architected an exclusive real-time \\textbf{video matchmaking and campus lounge platform} featuring 1-on-1 random peer matching and hostel rooms.",
      "Implemented low-latency audio/video streaming using \\textbf{WebRTC} and bi-directional \\textbf{Socket.io} signaling servers.",
      "Integrated \\textbf{Brevo API} for 6-digit email OTP verification alongside \\textbf{Google OAuth 2.0 SSO} for verified student onboarding.",
      "Engineered \\textbf{MongoDB} schemas for active session state management, chat persistence, and automated room lifecycle."
    ]
  },
  {
    id: "smartvfm",
    title: "SmartVFM 2.0",
    techStack: "Python, Pandas, Streamlit, Plotly, Kaggle API",
    githubUrl: "https://smartvfm-global-smartphone-specification.onrender.com/",
    liveUrl: "https://smartvfm-global-smartphone-specification.onrender.com/",
    tags: ["python", "pandas", "data", "analytics", "visualization", "streamlit", "plotly", "kaggle", "api", "machine learning", "scoring", "dashboard", "hardware"],
    bullets: [
      "Engineered an end-to-end \\textbf{smartphone data analytics platform} analyzing 400+ devices with dynamic Value-for-Money (VFM) scoring and market price curve evaluation.",
      "Developed data pipelines using \\textbf{Python \\& Pandas} for min-max hardware normalization, dataset deduplication, and real-time dual-currency (\\₹ INR \\& \\$ USD) conversion.",
      "Built interactive \\textbf{Plotly radar comparison charts} and customizable user personas (Gamer, Creator, Battery Warrior) inside a high-performance \\textbf{Streamlit} dashboard.",
      "Integrated \\textbf{Kaggle API} for live multi-dataset federation, automated ingestion, and spec indexing across global and Indian smartphone releases."
    ]
  }
];

/**
 * Generate exact LaTeX source code from the resume data matching user's template
 */
function generateLatexCode(data) {
  const d = data || initialGivenResume;

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
        const clean = b.replace(/–/g, '--');
        return `\\resumeItem{\n${clean}\n}`;
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
        const clean = b.replace(/–/g, '--');
        return `\\resumeItem{\n${clean}\n}`;
      }).join('\n');
      return `\\resumeProjectHeading\n{\\textbf{${p.title}} $|$\n\\emph{${p.techStack}}}\n${gitLink}\n\n\\resumeItemListStart\n${bullets}\n\\resumeItemListEnd`;
    })
    .join('\n\n');

  const achievementsLatex = d.achievements
    .map(a => {
      if (typeof a === 'string') {
        const clean = a.replace(/–/g, '--');
        return `\\resumeItem{\n${clean}\n}`;
      }
      const prefix = a.text.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}').replace(/–/g, '--');
      const link = a.linkUrl ? `\\href{${a.linkUrl}}{\\underline{${a.linkText}}}.` : '';
      return `\\resumeItem{\n${prefix}${link}\n}`;
    })
    .join('\n');

  const certificationsLatex = d.certifications
    .map(c => {
      const clean = typeof c === 'string'
        ? c.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}').replace(/&/g, '\\&').replace(/–/g, '--')
        : c;
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
}

module.exports = {
  masterResume: initialGivenResume,
  allPortfolioProjects,
  generateLatexCode
};
