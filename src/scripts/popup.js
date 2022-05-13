'use strict';

export default class GamePopup {
  constructor() {
    this.gamePopup = document.querySelector('.game-popup');
    this.redoBtn = document.querySelector('.game-popup__redo-btn');
    this.resultText = document.querySelector('.game-popup__result-text');
    this.redoBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.resultText.innerText = text;
    this.gamePopup.style.visibility = 'visible';
  }

  hide() {
    this.gamePopup.style.visibility = 'hidden';
  }
}
