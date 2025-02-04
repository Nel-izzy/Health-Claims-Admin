import { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [influencers, setInfluencers] = useState([]);

    useEffect(() => {
        const fetchInfluencers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/influencers');
                setInfluencers(response.data);
            } catch (error) {
                console.error('Error fetching influencers:', error);
            }
        };

        fetchInfluencers();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Influencer Leaderboard
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Trust Score</TableCell>
                            <TableCell>Follower Count</TableCell>
                            <TableCell>Claim Stats</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {influencers.map((influencer) => (
                            <TableRow key={influencer.id} component={Link} to={`/influencer/${influencer._id}`} sx={{ textDecoration: "none" }}>
                                <TableCell>{influencer.name}</TableCell>
                                <TableCell>{influencer.trustScore}</TableCell>
                                <TableCell>{influencer.followers}</TableCell>
                                <TableCell>{influencer.claimStats}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Dashboard;
