import React from 'react';
import BaseCard from './BaseCard';
import '../styles/Card.scss';

const SpellCard = ({ spell }) => {
  if (!spell?.attributes) return null;

  const formatSpellName = (name) => {
    return name.replace(/\//g, '/\u200B'); // insert zero-width space after slashes
  };

  return (
    <BaseCard
      name={spell.attributes.name}
      themeClass="spell-theme"
      detailsPath={`/spells/${spell.id}`}
      frontContent={
        <div>
          <h3 className="card-name">{formatSpellName(spell.attributes.name)}</h3>
          <p className="card-type">{spell.attributes.category}</p>
        </div>
      }
      backContent={
        <div className='card-gap-content'>
          {spell.attributes.incantation && (
            <p className="card-detail">
              Incantation: "{spell.attributes.incantation}"
            </p>
          )}
          {spell.attributes.light && (
            <p className="card-detail">
              Light: {spell.attributes.light}
            </p>
          )}
          {spell.attributes.effect && (
            <p className="card-detail">
              Effect: {spell.attributes.effect}
            </p>
          )}
        </div>
      }
    />
  );
};

export default SpellCard;