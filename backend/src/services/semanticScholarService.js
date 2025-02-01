import axios from 'axios';

const BASE_URL = 'https://api.semanticscholar.org/graph/v1/paper/search';

export const fetchSemanticScholarResearch = async (query) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: { query, fields: 'title,authors,url,abstract' }
        });

        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching Semantic Scholar data:', error.response?.data || error.message);
        throw new Error('Failed to retrieve research from Semantic Scholar.');
    }
};
