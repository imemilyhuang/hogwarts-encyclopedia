import React, { useEffect, useState } from 'react';
import PotionCard from '../components/PotionCard';
import { fetchPotions } from '../services/API';
import Loader from '../components/Loader';
import '../styles/index.scss';
import '../styles/Subpage.scss';

const PotionsPage = () => {
  document.title = "Potions | Hogwarts Encyclopedia";

  const [potions, setPotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    difficulty: '',
    effect: '',
    ingredients: ''
  });

  useEffect(() => {
    const getPotions = async () => {
      try {
        setLoading(true);
        const data = await fetchPotions();
        setPotions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPotions();
  }, []);

  const filteredPotions = potions.filter(potion => {
    const matchesSearch = potion.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          potion.attributes.effect?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = !filters.difficulty || potion.attributes.difficulty?.toLowerCase() === filters.difficulty.toLowerCase();
    const matchesEffect = !filters.effect || potion.attributes.effect?.toLowerCase().includes(filters.effect.toLowerCase());
    const matchesIngredients = !filters.ingredients || potion.attributes.ingredients?.toLowerCase().includes(filters.ingredients.toLowerCase());

    return matchesSearch && matchesDifficulty && matchesEffect && matchesIngredients;
  });

  if (loading) return <Loader />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="subpage-container potions-page">
      <div className="background-overlay"></div>
      <div className="content-wrapper">
        <div className="header-content">
          <h1 className="page-title">Potions</h1>
          <p className="page-description">
            Cauldron essentials — explore every potion known to wizardkind and  
            filter by effects, difficulty levels, and ingredients.
          </p>
        </div>

        <div className="search-filter-container">
          {/* search bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search potions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="search-icon">🔍</i>
          </div>

          {/* filters */}
          <div className="filters">
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
            >
              <option value="">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="moderate">Moderate</option>
              <option value="advanced">Advanced</option>
              <option value="master">Master</option>
            </select>

            <input
              type="text"
              className="search-filter"
              placeholder="Filter by effect..."
              value={filters.effect}
              onChange={(e) => setFilters({...filters, effect: e.target.value})}
            />

            <input
              type="text"
              className="search-filter"
              placeholder="Filter by ingredients..."
              value={filters.ingredients}
              onChange={(e) => setFilters({...filters, ingredients: e.target.value})}
            />
          </div>
        </div>

        <div className="cards-container">
          {filteredPotions.length > 0 ? (
            filteredPotions.map(potion => (
              <PotionCard key={potion.id} potion={potion} />
            ))
          ) : (
            <div className="no-results">No potions found matching your criteria</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PotionsPage;