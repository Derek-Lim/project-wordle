import React from 'react';

import RestartButton from '../RestartButton';

function Banner({ status, restartGame, children }) {
  return (
    <div className={`${status} banner`}>
      {children}
      <RestartButton restartGame={restartGame} />
    </div>
  );
}

export default Banner;
