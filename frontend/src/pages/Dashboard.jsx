import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [influencers, setInfluencers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/claims")
            .then((response) => setInfluencers(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Influencer Leaderboard</Typography>
            <Grid container spacing={2}>
                {influencers.map((influencer) => (
                    <Grid item xs={12} sm={6} md={4} key={influencer.id}>
                        <Card component={Link} to={`/influencer/${influencer.id}`} sx={{ textDecoration: "none" }}>
                            <CardContent>
                                <Typography variant="h6">{influencer.name}</Typography>
                                <Typography color="text.secondary">Verified Claims: {influencer.verifiedClaims}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;