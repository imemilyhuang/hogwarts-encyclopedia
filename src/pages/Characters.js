import React, { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import { fetchCharacters } from '../services/API';
import Loader from '../components/Loader';
import '../styles/index.scss';
import '../styles/Subpage.scss';

const CharactersPage = () => {
  document.title = "Characters | Hogwarts Encyclopedia";
  
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    house: '',
    ancestry: '',
    wizard: null,
    student: null
  });

  useEffect(() => {
    const getCharacters = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, []);

  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          character.alternate_names?.some(name => 
                            name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesHouse = !filters.house || character.house?.toLowerCase() === filters.house.toLowerCase();
    const matchesAncestry = !filters.ancestry || character.ancestry?.toLowerCase() === filters.ancestry.toLowerCase();
    const matchesWizard = filters.wizard === null || character.wizard === filters.wizard;
    const matchesStudent = filters.student === null || character.hogwartsStudent === filters.student;

    return matchesSearch && matchesHouse && matchesAncestry && matchesWizard && matchesStudent;
  });

  if (loading) return <Loader />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="subpage-container characters-page">
      <div className="background-overlay"></div>
      <div className="content-wrapper">
        <div className="header-content">
          <h1 className="page-title">Characters</h1>
          <p className="page-description">
            Explore the witches, wizards, and magical beings of the 
            Wizarding World. Discover their houses, lineages, and 
            unique magical abilities.
          </p>
        </div>

        <div className="search-filter-container">
          {/* search bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="search-icon">🔍</i>
          </div>

          {/* filters */}
          <div className="filters">
            <select
              value={filters.house}
              onChange={(e) => setFilters({...filters, house: e.target.value})}
            >
              <option value="">All Houses</option>
              <option value="Gryffindor">Gryffindor</option>
              <option value="Hufflepuff">Hufflepuff</option>
              <option value="Ravenclaw">Ravenclaw</option>
              <option value="Slytherin">Slytherin</option>
            </select>

            <select
              value={filters.ancestry}
              onChange={(e) => setFilters({...filters, ancestry: e.target.value})}
            >
              <option value="">All Ancestries</option>
              <option value="pure-blood">Pure-blood</option>
              <option value="half-blood">Half-blood</option>
              <option value="muggleborn">Muggleborn</option>
              <option value="squib">Squib</option>
            </select>

            <select
              value={filters.wizard === null ? '' : filters.wizard}
              onChange={(e) => setFilters({...filters, wizard: e.target.value === '' ? null : e.target.value === 'true'})}
            >
              <option value="">All Magical Status</option>
              <option value="true">Wizard/Witch</option>
              <option value="false">Non-Wizard</option>
            </select>

            <select
              value={filters.student === null ? '' : filters.student}
              onChange={(e) => setFilters({...filters, student: e.target.value === '' ? null : e.target.value === 'true'})}
            >
              <option value="">All Student Status</option>
              <option value="true">Student</option>
              <option value="false">Staff/Other</option>
            </select>
          </div>
        </div>

        <div className="cards-container">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))
          ) : (
            <div className="no-results">No characters found matching your criteria</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharactersPage;