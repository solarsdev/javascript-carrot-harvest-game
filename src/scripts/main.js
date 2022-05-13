'use strict';

import GamePopup from './popup.js';
import GameField from './field.js';

const playBtn = document.querySelector('.game-info__play-btn');

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
let score = 0;
let gameId = 0;
let timeLeft = 0;

const gameFninishBanner = new GamePopup();
gameFninishBanner.setClickListener(() => {
  startGame();
});

const gameField = new GameField(configCarrotNum, configBugNum);
gameField.setClickListener(onItemClick);
function onItemClick(item) {
  if (!playing) {
    return;
  }

  if (item === 'carrot') {
    score++;
    if (score === configCarrotNum) {
      gameWon();
    }
  } else if (item === 'bug') {
    gameLost();
  }
}

const gameWon = () => {
  gameFninishBanner.showWithText('YOU WON 🎉');
  playSound(audioWin);
  endGame();
};

const gameLost = () => {
  gameFninishBanner.showWithText('YOU LOST 😭');
  playSound(audioAlert);
  endGame();
};

const stopGame = () => {
  gameFninishBanner.showWithText('RESTART');
  playSound(audioAlert);
  endGame();
};

const startGame = () => {
  gameFninishBanner.hide();
  playBtn.style.visibility = 'hidden';
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  audioBg.currentTime = 0;
  audioBg.play();
  gameField.setup();
  playing = 1;
  score = 0;

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

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
