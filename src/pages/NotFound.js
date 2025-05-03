import { Link } from 'react-router-dom';
import '../styles/NotFound.scss';

const NotFound = () => {
  document.title = "Page Not Found | Hogwarts Encyclopedia";

  return (
    <div className="not-found-page">
      <div className="background-overlay"></div>
      <div className="content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>It seems you've wandered into the Room of Requirement...</p>
        <Link to="/" className="button">
          Return to Hogwarts →
        </Link>
      </div>
    </div>
  );
};

export default NotFound;