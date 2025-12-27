
require("dotenv").config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const PDFParser = require("pdf2json");
const { GoogleGenerativeAI } = require('@google/generative-ai');

// === 1. AI & RAG SETUP ===

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Use a fast model


// This is your REAL 'Generate' function
const callLLM = async (promptRAG) => {
  console.log('...Sending prompt to Gemini...');
  try {
    const result = await model.generateContent(promptRAG);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    throw new Error('Failed to generate content from AI');
  }
};

const getTextFromPdfBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    // 1. Create a new parser
    const pdfParser = new PDFParser(this, 1);

    // 2. Set up an error listener
    pdfParser.on("pdfParser_dataError", errData => {
      console.error("Error parsing PDF:", errData.parserError);
      reject(new Error("Failed to parse PDF file."));
    });

    // 3. Set up a success listener
    pdfParser.on("pdfParser_dataReady", pdfData => {
      // 4. Get the raw text content
      const resumeText = pdfParser.getRawTextContent();
      resolve(resumeText);
    });

    // 5. Start parsing the buffer
    pdfParser.parseBuffer(buffer);
  });
};

// --- THIS IS THE FIX ---
// A helper function to safely extract a JSON object from a string
function extractJson(text) {
  // Find the first '{' and the last '}'
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("No JSON object found in AI response:", text);
    throw new Error('No JSON object found in AI response.');
  }

  try {
    // Parse the extracted string
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Failed to parse extracted JSON:", error.message);
    throw new Error('Failed to parse JSON from AI response.');
  }
}
// --- END FIX ---


// --- Mock RAG 'Retrieval' Functions ---
const retrieveWebContext = async (topic) => {
  console.log(`[RAG Step 1: Retrieving context for topic: ${topic}]`);
  return `
    Snippet 1: The PERN stack is a popular technology stack for building full-stack web applications.
    Snippet 2: It consists of PostgreSQL, Express.js, React, and Node.js.
  `;
};

const retrieveExampleTitles = async (category) => {
  console.log(`[RAG Step 1: Retrieving titles for category: ${category}]`);
  return `
    - "The 10 Best Tools for Web Developers in 2025"
    - "How We Grew Our SaaS to $100k/mo"
  `;
};

const retrieveResumeBestPractices = async () => {
  console.log('[RAG Step 1: Retrieving résumé best practices]');
  return `
    A good resume should: 
    1. Start with a strong summary. 
    2. Use action verbs (e.g., 'Managed', 'Developed'). 
    3. Quantify achievements with numbers (e.g., 'Increased sales by 20%').
  `;
};

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// === 2. API ROUTES ===

// --- 🔹 Mock Image Generator ---
router.post('/image-generator', (req, res) => {
  const { prompt } = req.body;
  console.log('🖼️ Received prompt:', prompt);
  const mockImageUrl =
    'https://images.unsplash.com/photo-1665686308827-eb62e4f6604d?w=800&q=80';
  res.status(200).json({ imageUrl: mockImageUrl });
});

// --- 🔹 Article Generator (JSON METHOD) - FIXED ---
router.post('/article-generator', async (req, res) => {
  try {
    const { topic, length } = req.body;
    const context = await retrieveWebContext(topic); // 1. Retrieve

    // 2. AUGMENT: This prompt is now much stricter
    const promptRAG = `
      You are an expert content writer. Your task is to write a high-quality, structured article based ONLY on the [Retrieved Context].
      Topic: ${topic}
      Length: ${length}
      [Retrieved Context]:
      ${context}
      
      CRITICAL INSTRUCTIONS:
      You MUST return your response as a valid JSON object. Do not write any text outside of the JSON structure.
      The JSON object must follow this *exact* schema:
      {
        "title": "Your Generated Article Title",
        "sections": [
          { "type": "heading", "content": "Your Section Heading" },
          { "type": "paragraph", "content": "Your first paragraph of text." },
          { "type": "paragraph", "content": "Your second paragraph of text." },
          { "type": "heading", "content": "Your Second Section Heading" },
          { "type": "paragraph", "content": "Another paragraph." }
        ]
      }
    `;

    // 3. GENERATE
    const aiResponseText = await callLLM(promptRAG);

    // 4. Parse the JSON using our new, safe function
    const generatedJson = extractJson(aiResponseText);

    res.status(200).json({ generated_output: generatedJson }); // Send the JSON object to the frontend
  } catch (error) {
    console.error("Failed to generate or parse article:", error.message);
    res.status(500).json({ error: "Failed to generate article" });
  }
});

