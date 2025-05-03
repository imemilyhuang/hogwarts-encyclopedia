import React, { useState } from 'react';
import '../styles/Card.scss';

const BaseCard = ({ 
  themeClass = '', 
  frontContent, 
  backContent 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`card ${themeClass} ${isFlipped ? 'flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="card-inner">
        {/* front side */}
        <div className="card-front">
          <div className="card-content">
            {frontContent}
          </div>
        </div>

        {/* back side */}
        <div className="card-back">
          <div className="card-content">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseCard;