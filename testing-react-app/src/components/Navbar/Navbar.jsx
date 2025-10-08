import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li>
          <Link to="/" className="navLink">Home</Link>
        </li>
        <li>
          <Link to="/Counter" className="navLink">Counter</Link>
        </li>
        <li>
          <Link to="/Heroes" className="navLink">Heroes</Link>
        </li>
        <li>
          <Link to="/Joke" className="navLink">Joke</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;