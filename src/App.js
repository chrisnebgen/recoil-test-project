import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { animeTitles } from './store';
import Homepage from './pages/home';
import Animepage from './pages/anime';

const App = () => {
  const setTitles = useSetRecoilState( animeTitles );

  const fetchAnime = async () => {
    try {
      const res = await axios.get(
        'https://animechan.vercel.app/api/available/anime'
      );
      setTitles(res?.data);
    } catch ( error ) {
      console.log(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={ <Homepage /> } />
        <Route exact path="/anime/:name" element={ <Animepage /> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;