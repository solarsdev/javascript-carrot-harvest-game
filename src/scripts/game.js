'use strict';

import GamePopup from './popup.js';
import GameField from './field.js';
import * as sound from './sound.js';

export default class Game {
  constructor(playTime, carrotCount, bugCount) {
    this.playBtn = document.querySelector('.game-info__play-btn');
    this.playBtn.addEventListener('click', () => {
      switch (this.playing) {
        case 0:
          this.startGame();
          break;
        case 1:
          this.stopGame();
          break;
      }
    });
    this.#initConfig(playTime);
    this.#initGamePopUp();
    this.#initGameField(carrotCount, bugCount);
  }

  #initConfig = (playTime) => {
    this.playTime = playTime;
    this.playing = 0;
    this.score = 0;
    this.gameId = 0;
    this.timeLeft = 0;
  };

  #initGamePopUp = () => {
    this.gameFinishBanner = new GamePopup();
    this.gameFinishBanner.setClickListener(() => {
      this.startGame();
    });
  };

  #initGameField = (carrotCount, bugCount) => {
    this.carrotCount = carrotCount;
    this.gameField = new GameField(carrotCount, bugCount);
    this.gameField.setClickListener((item) => {
      if (!this.playing) {
        return;
      }
      if (item === 'carrot') {
        this.score++;
        if (this.score === this.carrotCount) {
          this.gameWon();
        }
      } else if (item === 'bug') {
        this.gameLost();
      }
    });
  };

  startGame = () => {
    this.gameFinishBanner.hide();
    this.playBtn.style.visibility = 'hidden';
    this.gameField.setup();
    this.score = 0;
    this.timeLeft = this.playTime;
    this.timeIndicator = document.querySelector('.game-info__timer');
    this.timeIndicator.innerText = new Date(this.timeLeft * 1000)
      .toString()
      .substring(19, 24);
    this.gameId = setInterval(() => {
      this.timeLeft--;
      this.timeIndicator.innerText = new Date(this.timeLeft * 1000)
        .toString()
        .substring(19, 24);
      if (this.timeLeft < 1) {
        this.gameLost();
      }
    }, 1000);
    sound.playBGM();
    this.playing = 1;
  };

  endGame = () => {
    if (this.gameId) {
      clearInterval(this.gameId);
      this.gameId = 0;
    }
    sound.stopBGM();
    this.playing = 0;
  };

  gameWon = () => {
    this.gameFinishBanner.showWithText('YOU WON 🎉');
    sound.playWin();
    this.endGame();
  };

  gameLost = () => {
    this.gameFinishBanner.showWithText('YOU LOST 😭');
    sound.playAlert();
    this.endGame();
  };

  stopGame = () => {
    this.gameFinishBanner.showWithText('RESTART');
    sound.playAlert();
    this.endGame();
  };
}
