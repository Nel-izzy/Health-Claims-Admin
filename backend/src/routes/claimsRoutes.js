import express from 'express';
import { fetchGoogleResearch } from '../services/googleSearchService.js';
import { fetchSemanticScholarResearch } from '../services/semanticScholarService.js';
import { analyzeClaimWithGemini } from '../services/geminiService.js';
import { analyzeClaim } from '../controllers/claimsController';

const router = express.Router();

router.post('/verify', async (req, res) => {
    try {
        const { claim } = req.body;
        if (!claim) return res.status(400).json({ error: 'Claim is required' });

        // Step 1: Get research from Google Search API
        const googleResearch = await fetchGoogleResearch(claim);

        // Step 2: Get academic research from Semantic Scholar
        const scholarResearch = await fetchSemanticScholarResearch(claim);

        // Step 3: Analyze claim with Gemini AI
        const aiAnalysis = await analyzeClaimWithGemini(claim, { googleResearch, scholarResearch });

        // Step 4: Return results
        res.json({ claim, googleResearch, scholarResearch, aiAnalysis });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/analyze', analyzeClaim);

export default router;
