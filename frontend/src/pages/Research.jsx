import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, List, ListItem, ListItemText } from "@mui/material";

const Research = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        axios.get(`http://localhost:5000/api/search?query=${query}`)
            .then((response) => setResults(response.data.results))
            .catch((error) => console.error(error));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Research Health Claims</Typography>
            <TextField label="Search" variant="outlined" fullWidth value={query} onChange={(e) => setQuery(e.target.value)} sx={{ marginBottom: 2 }} />
            <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
            <List>
                {results.map((result, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={result.title} secondary={<a href={result.link} target="_blank" rel="noopener noreferrer">{result.link}</a>} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Research;
