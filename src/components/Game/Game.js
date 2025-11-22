import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { ALPHABET } from '../../constants';
import { checkGuess } from '../../game-helpers';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import Keyboard from '../Keyboard';
import WonBanner from '../WonBanner';
import LostBanner from '../LostBanner';

function Game() {
  // running | won | lost
  const [gameStatus, setGameStatus] = React.useState('running');

  // Pick a random word on every pageload.
  const [answer, setAnswer] = React.useState(() => selectAnswer());

  const [guesses, setGuesses] = React.useState([]);

  const [alphabetStatus, setAlphabetStatus] = React.useState(() =>
    setInitialAlphabetStatus()
  );

  function selectAnswer() {
    const newWord = sample(WORDS);
    console.info({ newWord }); // for debugging
    return newWord;
  }

  function setInitialAlphabetStatus() {
    return ALPHABET.map((letter) => ({ letter, status: null }));
  }

  function restartGame() {
    setGameStatus('running');
    setAnswer(selectAnswer());
    setGuesses([]);
    setAlphabetStatus(setInitialAlphabetStatus);
  }

  function handleSubmitGuess(tentativeGuess) {
    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);

    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }

    const letterEvaluations = checkGuess(tentativeGuess, answer);
    updateAlphabetStatus(letterEvaluations);
  }

  function updateAlphabetStatus(letterEvaluations) {
    const updatedAlphabet = [...alphabetStatus];

    letterEvaluations.forEach((evaluation) => {
      const alphaIndex = updatedAlphabet.findIndex(
        (entry) => entry.letter === evaluation.letter
      );

      if (updatedAlphabet[alphaIndex].status !== 'correct') {
        updatedAlphabet[alphaIndex].status = evaluation.status;
      }
    });

    setAlphabetStatus(updatedAlphabet);
  }

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput
        gameStatus={gameStatus}
        handleSubmitGuess={handleSubmitGuess}
      />
      <Keyboard alphabetStatus={alphabetStatus} />
      {gameStatus === 'won' && (
        <WonBanner numOfGuesses={guesses.length} restartGame={restartGame} />
      )}
      {gameStatus === 'lost' && (
        <LostBanner answer={answer} restartGame={restartGame} />
      )}
    </>
  );
}

export default Game;
