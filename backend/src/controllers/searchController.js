import axios from 'axios';

export const searchGoogle = async (req, res) => {
    const { query } = req.query;
    const apiKey = process.env.GOOGLE_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

    if (!query) {
        return res.status(400).json({ error: 'No Search query' });
    }

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}`;

    try {
        const response = await axios.get(url);

        if (!response.data.items || !Array.isArray(response.data.items)) {
            console.log("No valid search results received:", response.data);
            return res.json({ query, results: [] });
        }

        const results = response.data.items.map(item => ({
            title: item.title || '',
            link: item.link || ''
        }));

        return res.json({ query, results });
    } catch (error) {
        console.error('Error performing search:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Search Request Failed' });
    }
};