// --- 🔹 Blog Title Generator (JSON METHOD) - UPDATED ---
router.post('/blog-title-generator', async (req, res) => {
  try {
    const { keyword, category } = req.body;
    const examples = await retrieveExampleTitles(category); // 1. Retrieve

    // 2. AUGMENT: This prompt now demands JSON
    const promptRAG = `
      You are a senior copywriter specializing in high-CTR headlines.
      Main Keyword: ${keyword}
      Category: ${category}
      
      INSTRUCTIONS:
      1. Analyze the style of the successful title examples below.
      2. Generate 10 new, original, and catchy titles that incorporate the user's keyword.
      3. You MUST return your response as a valid JSON object. Do not write any text outside the JSON.
      4. The JSON object must follow this *exact* schema:
      {
        "titles": [
          "The 10 Best Tools for Web Developers in 2025",

"How We Grew Our SaaS to $100k/mo",

"Are You Making These 5 Common SEO Mistakes?",

"Why We Switched from Trello to Asana (And Why You Should Too)",

"The Ultimate Guide to Content Marketing",

"How We Grew Our Blog 300% in 6 Months",

"7 Ways to Use AI to Automate Your Workflow",

"The Future of Remote Work: What You Need to Know",

"A Beginner's Guide to Understanding RAG",

"5 Secrets to Writing Headlines That Get More Clicks",
        ]
      }
      
      [Example Successful Titles]:
      ${examples}
    `;

    // 3. GENERATE
    const aiResponseText = await callLLM(promptRAG);

    // 4. Parse the JSON using our new, safe function
    const generatedJson = extractJson(aiResponseText);

    res.status(200).json({ generated_output: generatedJson }); // Send the JSON object
  } catch (error) {
    console.error("Failed to generate or parse titles:", error.message);
    res.status(500).json({ error: "Failed to generate titles" });
  }
});

// --- 🔹 Resume Analyzer (RAG) - UPDATED ---
router.post('/resume-analyzer', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded.' });
    }

    console.log("Parsing PDF with pdf2json...");
    // Use our new helper function
    const resumeText = await getTextFromPdfBuffer(req.file.buffer); 
    console.log("PDF parsed successfully.");
    const bestPractices = await retrieveResumeBestPractices(); // 1. Retrieve

    const promptRAG = `
      You are a professional career coach. Your task is to provide a detailed analysis of the user's résumé based ONLY on the [Résumé Best Practices].
      Provide your output in the following strict JSON format.

      [Resume Text]:
      ${resumeText.substring(0, 4000)} ...

      [Résumé Best Practices]:
      ${bestPractices}

      Analysis Output (JSON):
      {
        "strengths": [
          { "point": "Your point here...", "evidence": "Evidence from resume..." }
        ],
        "weaknesses": [
          { "point": "Your point here...", "evidence": "Evidence from resume..." }
        ],
        "suggestions_for_improvement": [
          { "suggestion": "Your suggestion here..." }
        ]
      }
    `; // 2. Augment

    const analysisJsonText = await callLLM(promptRAG); // 3. Generate

    // 4. Parse the JSON using our new, safe function
    const analysis = extractJson(analysisJsonText); 

    res.status(200).json({ analysis_result: analysis });
  } catch (error) {
    console.error("Failed to parse resume analysis:", error.message);
    res.status(500).json({ error: "Failed to parse resume analysis" });
  }
});

module.exports = router;