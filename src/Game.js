import { TileController } from './TileController';
import { Application, Assets } from 'pixi.js';
import FontFaceObserver from 'fontfaceobserver';
import { BACKGROUND_COLOR, MAX_STEPS, TARGET_SCOPE } from './constants';
import { UI } from './UI';
import { Field } from './Field';

export class Game {
  constructor() {
    this.app = new Application({ background: BACKGROUND_COLOR, resizeTo: window });
    document.body.appendChild(this.app.view);
    globalThis.__PIXI_APP__ = this.app;

    this.field = new Field(this.app.stage);

    this.tileController = new TileController(this.field.getContainer(), {
      onStep: this.handleS.bind(this),
    });
    this.ui = new UI(this.app.stage);

    this.score = 0;
    this.stepsCount = MAX_STEPS;
    this.progress = 0;
  }

  async init() {
    // @todo загрузка ассетов отдельно
    await Assets.init({ manifest: './assets/manifest.json' });

    await new FontFaceObserver('ShantellSans', {}).load();

    this.field.paint();
    this.ui.paint();
    // this.ui.updateStep(this.stepsCount);
    this.tileController.generateTiles();

    // this.ui.onMixingButtonClick(() => {
    //   this.tileController.mixTiles();
    // });
    //
    // this.ui.onBusterBombaClick(() => {
    //   this.tileController.setIsBusterBombaActive();
    // });
    //
    // this.ui.onRestartButtonClick(() => {
    //   this.restart();
    // });
  }

  restart() {
    this.score = 0;
    this.stepsCount = MAX_STEPS;

    // this.ui.updateScore(this.score);
    // this.ui.updateStep(this.stepsCount);
    this.tileController.regenerate();
  }

  handleS(burnedCount) {
    this.score = this.score + burnedCount;
    this.stepsCount = --this.stepsCount;

    this.progress = Number((this.score / TARGET_SCOPE).toFixed(2));

    if (this.progress <= 1) {
      this.ui.updateProgress(this.progress);
    }
    // this.ui.updateScore(this.score);
    // this.ui.updateStep(this.stepsCount);

    if (this.stepsCount === 0) {
      // this.ui.showGameFailed();
    }

    if (this.score >= TARGET_SCOPE) {
      // this.ui.showGameWin();
    }
  }
}
