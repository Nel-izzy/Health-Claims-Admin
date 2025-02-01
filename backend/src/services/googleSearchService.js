import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.GOOGLE_CSE_ID;  // Your Custom Search Engine ID
const BASE_URL = 'https://www.googleapis.com/customsearch/v1';

export const fetchGoogleResearch = async (query) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: GOOGLE_API_KEY,
                cx: SEARCH_ENGINE_ID,
                q: query
            }
        });

        return response.data.items || [];
    } catch (error) {
        console.error('Error fetching Google research:', error.response?.data || error.message);
        throw new Error('Failed to retrieve research from Google.');
    }
};
