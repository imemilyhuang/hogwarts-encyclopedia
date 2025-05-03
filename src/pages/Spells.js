import React, { useEffect, useState } from 'react';
import SpellCard from '../components/SpellCard';
import { fetchSpells } from '../services/API';
import Loader from '../components/Loader';
import '../styles/index.scss';
import '../styles/Subpage.scss';

const SpellsPage = () => {
  document.title = "Spells | Hogwarts Encyclopedia";

  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    light: '',
    effect: ''
  });

  useEffect(() => {
    const getSpells = async () => {
      try {
        setLoading(true);
        const data = await fetchSpells();
        setSpells(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSpells();
  }, []);

  const filteredSpells = spells.filter(spell => {
    const matchesSearch = spell.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (spell.attributes.incantation && 
                          spell.attributes.incantation.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !filters.category || spell.attributes.category?.toLowerCase() === filters.category.toLowerCase();
    const matchesLight = !filters.light || spell.attributes.light?.toLowerCase().includes(filters.light.toLowerCase());
    const matchesEffect = !filters.effect || spell.attributes.effect?.toLowerCase().includes(filters.effect.toLowerCase());

    return matchesSearch && matchesCategory && matchesLight && matchesEffect;
  });

  if (loading) return <Loader />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="subpage-container spells-page">
      <div className="background-overlay"></div>
      <div className="content-wrapper">
        <div className="header-content">
          <h1 className="page-title">Spells</h1>
          <p className="page-description">
            For dueling, mischief, or household chores — organize spells 
            by the most popular types (charms, curses, jinxes, hexes), 
            light colors, and effect.
          </p>
        </div>

        <div className="search-filter-container">
          {/* search bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search spells..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="search-icon">🔍</i>
          </div>

          {/* filters */}
          <div className="filters">
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">All Categories</option>
              <option value="Charm">Charms</option>
              <option value="Curse">Curses</option>
              <option value="Jinx">Jinxes</option>
              <option value="Hex">Hexes</option>
              <option value="Spell">General Spells</option>
            </select>

            <select
              value={filters.light}
              onChange={(e) => setFilters({...filters, light: e.target.value})}
            >
              <option value="">All Light Colors</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
              <option value="Green">Green</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Purple">Purple</option>
            </select>

            <input
              type="text"
              className="search-filter"
              placeholder="Filter by effect..."
              value={filters.effect}
              onChange={(e) => setFilters({...filters, effect: e.target.value})}
            />
          </div>
        </div>

        <div className="cards-container">
          {filteredSpells.length > 0 ? (
            filteredSpells.map(spell => (
              <SpellCard key={spell.id} spell={spell} />
            ))
          ) : (
            <div className="no-results">No spells found matching your criteria</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpellsPage;