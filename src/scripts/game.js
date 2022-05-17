'use strict';

import GamePopup from './popup.js';
import GameField from './field.js';
import * as sound from './sound.js';

export default class Game {
  constructor(playDuration, carrotCount, bugCount) {
    this.playDuration = playDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.timerText = document.querySelector('.game-info__timer');
    this.carrotsLeft = document.querySelector('.game-info__carrots-left');
    this.playBtn = document.querySelector('.game-info__play-btn');
    this.playBtn.addEventListener('click', () =>
      this.playing ? this.#stop() : this.#start()
    );

    this.#initConfig();
    this.#initGamePopUp();
    this.#initGameField(carrotCount, bugCount);
  }

  #initConfig = () => {
    this.playing = false;
    this.score = 0;
    this.timer = undefined;
  };

  #initGamePopUp = () => {
    this.gameFinishBanner = new GamePopup();
    this.gameFinishBanner.setClickListener(() => {
      this.#start();
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
        this.#updateScoreText(this.carrotCount - this.score);
        if (this.score === this.carrotCount) {
          this.#won();
        }
      } else if (item === 'bug') {
        this.#lost();
      }
    });
  };

  #updateScoreText = (carrotsLeft) => {
    this.carrotsLeft.innerText = `${carrotsLeft}`;
  };

  #startTimer = () => {
    let remainingTimeSeconds = this.playDuration;
    this.#updateTimerText(remainingTimeSeconds);

    this.timer = setInterval(() => {
      this.#updateTimerText(--remainingTimeSeconds);
      if (remainingTimeSeconds <= 0) {
        this.#lost();
      }
    }, 1000);
  };

  #updateTimerText = (timeleft) => {
    this.timerText.innerText = new Date(timeleft * 1000)
      .toString()
      .substring(19, 24);
  };

  #start = () => {
    this.playing = true;
    this.playBtn.style.visibility = 'hidden';
    this.gameField.setup();
    this.gameFinishBanner.hide();
    this.#startTimer();
    this.score = 0;
    this.#updateScoreText(this.carrotCount - this.score);
    sound.playBGM();
  };

  #stop = () => {
    this.gameFinishBanner.showWithText('RESTART');
    sound.playAlert();
    this.#end();
  };

  #won = () => {
    this.gameFinishBanner.showWithText('YOU WON 🎉');
    sound.playWin();
    this.#end();
  };

  #lost = () => {
    this.gameFinishBanner.showWithText('YOU LOST 😭');
    sound.playAlert();
    this.#end();
  };

  #end = () => {
    this.playing = false;
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    sound.stopBGM();
  };
}
