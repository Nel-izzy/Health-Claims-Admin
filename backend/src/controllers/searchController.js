import { fetchGoogleResults } from '../utils/searchGoogle.js'; // Import the utility function

export const searchGoogle = async (req, res) => {
    try {
        const { query } = req.query || {};

        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }

        const results = await fetchGoogleResults(query);
        return res.json({ query, results });
    } catch (error) {
        console.error('Error in searchGoogle:', error.message);
        return res.status(500).json({ error: 'Search Request Failed' });
    }
};
