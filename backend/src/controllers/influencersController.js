import Influencer from '../models/influencerModel.js';
import Claim from '../models/claimModel.js';
import fetchTweets from '../utils/fetchTweets.js';
import analyzeTweets from '../utils/analyzeTweets.js';

export const addInfluencer = async (req, res) => {
    const { name, twitterHandle } = req.body;
    if (!name || !twitterHandle) {
        return res.status(400).json({ error: 'Name and Twitter handle are required' });
    }

    try {
        const { tweets, followerCount } = await fetchTweets(twitterHandle);
        const claimsData = analyzeTweets(tweets);

        const influencer = new Influencer({ name, twitterHandle, followerCount });
        await influencer.save();

        const claims = await Claim.insertMany(
            claimsData.map((claim) => ({ ...claim, influencer: influencer._id }))
        );

        influencer.claims = claims.map((claim) => claim._id);
        await influencer.save();

        res.status(201).json(influencer);
    } catch (error) {
        console.error('Error adding influencer:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error adding influencer' });
    }
};

export const getAllInfluencers = async (req, res) => {
    try {
        const influencers = await Influencer.find().populate('claims');
        res.json(influencers);
    } catch (error) {
        console.error('Error fetching influencers:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching influencers' });
    }
};



export const getInfluencerById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the influencer by ID and populate the 'claims' field
        const influencer = await Influencer.findById(id).populate('claims');

        if (!influencer) {
            return res.status(404).json({ error: 'Influencer not found' });
        }

        res.json(influencer);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching influencer details' });
    }
};

