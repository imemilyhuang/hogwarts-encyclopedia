import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Characters from './pages/Characters.js';
import Potions from './pages/Potions.js';
import Spells from './pages/Spells.js';
import NotFound from './pages/NotFound.js';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/potions" element={<Potions />} />
          <Route path="/spells" element={<Spells />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
