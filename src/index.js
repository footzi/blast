import { Game } from './Game';

const game = new Game({
  columnsCount: 9,
  rowsCount: 8,
  maxSteps: 20,
  targetScope: 100,
  maxMixBonusCount: 5,
  maxBusterBombaBonusCount: 3,
  busterBombaBonusRadius: 2,
});

game.init();
