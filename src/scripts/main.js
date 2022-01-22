'use strict';

const playBtn = document.querySelector('.game-info__play-btn');
const audioBg = new Audio('sound/bg.mp3');
const audioAlert = new Audio('sound/alert.wav');

const configPlayTime = 15;
const configCarrotNum = 15;
const configBugNum = 15;

const createCarrotElement = (x, y) => {
  const carrot = document.createElement('img');
  carrot.classList.add('game-field__carrot');
  carrot.src = 'img/carrot.png';
  carrot.style.left = `${x}px`;
  carrot.style.top = `${y}px`;
  return carrot;
};

const createBugElement = (x, y) => {
  const bug = document.createElement('img');
  bug.classList.add('game-field__bug');
  bug.src = 'img/bug.png';
  bug.style.left = `${x}px`;
  bug.style.top = `${y}px`;
  return bug;
};

const setupGame = () => {
  const gameField = document.querySelector('.game-field');
  const gameFieldRect = gameField.getBoundingClientRect();

  for (let i = 0; i < configCarrotNum; i++) {
    const carrot = createCarrotElement(
      Math.random() * (gameFieldRect.width - 80),
      Math.random() * (gameFieldRect.height - 80)
    );
    gameField.appendChild(carrot);
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
