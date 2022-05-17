'use strict';

import * as sound from './sound.js';

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug',
});
export default class GameField {
  static CARROT_SIZE = 80;

  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameField = document.querySelector('.game-field');
    this.gameFieldRect = this.gameField.getBoundingClientRect();
    this.gameField.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  setup() {
    this.gameField.innerText = '';
    this.#addItem('game-field__carrot', this.carrotCount, 'img/carrot.png');
    this.#addItem('game-field__bug', this.bugCount, 'img/bug.png');
  }

  #addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.gameFieldRect.width - GameField.CARROT_SIZE;
    const y2 = this.gameFieldRect.height - GameField.CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      const x = this.#randomNumber(x1, x2);
      const y = this.#randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.gameField.appendChild(item);
    }
  }

  #randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches('.game-field__carrot')) {
      target.remove();
      sound.playCarrotPull();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches('.game-field__bug')) {
      sound.playBugPull();
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}
