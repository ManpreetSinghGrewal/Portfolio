const express = require('express');
const router = express.Router();
let defaultMasterResume = require('../data/masterResume');

// In-memory cache for user edits if updated during session
let activeMasterResume = JSON.parse(JSON.stringify(defaultMasterResume));

// Curated technical keywords dictionary for ATS extraction
const TECH_KEYWORDS = [
  'react', 'react.js', 'node', 'node.js', 'typescript', 'javascript', 'express', 'express.js',
  'mongodb', 'mongoose', 'sql', 'postgresql', 'mysql', 'redis', 'webrtc', 'socket.io',
  'rest', 'restful', 'api', 'apis', 'graphql', 'next.js', 'tailwind', 'tailwind css',
  'shadcn', 'html', 'html5', 'css', 'css3', 'sass', 'git', 'github', 'ci/cd', 'docker',
  'kubernetes', 'aws', 'gcp', 'azure', 'linux', 'bash', 'c++', 'python', 'java',
  'data structures', 'algorithms', 'dsa', 'system design', 'microservices', 'agile', 'scrum',
  'testing', 'jest', 'vitest', 'unit testing', 'performance optimization', 'responsive design',
  'seo', 'web security', 'oauth', 'jwt', 'authentication', 'state management', 'redux',
  'gemini', 'openai', 'llm', 'generative ai', 'ai', 'machine learning'
];

/**
 * Extract technical & role keywords found in the Job Description
 */
function extractKeywords(jdText) {
  if (!jdText) return [];
  const lower = jdText.toLowerCase();
  const matched = [];

  TECH_KEYWORDS.forEach(keyword => {
    // Match whole words or standard expressions
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(lower)) {
      matched.push(keyword);
    }
  });

  return Array.from(new Set(matched));
}

/**
 * Calculate ATS Match Score based on Master Skills vs JD Keywords
 */
