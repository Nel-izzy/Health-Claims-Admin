import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const BASE_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

export const analyzeClaimWithGemini = async (claim, researchData) => {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ role: "user", parts: [{ text: `Analyze this health claim: ${claim}` }] }]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );


        return response.data.candidates[0].content;
    } catch (error) {
        console.error('Error analyzing claim with Gemini:', error.response?.data || error.message);
        throw new Error('Failed to analyze claim with Gemini.');
    }
};
