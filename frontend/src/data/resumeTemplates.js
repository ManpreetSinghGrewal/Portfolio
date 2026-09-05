// LaTeX Resume Templates definitions and generators for Frontend Studio
// Supporting: Classic Academic, Modern Navy, Two-Column Paracol, Software Engineer, Clean Minimalist

function formatBullet(bullet) {
  if (!bullet) return '';
  let b = bullet
    .replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}')
    .replace(/\\textbf\{(.*?)\}/g, '\\textbf{$1}')
    .replace(/–/g, '--')
    .replace(/—/g, '---');
  return b;
}

export const resumeTemplatesList = [
  {
    id: 'classic',
    name: 'Classic Academic',
    badge: 'Official',
    description: 'Serif Computer Modern styling with small-caps section titles, tabularx education, and clean subheadings.',
    primaryColor: '#000000',
    fontStyle: 'serif',
    layout: 'single'
  },
  {
    id: 'modern-navy',
    name: 'Modern Navy Accent',
    badge: 'Executive',
    description: 'Executive sans-serif layout with Navy Blue (#1e4678) headings, clean horizontal dividers, and tight margins.',
    primaryColor: '#1e4678',
    fontStyle: 'sans',
    layout: 'single'
  },
  {
    id: 'two-column',
    name: 'Modern Two-Column',
    badge: 'Paracol',
    description: 'Modern two-column layout with sidebar for contact, skills, and certifications, leaving space for experience & projects.',
    primaryColor: '#1e508c',
    fontStyle: 'sans',
    layout: 'two-column'
  },
  {
    id: 'software-dev',
    name: 'Software Engineer',
    badge: 'Tabular',
    description: 'Clean tabular skills grid with dedicated Internship and Project sections.',
    primaryColor: '#000000',
    fontStyle: 'sans',
    layout: 'single'
  },
  {
    id: 'minimalist',
    name: 'Clean Minimalist',
    badge: 'ATS Single',
    description: 'Straightforward, elegant single-column format with bold underlined titles and high readability.',
    primaryColor: '#111827',
    fontStyle: 'sans',
    layout: 'single'
  }
];