function computeAtsScore(jdKeywords, masterData) {
  if (!jdKeywords || jdKeywords.length === 0) {
    return { score: 85, matched: ['Full-Stack', 'React', 'Node.js'], missing: [] };
  }

  const allSkills = [
    ...masterData.skills.languages,
    ...masterData.skills.frontend,
    ...masterData.skills.backend,
    ...masterData.skills.toolsAndCloud,
    ...masterData.skills.coreCS
  ].map(s => s.toLowerCase());

  const matched = [];
  const missing = [];

  jdKeywords.forEach(kw => {
    const isMatched = allSkills.some(skill => skill.includes(kw) || kw.includes(skill.split(' ')[0]));
    if (isMatched) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  // Calculate score (normalized between 70% and 98%)
  const ratio = jdKeywords.length > 0 ? matched.length / jdKeywords.length : 0.8;
  const rawScore = Math.round(65 + (ratio * 32));
  const score = Math.min(98, Math.max(70, rawScore));

  return { score, matched, missing };
}

/**
 * Deterministic, intelligent Rule-Based ATS Tailoring
 */
function tailorRuleBased(jdText, targetRole, masterData) {
  const jdKeywords = extractKeywords(jdText);
  const { score, matched, missing } = computeAtsScore(jdKeywords, masterData);

  const roleTitle = targetRole || (jdKeywords.includes('frontend') ? 'Frontend Software Engineer' :
                                   jdKeywords.includes('backend') ? 'Backend Software Engineer' :
                                   'Full-Stack Software Engineer');

  // Tailor Professional Summary
  const topMatchedKeywords = matched.slice(0, 5).map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(', ');
  const tailoredSummary = `Results-driven ${roleTitle} and Top 5% Computer Science undergraduate (CGPA 9.26) with specialized expertise in ${topMatchedKeywords || 'React.js, Node.js, and TypeScript'}. Demonstrated record of architecting high-performance, real-time web solutions and AI-driven platforms, backed by 250+ solved algorithmic challenges on LeetCode and successful software engineering internship delivery.`;

  // Prioritize Skills based on JD matches
  const prioritize = (list) => {
    return [...list].sort((a, b) => {
      const aMatch = jdKeywords.some(kw => a.toLowerCase().includes(kw));
      const bMatch = jdKeywords.some(kw => b.toLowerCase().includes(kw));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  };

  const tailoredSkills = {
    languages: prioritize(masterData.skills.languages),
    frontend: prioritize(masterData.skills.frontend),
    backend: prioritize(masterData.skills.backend),
    toolsAndCloud: prioritize(masterData.skills.toolsAndCloud),
    coreCS: prioritize(masterData.skills.coreCS)
  };

  // Prioritize and tailor Projects
  const prioritizedProjects = [...masterData.projects].sort((a, b) => {
    const aCount = a.techStack.filter(t => jdKeywords.some(kw => t.toLowerCase().includes(kw))).length;
    const bCount = b.techStack.filter(t => jdKeywords.some(kw => t.toLowerCase().includes(kw))).length;
    return bCount - aCount;
  });

  return {
    tailoredResume: {
      ...masterData,
      personalInfo: {
        ...masterData.personalInfo,
        title: roleTitle
      },
      summary: tailoredSummary,
      skills: tailoredSkills,
      projects: prioritizedProjects
    },
    matchScore: score,
    matchedKeywords: matched,
    missingKeywords: missing.slice(0, 8),
    mode: 'ats-engine'
  };
}

/**
 * Gemini-Powered Dynamic ATS Tailoring
 */
async function tailorWithGemini(apiKey, jdText, targetRole, masterData) {
  let GoogleGenerativeAI;
  try {
    const geminiPkg = require('@google/generative-ai');
    GoogleGenerativeAI = geminiPkg.GoogleGenerativeAI;
  } catch (err) {
    console.warn('Gemini package not yet installed, falling back to rule-based ATS engine.');
    return tailorRuleBased(jdText, targetRole, masterData);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Prefer standard model with fast response
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are an expert Technical Recruiter and ATS (Applicant Tracking System) Optimization Specialist.
You have been provided with:
1. Target Job Description (JD)
2. Target Role (optional)
3. Master Profile data for candidate "Manpreet Singh".

TASK:
Tailor the candidate's resume for this specific Job Description to maximize ATS match score while strictly preserving genuine truthfulness and authentic achievements (CGPA 9.26, Chitkara University, Algoryx Technology internship, LeetCode 250+, HostelAdda, SiteFlow AI, Quiz Arena).

Output ONLY valid, parseable JSON with no markdown wrapping or backticks. Schema:
{
  "tailoredResume": {
    "personalInfo": {
      "name": "Manpreet Singh",
      "title": "Targeted Role Title matching JD",
      "email": "manpreet1405.becse24@chitkara.edu.in",
      "phone": "+91 7888344778",
      "location": "Punjab, India",
      "linkedin": "https://linkedin.com/in/manpreet-singh",
      "github": "https://github.com/ManpreetSinghGrewal",
      "portfolio": "https://portfolio.dev"
    },
    "summary": "Impactful 3-4 sentence professional summary tailored specifically to the JD keywords and required competencies.",
    "skills": {
      "languages": ["Languages prioritized for JD"],
      "frontend": ["Frontend technologies prioritized for JD"],
      "backend": ["Backend technologies prioritized for JD"],
      "toolsAndCloud": ["Tools prioritized for JD"],
      "coreCS": ["Core CS topics"]
    },
    "experience": [
      {
        "role": "Software Engineering Intern",
        "company": "Algoryx Technology",
        "location": "Remote",
        "period": "2024 – Present",
        "bullets": ["3 bullet points tailored to emphasize competencies matching the JD"]
      }
    ],
    "projects": [
      {
        "title": "Project Title",
        "role": "Role",
        "techStack": ["Relevant tech stack"],
        "liveUrl": "URL",
        "bullets": ["3-4 bullet points highlighting metrics and JD technologies"]
      }
    ],
    "education": [...],
    "achievements": [...]
  },
  "matchScore": 92,
  "matchedKeywords": ["list", "of", "matched", "keywords"],
  "missingKeywords": ["list", "of", "missing", "keywords", "for", "user", "reference"]
}

JOB DESCRIPTION:
${jdText}

TARGET ROLE:
${targetRole || 'Software Engineer / Full Stack Developer'}

MASTER CANDIDATE DATA:
${JSON.stringify(masterData, null, 2)}
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    // Clean potential markdown fences
    const cleanJson = responseText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleanJson);
    return {
      ...parsed,
      mode: 'gemini'
    };
  } catch (err) {
    console.error('Gemini generation error, falling back to rule-based engine:', err.message);
    return tailorRuleBased(jdText, targetRole, masterData);
  }
}

// @route   GET /api/resume/master
// @desc    Get current master resume
router.get('/master', (req, res) => {
  res.json({ success: true, masterResume: activeMasterResume });
});

// @route   POST /api/resume/tailor
// @desc    Analyze Job Description and return tailored resume JSON
router.post('/tailor', async (req, res) => {
  try {
    const { jobDescription, targetRole, customMaster, apiKey } = req.body;

    if (!jobDescription || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a job description to tailor your resume.' });
    }

    const masterData = customMaster || activeMasterResume;
    const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;

    let result;
    if (effectiveApiKey) {
      result = await tailorWithGemini(effectiveApiKey, jobDescription, targetRole, masterData);
    } else {
      result = tailorRuleBased(jobDescription, targetRole, masterData);
    }

    res.json({ success: true, ...result });
  } catch (error) {
    console.error('Tailor Resume error:', error);
    res.status(500).json({ error: 'Failed to tailor resume: ' + error.message });
  }
});

// @route   POST /api/resume/reset-master
// @desc    Reset master resume back to default
router.post('/reset-master', (req, res) => {
  activeMasterResume = JSON.parse(JSON.stringify(defaultMasterResume));
  res.json({ success: true, message: 'Master resume reset to default', masterResume: activeMasterResume });
});

module.exports = router;
