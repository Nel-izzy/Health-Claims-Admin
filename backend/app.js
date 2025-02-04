import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import claimsRoutes from './src/routes/claimsRoutes.js';
import searchRoutes from './src/routes/searchRoutes.js';
import influencerRoutes from './src/routes/influencerRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {

}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// Routes
app.use('/api/claims', claimsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/influencers', influencerRoutes)

// Health Check Route
app.get('/api/health', (_, res) => {
    res.json({ message: 'Server is running' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app }
