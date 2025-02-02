import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

const InfluencerDetails = () => {
    const { id } = useParams();
    const [influencer, setInfluencer] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/claims/${id}`)
            .then((response) => setInfluencer(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    return (
        <Container>
            {influencer ? (
                <>
                    <Typography variant="h4">{influencer.name}</Typography>
                    <List>
                        {influencer.claims.map((claim, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={claim.text} secondary={`Status: ${claim.status}`} />
                            </ListItem>
                        ))}
                    </List>
                </>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Container>
    );
};

export default InfluencerDetails;