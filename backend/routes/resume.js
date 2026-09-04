const express = require('express');
const router = express.Router();
let defaultMasterResume = require('../data/masterResume');

let activeMasterResume = JSON.parse(JSON.stringify(defaultMasterResume));

const TECH_KEYWORDS = [
  'react', 'react.js', 'node', 'node.js', 'typescript', 'javascript', 'express', 'express.js',
  'mongodb', 'mongoose', 'sql', 'postgresql', 'mysql', 'redis', 'webrtc', 'socket.io',
  'rest', 'restful', 'api', 'apis', 'graphql', 'next.js', 'tailwind', 'tailwind css',
  'html', 'html5', 'css', 'css3', 'git', 'github', 'docker', 'aws', 'linux', 'c++', 'java',
  'python', 'data structures', 'algorithms', 'dsa', 'system design', 'jwt', 'oauth',
  'gemini', 'ai', 'machine learning', 'frontend', 'backend', 'full-stack', 'fullstack'
];

function extractKeywords(jdText) {
  if (!jdText) return [];
  const lower = jdText.toLowerCase();
  const matched = [];

  TECH_KEYWORDS.forEach(keyword => {
    const isSpecial = /[^a-z0-9]/i.test(keyword);
    if (isSpecial) {
      if (lower.includes(keyword.toLowerCase())) {
        matched.push(keyword);
      }
    } else {
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(lower)) {
        matched.push(keyword);
      }
    }
  });

  return Array.from(new Set(matched));
}

function computeAtsScore(jdKeywords) {
  if (!jdKeywords || jdKeywords.length === 0) {
    return { score: 88, matched: ['Full-Stack', 'React.js', 'Node.js'], missing: [] };
  }

  const profileKeywords = [
    'react', 'react.js', 'node', 'node.js', 'express', 'express.js', 'mongodb', 'javascript',
    'c++', 'java', 'html', 'css', 'git', 'github', 'socket.io', 'gemini', 'tailwind', 'tailwind css',
    'webrtc', 'jwt', 'rest', 'api', 'dsa', 'algorithms', 'linux', 'python'
  ];

  const matched = [];
  const missing = [];

  jdKeywords.forEach(kw => {
    if (profileKeywords.some(pk => pk.includes(kw) || kw.includes(pk))) {
      matched.push(kw);
    } else {
      missing.push(kw);
    }
  });

  const ratio = jdKeywords.length > 0 ? matched.length / jdKeywords.length : 0.85;
  const rawScore = Math.round(70 + (ratio * 28));
  const score = Math.min(98, Math.max(72, rawScore));

  return { score, matched, missing };
}

function tailorRuleBased(jdText, targetRole, masterData) {
  const jdKeywords = extractKeywords(jdText);
  const { score, matched, missing } = computeAtsScore(jdKeywords);

  const roleTitle = targetRole || (jdKeywords.includes('frontend') ? 'Frontend Developer' :
                                   jdKeywords.includes('backend') ? 'Backend Developer' :
                                   'Full-Stack Developer');

  // Tailor Career Objective to match sample resume tone
  const primarySkills = matched.slice(0, 3).map(k => k.charAt(0).toUpperCase() + k.slice(1)).join(', ');
  const tailoredObjective = `Computer Science student passionate about building useful and reliable web applications from idea to implementation. Interested in growing as a ${roleTitle.toLowerCase()} with focus on ${primarySkills || 'modern web technologies'}, learning from experienced teams, and turning practical challenges into simple, user-friendly solutions.`;

  // Select top 2 projects best matching the JD
  const candidateProjects = [...masterData.projects];
  candidateProjects.sort((a, b) => {
    const aLower = (a.title + ' ' + a.techStack + ' ' + a.bullets.join(' ')).toLowerCase();
    const bLower = (b.title + ' ' + b.techStack + ' ' + b.bullets.join(' ')).toLowerCase();

    const aMatches = jdKeywords.filter(k => aLower.includes(k)).length;
    const bMatches = jdKeywords.filter(k => bLower.includes(k)).length;
    return bMatches - aMatches;
  });

  const selectedProjects = candidateProjects.slice(0, 2);

  return {
    tailoredResume: {
      ...masterData,
      careerObjective: tailoredObjective,
      projects: selectedProjects
    },
    matchScore: score,
    matchedKeywords: matched,
    missingKeywords: missing.slice(0, 6),
    mode: 'ats-engine'
  };
}

