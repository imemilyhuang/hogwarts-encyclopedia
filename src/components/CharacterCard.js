import React from 'react';
import BaseCard from './BaseCard';
import '../styles/Card.scss';

const CharacterCard = ({ character }) => {
  if (!character) return null;

  const houseClass = character.house ? character.house.toLowerCase() : 'no-house';

  let formattedBirthDate = character.dateOfBirth ? 
    character.dateOfBirth.split('-')[1]+"-"+character.dateOfBirth.split('-')[0]+"-"+character.dateOfBirth.split('-')[2]
    : ""

  // console.log(character)

  return (
    <BaseCard
      name={character.name}
      themeClass={`house-${houseClass}`}
      detailsPath={`/characters/${character.id}`}
      frontContent={
        <div>
          <h3 className="card-name">{character.name}</h3>
          {character.house && (
            <p className="card-house">{character.house}</p>
          )}
        </div>
      }
      backContent={
        <div className='card-gap-content'>
          <p className="card-detail">
            Name: {character.name}
          </p>
          {character.dateOfBirth && (
            <p className="card-detail">
              Born {formattedBirthDate}
            </p>
          )}
          <p className="card-detail">
            Ancestry: {character.ancestry || 'Unknown'}
          </p>
          <p className="card-detail">
            Wizard: {character.wizard ? 'Yes' : 'No'}
          </p>
          <p className="card-detail">
            Status: {character.hogwartsStudent 
              ? 'Student' 
              : character.hogwartsStaff 
                ? 'Staff' 
                : 'Unknown'}
          </p>
          {character.house && (
            <p className="card-detail">
              House: {character.house}
            </p>
          )}
          {character.patronus && (
            <p className="card-detail">
              Patronus: {character.patronus}
            </p>
          )}
          {character.wand.wood && (
            <p className="card-detail">
              Wand: {character.wand.wood} wood, {character.wand.core} core, {character.wand.length}" in length
            </p>
          )}
          {character.actor && (
            <p className="card-detail">
              Played by {character.actor}
            </p>
          )}
        </div>
      }
    />
  );
};

export default CharacterCard;