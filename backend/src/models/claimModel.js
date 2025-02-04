import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
    content: { type: String, required: true },
    status: { type: String, enum: ['Verified', 'Questionable', 'Debunked'], default: 'Questionable' },
    score: { type: Number, min: 0, max: 100, default: 50 },
    sources: { type: [String], default: [] },
    analyzedAt: { type: Date, default: Date.now },
    influencer: { type: mongoose.Schema.Types.ObjectId, ref: 'Influencer', required: true }
});

const Claim = mongoose.model('Claim', claimSchema);

export default Claim;
