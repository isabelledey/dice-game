"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
// const current0El = document.querySelector("#current--0");
// const current1El = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const dice = document.querySelector(".dice");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

let currentScore, activePlayer, scores, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  dice.classList.add("hidden");
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

init();

let rolledNumber;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    dice.classList.remove("hidden");
    rolledNumber = Math.trunc(Math.random() * 6) + 1;
    let rolledDice = `dice-${rolledNumber}.png`;
    dice.src = rolledDice;

    if (rolledNumber !== 1) {
      currentScore += rolledNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

const toggleModal = function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] < 100) switchPlayer();
    else {
      playing = false;
      document.querySelector(".modal-text").textContent = `Player ${
        activePlayer + 1
      } is the winner! 🏆`;
      toggleModal();
      dice.classList.add("hidden");
    }
  }
});

[btnCloseModal, overlay].forEach((item) =>
  item.addEventListener("click", toggleModal)
);

btnNew.addEventListener("click", init);
