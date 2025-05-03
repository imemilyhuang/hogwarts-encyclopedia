import React from 'react';
import '../styles/Loader.scss';

const Loader = () => {
  return (
    <div className="loader-page">
      <div className="background-overlay"></div>
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading magical content...</p>
      </div>
    </div>
  );
};

export default Loader;