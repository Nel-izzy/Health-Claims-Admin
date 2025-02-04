import express from 'express';
import { addInfluencer, getAllInfluencers, getInfluencerById } from '../controllers/influencersController.js';

const router = express.Router();

router.post('/', addInfluencer);
router.get('/', getAllInfluencers);
router.get("/:id", getInfluencerById)

export default router;
