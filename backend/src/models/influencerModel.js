import mongoose from 'mongoose';

const influencerSchema = new mongoose.Schema({
    name: String,
    twitterHandle: String,
    followerCount: Number,
    claims: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Claim' }],
});

const Influencer = mongoose.model('Influencer', influencerSchema);

export default Influencer;
