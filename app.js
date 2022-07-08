"use strict";
// Selecting Elements
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// variables
let scores, currentScore, activePlayer, isPlaying;

const initialState = () => {
  // intializing variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  dice.classList.add("hidden");

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

initialState();

// switch to next player function
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    // Genrating random number
    let number = Math.trunc(Math.random() * 6) + 1;
    //Displaying dice
    dice.classList.remove("hidden");
    dice.src = `./img/dice-${number}.png`;

    //   check for number = 1
    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Holding current score functionality

btnHold.addEventListener("click", () => {
  if (isPlaying) {
    // add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player score is >= 100
    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      dice.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// Reseting game

btnNew.addEventListener("click", initialState);
