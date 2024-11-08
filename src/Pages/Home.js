import React, { memo } from 'react';
import './pages.css';
const HomePage = () => {
  return (
    <div className="Page-Container">
      <h2 style={{ textAlign: 'center',textShadow:'3px 0px 3px plum' }}>This is Home Page</h2>
    </div>
  );
};

export default memo(HomePage);
