import React, { memo } from 'react';

const TabButtons = ({ name, onClick, isActive, isPending }) => {
  return (
    <>
      <button onClick={onClick} className={`tab-button ${isActive ? 'active' : ''}`}>
        {name}
        {isPending ? ' 🤔...' : ''}
      </button>
    </>
  );
};

export default memo(TabButtons);
