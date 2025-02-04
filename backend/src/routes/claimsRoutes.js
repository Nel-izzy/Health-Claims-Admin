import express from 'express';
import { analyzeClaim, getAllClaims } from '../controllers/claimsController.js';

const router = express.Router();

router.post('/analyze', analyzeClaim);
router.get('/', getAllClaims);

export default router;
