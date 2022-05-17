'use strict';

import GameBuilder from './game.js';

new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(10)
  .withBugCount(10)
  .build();