export const generateTemplateLatex = (templateId, d) => {
  if (!d) return '';

  switch (templateId) {
    case 'modern-navy': {
      const skillsLines = Object.entries(d.technicalSkills)
        .map(([cat, val]) => `\\textbf{${cat}:} ${val}\\\\`)
        .join('\n');

      const projectBlocks = d.projects.map(p => {
        const bullets = p.bullets.map(b => `    \\item ${formatBullet(b)}`).join('\n');
        return `\\textbf{${p.title}} $|$ \\textit{${p.techStack}}\n\\begin{itemize}[leftmargin=*]\n${bullets}\n\\end{itemize}`;
      }).join('\n\n');

      const achievementsList = d.achievements.map(a => {
        if (typeof a === 'string') return `    \\item ${formatBullet(a)}`;
        const link = a.linkUrl ? ` -- \\href{${a.linkUrl}}{${a.linkText}}` : '';
        return `    \\item ${formatBullet(a.text)}${link}`;
      }).join('\n');

      const certsList = d.certifications.map(c => `    \\item ${formatBullet(typeof c === 'string' ? c : c.text || '').replace(/&/g, '\\&')}`).join('\n');

      return `\\documentclass[10pt,a4paper]{article}

\\usepackage[margin=0.55in]{geometry}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{titlesec}

\\definecolor{heading}{RGB}{30,70,120}

\\titleformat{\\section}
{\\color{heading}\\large\\bfseries}
{}{0em}{}[\\titlerule]

\\begin{document}

\\begin{center}
    {\\Huge \\textbf{${d.personalInfo.name}}}\\\\[4pt]
    \\textit{Software Developer $|$ Computer Science Engineering Student}\\\\[4pt]
    ${d.personalInfo.phone} \\quad
    \\href{mailto:${d.personalInfo.email}}{${d.personalInfo.email}} \\quad
    \\href{${d.personalInfo.linkedin}}{LinkedIn} \\quad
    \\href{${d.personalInfo.github}}{GitHub}
\\end{center}

\\section*{PROFILE}
${d.careerObjective}

\\section*{SKILLS}
${skillsLines}

\\section*{EDUCATION}
\\textbf{B.E. -- Computer Science Engineering} \\hfill 2024--2028\\\\
Chitkara University, Punjab \\hfill CGPA: 9.26/10

\\textbf{Class XII (CBSE)} \\hfill 2024\\\\
The Cambridge School

\\textbf{Class X (CBSE)} \\hfill 2022\\\\
The Cambridge School

\\section*{EXPERIENCE}
\\textbf{Frontend Developer Intern} -- Algoryx Technologies \\hfill June 2026 -- July 2026
\\begin{itemize}[leftmargin=*]
${d.experience[0].bullets.map(b => `    \\item ${formatBullet(b)}`).join('\n')}
\\end{itemize}

\\section*{PROJECTS}
${projectBlocks}

\\section*{ACHIEVEMENTS}
\\begin{itemize}[leftmargin=*]
${achievementsList}
\\end{itemize}

\\section*{CERTIFICATIONS}
\\begin{itemize}[leftmargin=*]
${certsList}
\\end{itemize}

\\end{document}`;
    }

    case 'two-column': {
      const skillsItems = Object.entries(d.technicalSkills)
        .map(([cat, val]) => `    \\item \\textbf{${cat}:} ${val}`)
        .join('\n');

      const projectBlocks = d.projects.map(p => `\\textbf{${p.title}} $|$ \\textit{${p.techStack}}
\\begin{itemize}[leftmargin=*]
${p.bullets.map(b => `    \\item ${formatBullet(b)}`).join('\n')}
\\end{itemize}`).join('\n');

      return `\\documentclass[10pt,a4paper]{article}

\\usepackage[margin=0.5in]{geometry}
\\usepackage{paracol}
\\usepackage{enumitem}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{titlesec}

\\definecolor{blue}{RGB}{30,80,140}

\\titleformat{\\section}
{\\color{blue}\\large\\bfseries}
{}{0em}{}

\\begin{document}

\\begin{center}
{\\Huge \\textbf{${d.personalInfo.name}}}\\\\
Software Engineer $|$ Full-Stack Developer\\\\
${d.personalInfo.email} \\quad ${d.personalInfo.phone}
\\end{center}

\\vspace{4pt}

\\begin{paracol}{2}

\\section*{CONTACT}
${d.personalInfo.location}\\\\
${d.personalInfo.phone}\\\\
${d.personalInfo.email}\\\\
\\href{${d.personalInfo.linkedin}}{LinkedIn}\\\\
\\href{${d.personalInfo.github}}{GitHub}

\\section*{SKILLS}
\\begin{itemize}[leftmargin=*]
${skillsItems}
\\end{itemize}

\\section*{ACHIEVEMENTS}
\\begin{itemize}[leftmargin=*]
    \\item \\textbf{300+ LeetCode problems solved}
    \\item \\textbf{Sandbox 2.0 Hackathon Finalist}
    \\item \\textbf{University Hackathon Winner} (1 of 24 teams)
\\end{itemize}

\\section*{CERTIFICATIONS}
\\begin{itemize}[leftmargin=*]
    \\item Python Foundation Certification
    \\item Cybersecurity for Everyone
    \\item Red Hat SysAdmin (RH124/134)
\\end{itemize}

\\switchcolumn

\\section*{PROFILE}
${d.careerObjective}

\\section*{EDUCATION}
\\textbf{B.E. in Computer Science}\\\\
Chitkara University, Punjab\\\\
2024--2028 \\hfill CGPA: 9.26/10

\\textbf{Class XII (CBSE)}\\\\
The Cambridge School \\hfill 2024

\\section*{EXPERIENCE}
\\textbf{Algoryx Technologies} \\hfill Jun--Jul 2026\\\\
\\textit{Frontend Developer Intern}
\\begin{itemize}[leftmargin=*]
${d.experience[0].bullets.map(b => `    \\item ${formatBullet(b)}`).join('\n')}
\\end{itemize}

\\section*{PROJECTS}
${projectBlocks}

\\end{paracol}

\\end{document}`;
    }

    case 'software-dev': {
      const skillsTableRows = Object.entries(d.technicalSkills)
        .map(([cat, val]) => `${cat} & ${val} \\\\`)
        .join('\n');

      return `\\documentclass[11pt,a4paper]{article}

\\usepackage[margin=0.6in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}

\\titleformat{\\section}
{\\large\\bfseries}
{}{0em}{}[\\titlerule]

\\begin{document}

\\begin{center}
{\\LARGE \\textbf{${d.personalInfo.name}}}\\\\
\\textbf{Software Developer}\\\\
\\href{mailto:${d.personalInfo.email}}{${d.personalInfo.email}}
\\;|\\; ${d.personalInfo.phone}
\\;|\\; \\href{${d.personalInfo.linkedin}}{LinkedIn}
\\;|\\; \\href{${d.personalInfo.github}}{GitHub}
\\end{center}

\\section*{SUMMARY}
${d.careerObjective}

\\section*{TECHNICAL SKILLS}
\\begin{tabular}{ll}
${skillsTableRows}
\\end{tabular}

\\section*{INTERNSHIP}
\\textbf{Frontend Developer Intern} -- Algoryx Technologies
\\hfill June 2026 -- July 2026
\\begin{itemize}[leftmargin=*]
${d.experience[0].bullets.map(b => `    \\item ${formatBullet(b)}`).join('\n')}
\\end{itemize}

\\section*{PROJECTS}
${d.projects.map(p => `\\textbf{${p.title}} $|$ \\textit{${p.techStack}}
\\begin{itemize}[leftmargin=*]
${p.bullets.map(b => `    \\item ${formatBullet(b)}`).join('\n')}
\\end{itemize}`).join('\n')}

\\section*{EDUCATION}
\\textbf{Bachelor of Engineering in Computer Science} \\hfill 2024--2028\\\\
Chitkara University, Punjab \\hfill CGPA: 9.26/10

\\textbf{Class XII (CBSE)} \\hfill 2024\\\\
The Cambridge School

\\section*{ACHIEVEMENTS \\& CERTIFICATIONS}
\\begin{itemize}[leftmargin=*]
    \\item \\textbf{300+ LeetCode problems solved} -- \\href{https://leetcode.com/u/ManpreetSG/}{LeetCode Profile}
    \\item \\textbf{Sandbox 2.0 Hackathon Finalist} \\& \\textbf{University Hackathon Winner}
    \\item Python Foundation Certification $|$ Cybersecurity for Everyone $|$ Red Hat RH124/RH134
\\end{itemize}

\\end{document}`;
    }

    case 'minimalist': {
      const skillsItems = Object.entries(d.technicalSkills)
        .map(([cat, val]) => `    \\item ${cat}: ${val}`)
        .join('\n');

      return `\\documentclass[11pt,a4paper]{article}

\\usepackage[margin=0.65in]{geometry}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}

\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]

\\begin{document}

\\begin{center}
    {\\LARGE \\textbf{${d.personalInfo.name}}}\\\\
    ${d.personalInfo.location} \\\\
    \\href{mailto:${d.personalInfo.email}}{${d.personalInfo.email}} $|$
    ${d.personalInfo.phone} $|$
    \\href{${d.personalInfo.linkedin}}{LinkedIn} $|$
    \\href{${d.personalInfo.github}}{GitHub}
\\end{center}

\\section*{Career Objective}
${d.careerObjective}

\\section*{Education}
\\textbf{Bachelor of Engineering in Computer Science} \\hfill 2024--2028\\\\
Chitkara University, Punjab \\hfill CGPA: 9.26/10

\\textbf{Class XII (CBSE)} \\hfill 2024\\\\
The Cambridge School

\\textbf{Class X (CBSE)} \\hfill 2022\\\\
The Cambridge School

\\section*{Technical Skills}
\\begin{itemize}[leftmargin=*]
${skillsItems}
\\end{itemize}

\\section*{Experience}
\\textbf{Frontend Developer Intern} -- Algoryx Technologies \\hfill June 2026 -- July 2026
\\begin{itemize}[leftmargin=*]
${d.experience[0].bullets.map(b => `    \\item ${formatBullet(b)}`).join('\n')}
\\end{itemize}

\\section*{Projects}
${d.projects.map(p => `\\textbf{${p.title}} \\hfill \\textit{${p.techStack}}
\\begin{itemize}[leftmargin=*]
${p.bullets.map(b => `    \\item ${formatBullet(b)}`).join('\n')}
\\end{itemize}`).join('\n')}

\\section*{Certifications}
\\begin{itemize}[leftmargin=*]
${d.certifications.map(c => `    \\item ${formatBullet(typeof c === 'string' ? c : c.text || '').replace(/&/g, '\\&')}`).join('\n')}
\\end{itemize}

\\section*{Achievements}
\\begin{itemize}[leftmargin=*]
    \\item \\textbf{300+ LeetCode problems solved} -- \\href{https://leetcode.com/u/ManpreetSG/}{LeetCode Profile}
    \\item \\textbf{Sandbox 2.0 Hackathon Finalist} -- Selected for final round
    \\item \\textbf{University Hackathon Winner} -- Selected as only team among 24 participating groups
\\end{itemize}

\\end{document}`;
    }

    case 'classic':
    default: {
      const skillsLatex = Object.entries(d.technicalSkills)
        .map(([category, val]) => `\\textbf{${category}:}\n${val}\\\\[4pt]`)
        .join('\n\n');

      const educationRows = d.education
        .map((edu, idx) => {
          const spacing = idx < d.education.length - 1 ? '\\\\[5pt]' : '';
          return `${edu.study} &\n${edu.year.replace(/–/g, '--')} &\n${edu.school}\n${spacing}`.trim();
        })
        .join('\n\n');

      const experienceLatex = d.experience
        .map(exp => {
          const bullets = exp.bullets.map(b => `\\resumeItem{\n${formatBullet(b)}\n}`).join('\n');
          return `\\resumeSubheading\n{${exp.company}}{${exp.period.replace(/–/g, '--')}}\n{${exp.role}}{${exp.location}}\n\n\\resumeItemListStart\n${bullets}\n\\resumeItemListEnd`;
        })
        .join('\n\n');

      const projectsLatex = d.projects
        .map(p => {
          const gitLink = p.githubUrl ? `{\\href{${p.githubUrl}}{\\underline{${p.githubUrl.includes('render') ? 'Live Demo' : 'GitHub'}}}}` : `{}`;
          const bullets = p.bullets.map(b => `\\resumeItem{\n${formatBullet(b)}\n}`).join('\n');
          return `\\resumeProjectHeading\n{\\textbf{${p.title}} $|$\n\\emph{${p.techStack}}}\n${gitLink}\n\n\\resumeItemListStart\n${bullets}\n\\resumeItemListEnd`;
        })
        .join('\n\n');

      const achievementsLatex = d.achievements
        .map(a => {
          if (typeof a === 'string') return `\\resumeItem{\n${formatBullet(a)}\n}`;
          const prefix = formatBullet(a.text);
          const link = a.linkUrl ? `\\href{${a.linkUrl}}{\\underline{${a.linkText}}}.` : '';
          return `\\resumeItem{\n${prefix}${link}\n}`;
        })
        .join('\n');

      const certificationsLatex = d.certifications
        .map(c => `\\resumeItem{\n${typeof c === 'string' ? formatBullet(c).replace(/&/g, '\\&') : c}\n}`)
        .join('\n');

      return `%-------------------------
% Resume in Latex - Classic Academic
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

\\usepackage[T1]{fontenc}
\\usepackage{lmodern}

\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.55in}
\\addtolength{\\evensidemargin}{-0.55in}
\\addtolength{\\textwidth}{1.1in}
\\addtolength{\\topmargin}{-0.62in}
\\addtolength{\\textheight}{1.22in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{\\scshape\\raggedright\\large}{}{0em}{}[\\color{black}\\titlerule]
\\titlespacing{\\section}{0pt}{9pt}{5pt}
\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{\\item\\small{#1}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{2pt}\\item
  \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
    \\textbf{#1} & #2 \\\\
    \\textit{\\small#3} & \\textit{\\small#4} \\\\
  \\end{tabular*}\\vspace{-3pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
  \\vspace{2pt}\\item
  \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
    \\small#1 & #2 \\\\
  \\end{tabular*}\\vspace{-2pt}
}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in,label={},itemsep=0pt,topsep=0pt,parsep=0pt]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}[leftmargin=0.18in,itemsep=2pt,topsep=2pt,parsep=0pt]}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape ${d.personalInfo.name}}\\\\[3pt]
    \\small
    ${d.personalInfo.phone} $|$
    \\href{mailto:${d.personalInfo.email}}{\\underline{${d.personalInfo.email}}} $|$
    ${d.personalInfo.location}
\\end{center}

\\vspace{2pt}

\\section{Career Objective}
\\small{
${d.careerObjective}
}

\\section{Technical Skills}
\\small{
${skillsLatex}
}

\\section{Education}
\\renewcommand{\\arraystretch}{1.25}
\\begin{tabularx}{\\textwidth}{p{4.2cm} p{1.8cm} X}
\\textbf{Study} & \\textbf{Year} & \\textbf{School / University} \\\\[5pt]
${educationRows}
\\end{tabularx}
\\vspace{5pt}

\\section{Experience}
\\resumeSubHeadingListStart
${experienceLatex}
\\resumeSubHeadingListEnd

\\section{Projects}
\\resumeSubHeadingListStart
${projectsLatex}
\\resumeSubHeadingListEnd

\\section{Achievements}
\\resumeItemListStart
${achievementsLatex}
\\resumeItemListEnd

\\section{Certifications}
\\resumeItemListStart
${certificationsLatex}
\\resumeItemListEnd

\\end{document}`;
    }
  }
};
