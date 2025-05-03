import { Link } from 'react-router-dom';
import '../styles/index.scss';
import '../styles/Home.scss';

export default function Home() {
  document.title = "Hogwarts Encyclopedia Home";

  return (
    <div className="hero-section">
      <div className="background-overlay"></div>
      <div className="hero-content">
        <h1 className="page-title">Hogwarts Encyclopedia</h1>
        <p className="page-description">Characters, potions, and spells of the Wizarding World.</p>
        <Link to="/characters" className="button">
          Explore Now →
        </Link>
      </div>
    </div>
  );
}