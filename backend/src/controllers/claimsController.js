import Claim from '../models/claimModel.js';
import Influencer from '../models/influencerModel.js';
import { fetchGoogleResults } from '../utils/searchGoogle.js';


// Analyze a claim and save it to the database
export const analyzeClaim = async (req, res) => {
    try {
        const { claim, influencerHandle } = req.body;

        if (!claim || !influencerHandle) {
            return res.status(400).json({ error: 'Claim text and influencer handle are required' });
        }

        // Find the influencer by handle
        const influencer = await Influencer.findOne({ handle: influencerHandle });

        if (!influencer) {
            return res.status(404).json({ error: 'Influencer not found' });
        }

        // Fetch search results
        const searchResults = await fetchGoogleResults(claim);// Pass claim directly

        if (!searchResults || !Array.isArray(searchResults)) {
            return res.status(500).json({ error: 'Failed to fetch search results' });
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

        // Create and save the claim to the database
        const newClaim = new Claim({
            text: claim,
            status,
            score,
            sources,
            influencer: influencer._id
        });

        await newClaim.save();

        res.json(newClaim);
    } catch (error) {
        console.error('Error analyzing claim:', error);
        res.status(500).json({ error: 'Error analyzing claim' });
    }
};

// Fetch all claims from the database
export const getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find().populate('influencer', 'name handle platform followerCount').sort({ analyzedAt: -1 });
        res.json(claims);
    } catch (error) {
        console.error('Error fetching claims:', error);
        res.status(500).json({ error: 'Error fetching claims' });
    }
};