async function tailorWithGemini(apiKey, jdText, targetRole, masterData) {
  let GoogleGenerativeAI;
  try {
    const geminiPkg = require('@google/generative-ai');
    GoogleGenerativeAI = geminiPkg.GoogleGenerativeAI;
  } catch (err) {
    console.warn('Gemini package not available, falling back to rule-based ATS engine.');
    return tailorRuleBased(jdText, targetRole, masterData);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are an expert Technical Recruiter and ATS Optimization Specialist.
You have been provided with:
1. Target Job Description (JD)
2. Target Role (optional)
3. Master Candidate Profile for "Manpreet Singh", formatted according to his exact LaTeX academic sample resume.

TASK:
Tailor the candidate's resume for this specific Job Description. Strictly keep the exact same section names, education table, contact info, and genuine facts (Chitkara University B.E. CSE 2024–2028, Algoryx Technologies internship, LeetCode 300+, hackathons, certifications).

Only tailor:
1. "careerObjective": 2-3 concise sentences tailored specifically to the target role and key technical requirements of this JD, in the exact voice of the sample.
2. "technicalSkills": Order and emphasize skills matching the JD.
3. "projects": Select the 2 most relevant projects among Quiz Arena, SiteFlow AI, and HostelAdda, fine-tuning bolded keywords in bullet points to highlight skills mentioned in the JD.

Output ONLY valid, parseable JSON with NO markdown formatting, NO backticks:
{
  "tailoredResume": {
    "personalInfo": {
      "name": "Manpreet Singh",
      "phone": "+91 7888344778",
      "email": "manpreetsgrewal5911@gmail.com",
      "location": "Dehlon, Punjab, India",
      "linkedin": "https://linkedin.com/in/manpreet-singh",
      "github": "https://github.com/ManpreetSinghGrewal"
    },
    "careerObjective": "...",
    "education": ${JSON.stringify(masterData.education)},
    "technicalSkills": ${JSON.stringify(masterData.technicalSkills)},
    "experience": ${JSON.stringify(masterData.experience)},
    "projects": [ ...two most relevant projects with bolded keywords in bullets... ],
    "achievements": ${JSON.stringify(masterData.achievements)},
    "certifications": ${JSON.stringify(masterData.certifications)}
  },
  "matchScore": 94,
  "matchedKeywords": ["list", "of", "matched", "keywords"],
  "missingKeywords": ["list", "of", "missing", "keywords"]
}

JOB DESCRIPTION:
${jdText}

TARGET ROLE:
${targetRole || 'Full-Stack Developer'}

MASTER CANDIDATE DATA:
${JSON.stringify(masterData, null, 2)}
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    const cleanJson = responseText.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleanJson);
    return {
      ...parsed,
      mode: 'gemini'
    };
  } catch (err) {
    console.error('Gemini error, using rule-based engine:', err.message);
    return tailorRuleBased(jdText, targetRole, masterData);
  }
}

// @route   GET /api/resume/master
router.get('/master', (req, res) => {
  res.json({ success: true, masterResume: activeMasterResume });
});

// @route   POST /api/resume/tailor
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
router.post('/reset-master', (req, res) => {
  activeMasterResume = JSON.parse(JSON.stringify(defaultMasterResume));
  res.json({ success: true, message: 'Master resume reset to default', masterResume: activeMasterResume });
});

module.exports = router;
