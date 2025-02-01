import { useEffect, useState } from 'react';
import { Button, Container, Typography, TextField } from '@mui/material';

const App = () => {
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const handleSearch = () => {
    fetch(`http://localhost:5000/api/perplexity?q=${query}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      <Typography variant="h4">Health Claims Admin</Typography>
      <Typography>{message}</Typography>
      <TextField label="Search Perplexity" value={query} onChange={(e) => setQuery(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Fetch Data
      </Button>
      {searchResults && <pre>{JSON.stringify(searchResults, null, 2)}</pre>}
    </Container>
  );
};

export default App;
