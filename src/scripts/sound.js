'use strict';

const audioBg = new Audio('sound/bg.mp3');
const audioAlert = new Audio('sound/alert.wav');
const audioWin = new Audio('sound/game_win.mp3');
const audioBugPull = new Audio('sound/bug_pull.mp3');
const audioCarrotPull = new Audio('sound/carrot_pull.mp3');

export function playCarrotPull() {
  playSound(audioCarrotPull);
}

export function playBugPull() {
  playSound(audioBugPull);
}

export function playWin() {
  playSound(audioWin);
}

export function playAlert() {
  playSound(audioAlert);
}

export function playBGM() {
  playSound(audioBg);
}

export function stopBGM() {
  stopSound(audioBg);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
