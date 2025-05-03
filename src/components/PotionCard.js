import React from 'react';
import BaseCard from './BaseCard';
import '../styles/Card.scss';

const PotionCard = ({ potion }) => {
  if (!potion?.attributes) return null;
  console.log(potion)

  return (
    <BaseCard
      name={potion.attributes.name}
      themeClass="potion-theme"
      detailsPath={`/potions/${potion.id}`}
      frontContent={
        <div>
          <h3 className="card-name">{potion.attributes.name}</h3>
          <p className="card-type">Potion</p>
        </div>
      }
      backContent={
        <div className='card-gap-content'>
          {potion.attributes.effect && (
            <p className="card-detail">
              Effect: {potion.attributes.effect}
            </p>
          )}
          {potion.attributes.difficulty && (
            <p className="card-detail">
              Difficulty: {potion.attributes.difficulty}
            </p>
          )}
          {potion.attributes.time && (
            <p className="card-detail">
              Time: {potion.attributes.time}
            </p>
          )}
          {potion.attributes.characteristics && (
            <p className="card-detail">
              Characteristics: {potion.attributes.characteristics}
            </p>
          )}
          {potion.attributes.ingredients && (
            <p className="card-detail">
              Ingredients: {potion.attributes.ingredients}
            </p>
          )}
          {potion.attributes.side_effects && (
            <p className="card-detail">
              Side Effects: {potion.attributes.side_effects}
            </p>
          )}
        </div>
      }
    />
  );
};

export default PotionCard;