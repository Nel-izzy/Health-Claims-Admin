// seedInfluencers.js
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://nelsoninho11:aghRbHtr7uPE2sGP@cluster0.3c5it.mongodb.net/health-claims?retryWrites=true&w=majority&appName=Cluster0";

const influencers = [
    {
        handle: '@health_expert',
        name: 'Dr. Jane Doe',
        platform: 'Twitter',
        followers: 150000,
        expertise: 'Nutrition',
    },
    {
        handle: '@fitness_guru',
        name: 'John Smith',
        platform: 'Twitter',
        followerCount: 200000,
        expertise: 'Fitness',
    },

];

const seedInfluencers = async () => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('health-claims'); // Replace with your database name
        const collection = database.collection('influencers');
        const result = await collection.insertMany(influencers);
        console.log(`${result.insertedCount} influencers inserted.`);
    } catch (error) {
        console.error('Error inserting influencers:', error);
    } finally {
        await client.close();
    }
};

seedInfluencers();
