import React from 'react';

function KeyRow({ rowAlphabetStatus }) {
  return (
    <div className="key-row">
      {rowAlphabetStatus.map(({ letter, status }) => (
        <button
          key={letter}
          className={status ? `key ${status}` : 'key'}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

function Keyboard({ alphabetStatus }) {
  const topRowAlphabetStatus = alphabetStatus.slice(0, 10);
  const homeRowAlphabetStatus = alphabetStatus.slice(10, 19);
  const bottomRowAlphabetStatus = alphabetStatus.slice(19);

  return (
    <div className="keyboard">
      <KeyRow rowAlphabetStatus={topRowAlphabetStatus} />
      <KeyRow rowAlphabetStatus={homeRowAlphabetStatus} />
      <KeyRow rowAlphabetStatus={bottomRowAlphabetStatus} />
    </div>
  );
}

export default Keyboard;
