import axios from 'axios';

const fetchTweets = async (twitterHandle) => {
    try {
        // Remove '@' if present
        const sanitizedHandle = twitterHandle.startsWith('@') ? twitterHandle.slice(1) : twitterHandle;

        // Fetch user information with public_metrics
        const userResponse = await axios.get(`https://api.twitter.com/2/users/by/username/${sanitizedHandle}?user.fields=public_metrics`, {
            headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
        });

        const user = userResponse.data.data;
        if (!user) {
            throw new Error('User not found');
        }

        // Fetch tweets by user ID
        const tweetsResponse = await axios.get(`https://api.twitter.com/2/users/${user.id}/tweets`, {
            headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
        });

        return { tweets: tweetsResponse.data.data || [], followerCount: user.public_metrics.followers_count };
    } catch (error) {
        console.error('Error fetching tweets:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch tweets');
    }
};

export default fetchTweets;
