import { searchGoogle } from './searchController.js';

const claimsCache = [];

export const analyzeClaim = async (req, res) => {
    try {
        const { claim } = req.body;
        console.log('Received request body:', req.body);

        if (!claim) {
            return res.status(400).json({ error: 'Claim text is required' });
        }

        // Fetch search results
        const searchResults = await searchGoogle({ query: claim, internalCall: true });

        if (!Array.isArray(searchResults) || searchResults.length === 0) {
            return res.json({ claim, status: 'Questionable', score: 50, sources: [] });
        }

        // Simple analysis: Check if sources support the claim
        let verifiedCount = 0;
        let debunkedCount = 0;
        const sources = searchResults.map((result) => result.link || '');

        searchResults.forEach((result) => {
            const lowerTitle = (result.title || '').toLowerCase();
            if (lowerTitle.includes('myth') || lowerTitle.includes('false')) {
                debunkedCount++;
            } else if (lowerTitle.includes('scientific') || lowerTitle.includes('study')) {
                verifiedCount++;
            }
        });

        let status = 'Questionable';
        let score = 50;

        if (verifiedCount > debunkedCount) {
            status = 'Verified';
            score = 85;
        } else if (debunkedCount > verifiedCount) {
            status = 'Debunked';
            score = 20;
        }

        const result = { claim, status, score, sources };
        claimsCache.push(result);

        console.log('Final analysis result:', result);
        res.json(result);
    } catch (error) {
        console.error('Error Analyzing claim:', error);
        res.status(500).json({ error: 'Error Analyzing claim' });
    }
};
