'use strict';

const playBtn = document.querySelector('.game-info__play-btn');
const gameField = document.querySelector('.game-field');
const gamePopup = document.querySelector('.game-popup');
const redoBtn = document.querySelector('.game-popup__redo-btn');
const resultText = document.querySelector('.game-popup__result-text');

// game assets
const audioBg = new Audio('sound/bg.mp3');
const audioAlert = new Audio('sound/alert.wav');
const audioWin = new Audio('sound/game_win.mp3');

// game configs
const configPlayTime = 10;
const configCarrotNum = 10;
const configBugNum = 7;

// game status
let playing = 0;
let carrotLeft = 0;
let gameId = 0;
let timeLeft = 0;

const createCarrotElement = (x, y) => {
  const carrot = document.createElement('img');
  carrot.classList.add('game-field__carrot');
  carrot.src = 'img/carrot.png';
  carrot.style.left = `${x}px`;
  carrot.style.top = `${y}px`;

  carrot.addEventListener('click', () => {
    if (!playing) {
      return;
    }
    const audioCarrotPull = new Audio('sound/carrot_pull.mp3');
    audioCarrotPull.currentTime = 0;
    audioCarrotPull.play();
    gameField.removeChild(carrot);

    carrotLeft--;
    const carrotsIndicator = document.querySelector('.game-info__carrots-left');
    carrotsIndicator.innerText = carrotLeft;

    if (carrotLeft === 0) {
      gameWon();
    }
  });

  return carrot;
};

const createBugElement = (x, y) => {
  const bug = document.createElement('img');
  bug.classList.add('game-field__bug');
  bug.src = 'img/bug.png';
  bug.style.left = `${x}px`;
  bug.style.top = `${y}px`;

  bug.addEventListener('click', () => {
    if (!playing) {
      return;
    }
    const audioBugPull = new Audio('sound/bug_pull.mp3');
    audioBugPull.currentTime = 0;
    audioBugPull.play();
    gameLost();
  });

  return bug;
};

const setupGame = () => {
  // clear game field
  const gameItems = document.querySelectorAll(
    '.game-field__carrot,.game-field__bug'
  );
  gameItems.forEach((gameItem) => gameField.removeChild(gameItem));

  const gameFieldRect = gameField.getBoundingClientRect();

  for (let i = 0; i < configCarrotNum; i++) {
    const carrot = createCarrotElement(
      Math.random() * (gameFieldRect.width - 80),
      Math.random() * (gameFieldRect.height - 80)
    );
    gameField.appendChild(carrot);
  }

  carrotLeft = configCarrotNum;
  const carrotsIndicator = document.querySelector('.game-info__carrots-left');
  carrotsIndicator.innerText = carrotLeft;

  for (let i = 0; i < configBugNum; i++) {
    const bug = createBugElement(
      Math.random() * (gameFieldRect.width - 50),
      Math.random() * (gameFieldRect.height - 50)
    );
    gameField.appendChild(bug);
  }
};

const gameWon = () => {
  resultText.innerText = 'YOU WON 🎉';
  audioWin.currentTime = 0;
  audioWin.play();
  endGame();
};

const gameLost = () => {
  resultText.innerText = 'YOU LOST 😭';
  audioAlert.currentTime = 0;
  audioAlert.play();
  endGame();
};

const stopGame = () => {
  resultText.innerText = 'RESTART';
  audioAlert.currentTime = 0;
  audioAlert.play();
  endGame();
};

const startGame = () => {
  gamePopup.style.visibility = 'hidden';
  playBtn.style.visibility = 'visible';
  playBtn.innerHTML = '<i class="fas fa-stop"></i>';
  audioBg.currentTime = 0;
  audioBg.play();
  setupGame();
  playing = 1;

  timeLeft = configPlayTime;
  const timeIndicator = document.querySelector('.game-info__timer');
  timeIndicator.innerText = new Date(timeLeft * 1000)
    .toString()
    .substring(19, 24);

  gameId = setInterval(() => {
    timeLeft--;
    const timeIndicator = document.querySelector('.game-info__timer');
    timeIndicator.innerText = new Date(timeLeft * 1000)
      .toString()
      .substring(19, 24);
    if (timeLeft < 1) {
      gameLost();
    }
  }, 1000);
};

const endGame = () => {
  gamePopup.style.visibility = 'visible';
  playBtn.style.visibility = 'hidden';
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audioBg.pause();

  if (gameId) {
    clearInterval(gameId);
    gameId = 0;
  }

  playing = 0;
};

playBtn.addEventListener('click', () => {
  switch (playing) {
    case 0:
      startGame();
      break;
    case 1:
      stopGame();
      break;
  }
});

redoBtn.addEventListener('click', () => {
  startGame();
});
