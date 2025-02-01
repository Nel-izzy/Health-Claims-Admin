import axios from 'axios';

export const searchGoogle = async (req, res) => {
    try {
        const { query } = req.query;
        const apiKey = process.env.GOOGLE_API_KEY;
        const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}`;
        const response = await axios.get(url);

        res.json({ query, results: response.data.items || [] });
    } catch (error) {
        res.status(500).json({ error: 'Error performing search', details: error.message });
    }
};