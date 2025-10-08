import  { useEffect, useState } from 'react';
import axios from 'axios';

const JokeFetcher = () => {
  const [joke, setJoke] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await axios.get('https://api.chucknorris.io/jokes/random');
        setJoke(response.data.value);
      } catch {
        setError('Failed to fetch joke');
      }
    };
    fetchJoke();
  }, []);

  if (error) return <h1>{error}</h1>;
  return <h1 style={{fontSize:"20px"}}>{joke || 'Loading...'}</h1>;
};

export default JokeFetcher;
