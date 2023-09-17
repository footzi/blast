import { TileController } from './TileController';
import { Application, Assets, settings, SCALE_MODES } from 'pixi.js';
import { BACKGROUND_COLOR, MAX_STEPS, TARGET_SCOPE } from './constants';
import { UI } from './UI';

settings.ROUND_PIXELS = true;
settings.SCALE_MODE = SCALE_MODES.NEAREST;

export class Game {
  constructor() {
    this.app = new Application({ background: BACKGROUND_COLOR, resizeTo: window });
    document.body.appendChild(this.app.view);
    globalThis.__PIXI_APP__ = this.app;

    this.tileController = new TileController(this.app.stage, {
      onStep: this.handleS.bind(this),
    });
    this.ui = new UI(this.app.stage);

    this.score = 0;
    this.stepsCount = MAX_STEPS;
    this.progress = 0;
  }

  async init() {
    await Assets.init({ manifest: './assets/manifest.json' });

    this.ui.paint();
    this.ui.updateStep(this.stepsCount);

    this.ui.onMixingButtonClick(() => {
      this.tileController.mixTiles();
    });

    this.ui.onBusterBombaClick(() => {
      this.tileController.setIsBusterBombaActive();
    });

    this.ui.onRestartButtonClick(() => {
      this.restart();
    });

    this.tileController.generateTiles();
  }

  restart() {
    this.score = 0;
    this.stepsCount = MAX_STEPS;

    this.ui.updateScore(this.score);
    this.ui.updateStep(this.stepsCount);
    this.tileController.regenerate();
  }

  handleS(burnedCount) {
    this.score = this.score + burnedCount;
    this.stepsCount = --this.stepsCount;

    this.progress = Math.round((this.score / TARGET_SCOPE) * 100);

    this.ui.updateScore(this.score);
    this.ui.updateStep(this.stepsCount);
    this.ui.updateProgress(this.progress);

    if (this.stepsCount === 0) {
      this.ui.showGameFailed();
    }

    if (this.score >= TARGET_SCOPE) {
      this.ui.showGameWin();
    }
  }
}
