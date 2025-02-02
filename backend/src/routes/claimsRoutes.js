import express from 'express';
import { analyzeClaim } from '../controllers/claimsController.js';

const router = express.Router();

router.post('/analyze', analyzeClaim);

export default router;