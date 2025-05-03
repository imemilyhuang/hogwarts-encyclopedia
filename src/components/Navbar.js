import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Navbar.scss';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    if (windowDimensions.width > 768 && isMenuOpen) {
      setIsMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowDimensions]);

  // disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isMenuOpen]);

  if (isHomePage) return null;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* site logo in top left */}
          <Link to="/" className="logo-link">
            <img 
              src={process.env.PUBLIC_URL + "/assets/hogwarts-logo.png" }
              alt="Hogwarts Logo" 
              className="logo"
            />
          </Link>
          
          {/* desktop menu in top right */}
          <div className="nav-links">
            <Link to="/characters" className="nav-link">
              <span className="emoji">🧙</span> Characters
            </Link>
            <Link to="/potions" className="nav-link">
              <span className="emoji">🧪</span> Potions
            </Link>
            <Link to="/spells" className="nav-link">
              <span className="emoji">✨</span> Spells
            </Link>
          </div>

          {/* hamburger menu button in top right */}
          <button
            className={`hamburger ${isMenuOpen ? 'is-active' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {/* mobile menu overlay */}
          {isMenuOpen && (
            <div className="mobile-menu-overlay">
              <div className="mobile-menu-content">
                <Link to="/characters" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  <span className="emoji">🧙</span> Characters
                </Link>
                <Link to="/potions" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  <span className="emoji">🧪</span> Potions
                </Link>
                <Link to="/spells" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  <span className="emoji">✨</span> Spells
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;