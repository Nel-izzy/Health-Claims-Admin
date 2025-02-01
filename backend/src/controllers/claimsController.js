export const analyzeClaim = async (req, res) => {
    try {
        const { claim } = req.body;
        // Placeholder for claim analysis logic
        res.json({ claim, status: 'Verified', score: 85 });
    } catch (error) {
        res.status(500).json({ error: 'Error analyzing claim' });
    }
};