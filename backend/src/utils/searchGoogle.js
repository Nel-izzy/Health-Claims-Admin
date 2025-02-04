import axios from 'axios';

export const fetchGoogleResults = async (query) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

    if (!query) {
        throw new Error('No search query provided');
    }

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}`;

    try {
        const response = await axios.get(url);

        if (!response.data.items || !Array.isArray(response.data.items)) {
            //console.log("No valid search results received:", response.data);
            return [];
        }

        return response.data.items.map(item => ({
            title: item.title || '',
            link: item.link || ''
        }));
    } catch (error) {
        console.error('Error performing search:', error.response ? error.response.data : error.message);
        throw new Error('Search request failed');
    }
};
