export const fetchCharacters = async () => {
    try {
      const response = await fetch('https://hp-api.onrender.com/api/characters');
      if (!response.ok) throw new Error('Failed to fetch characters');
      return await response.json();
    } catch (error) {
      console.error('Error fetching characters:', error);
      return [];
    }
  };
  
  export const fetchPotions = async () => {
    try {
      const response = await fetch('https://api.potterdb.com/v1/potions');
      if (!response.ok) throw new Error('Failed to fetch potions');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching potions:', error);
      return [];
    }
  };
  
  export const fetchSpells = async () => {
    try {
      const response = await fetch('https://api.potterdb.com/v1/spells');
      if (!response.ok) throw new Error('Failed to fetch spells');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching spells:', error);
      return [];
    }
  };