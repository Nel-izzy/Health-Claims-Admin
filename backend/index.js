import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import claimsRoutes from './routes/claimsRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/claims', claimsRoutes);
app.use('/api/google-search', searchRoutes);

// Health Check Route
app.get('/api/health', (_, res) => {
    res.json({ message: 'Server is running' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
