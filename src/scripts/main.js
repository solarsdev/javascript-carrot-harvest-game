'use strict';

const playBtn = document.querySelector('.game-info__play-btn');
const gameField = document.querySelector('.game-field');
const audioBg = new Audio('sound/bg.mp3');
const audioAlert = new Audio('sound/alert.wav');
const audioWin = new Audio('sound/game_win.mp3');

const configPlayTime = 10;
const configCarrotNum = 10;
const configBugNum = 7;

let carrotLeft = 0;

const createCarrotElement = (x, y) => {
  const carrot = document.createElement('img');
  carrot.classList.add('game-field__carrot');
  carrot.src = 'img/carrot.png';
  carrot.style.left = `${x}px`;
  carrot.style.top = `${y}px`;

  carrot.addEventListener('click', () => {
    const audioCarrotPull = new Audio('sound/carrot_pull.mp3');
    audioCarrotPull.currentTime = 0;
    audioCarrotPull.play();
    gameField.removeChild(carrot);
    carrotLeft--;

    if (carrotLeft === 0) {
      audioBg.pause();
      audioWin.currentTime = 0;
      audioWin.play();
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
    const audioBugPull = new Audio('sound/bug_pull.mp3');
    audioBugPull.currentTime = 0;
    audioBugPull.play();
  });

  return bug;
};

const setupGame = () => {
  const gameFieldRect = gameField.getBoundingClientRect();

  for (let i = 0; i < configCarrotNum; i++) {
    const carrot = createCarrotElement(
      Math.random() * (gameFieldRect.width - 80),
      Math.random() * (gameFieldRect.height - 80)
    );
    gameField.appendChild(carrot);
    carrotLeft++;
  }

  for (let i = 0; i < configBugNum; i++) {
    const bug = createBugElement(
      Math.random() * (gameFieldRect.width - 50),
      Math.random() * (gameFieldRect.height - 50)
    );
    gameField.appendChild(bug);
  }
};

const startGame = (btnElement) => {
  console.log('start game');
  btnElement.innerHTML = '<i class="fas fa-stop"></i>';
  btnElement.dataset.playing = '1';

  audioBg.currentTime = 0;
  audioBg.play();
  setupGame();
};

const gameWon = () => {};

const endGame = (btnElement) => {
  console.log('end game');
  btnElement.innerHTML = '<i class="fas fa-play"></i>';
  btnElement.dataset.playing = '0';

  audioBg.pause();
  audioAlert.play();
};

playBtn.addEventListener('click', (event) => {
  const btnElement = event.currentTarget;
  const playing = btnElement.dataset.playing;
  switch (playing) {
    case '0':
      startGame(btnElement);
      break;
    case '1':
      endGame(btnElement);
      break;
  }
});
