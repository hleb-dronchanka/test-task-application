import React from 'react';

import './Preloader.scss';


function Preloader() {
  return (
    <div className="preloader-wrap">
      <div>
        <div className="spinner"></div>
      </div>
      <p>Loading data...</p>
    </div>
  );
}

export default Preloader;