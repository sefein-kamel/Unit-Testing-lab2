import "./App.css";
import Counter from "./components/Counter/Counter";
import Heroes from "./components/Heroes/Heroes";
import JokeFetcher from "./components/Joke/Joke";
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Counter" element={<Counter />} />
        <Route path="/Heroes" element={<Heroes  />} />
        <Route path="/Joke" element={<JokeFetcher   />} />
      </Routes>
    </Router>
  );
}

export default App;
