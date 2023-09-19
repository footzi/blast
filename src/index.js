import { Game } from './Game';

const game = new Game({
  columnsCount: 8,
  rowsCount: 9,
  maxSteps: 20,
  targetScope: 100,
  maxMixBonusCount: 5,
  maxBusterBombaBonusCount: 3,
  busterBombaBonusRadius: 2,
});

game.init();
