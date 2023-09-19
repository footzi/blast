import { TileController } from './TileController';
import { Application, Assets } from 'pixi.js';
import FontFaceObserver from 'fontfaceobserver';
import { BACKGROUND_COLOR } from './constants';
import { UI } from './UI';
import { Field } from './Field';

export class Game {
  constructor(options) {
    this.gameOptions = options;

    this.app = new Application({ background: BACKGROUND_COLOR, resizeTo: window });
    document.body.appendChild(this.app.view);
    globalThis.__PIXI_APP__ = this.app;

    this.field = new Field(this.app.stage);

    this.tileController = new TileController(
      this.field.getContainer(),
      {
        onStep: this.handleS.bind(this),
      },
      this.gameOptions
    );
    this.ui = new UI(this.app.stage);
  }

  async init() {
    // @todo загрузка ассетов отдельно
    await Assets.init({ manifest: './assets/manifest.json' });
    await new FontFaceObserver('ShantellSans', {}).load();

    this.field.paint();
    this.ui.paint();

    this.tileController.generateTiles();

    this.ui.onMixBonusClick(this.mixTiles.bind(this));
    this.ui.onBombaBonusClick(this.busterBombaActivate.bind(this));
    this.ui.onClickFailedRetryGame(this.restart.bind(this));
    this.ui.onClickWinRetryGame(this.restart.bind(this));

    this.setDefaultGameValues();
  }

  restart() {
    this.setDefaultGameValues();

    this.ui.hideGameFailed();
    this.ui.hideGameWin();
    this.tileController.regenerate();
  }

  setDefaultGameValues() {
    this.mixBonusCount = this.gameOptions.maxMixBonusCount;
    this.busterBombaBonusCount = this.gameOptions.maxBusterBombaBonusCount;
    this.score = 0;
    this.stepsCount = this.gameOptions.maxSteps;
    this.progress = 0;

    this.ui.updateScore(this.score);
    this.ui.updateSteps(this.stepsCount);
    this.ui.updateMixCount(this.mixBonusCount);
    this.ui.updateBusterBombaCount(this.busterBombaBonusCount);
    this.ui.updateProgress(this.progress);
  }

  mixTiles() {
    this.mixBonusCount--;

    if (this.mixBonusCount >= 0) {
      this.ui.updateMixCount(this.mixBonusCount);
      this.tileController.mixTiles();
    }
  }

  busterBombaActivate() {
    this.busterBombaBonusCount--;

    if (this.busterBombaBonusCount >= 0) {
      this.tileController.setIsBusterBombaActive();
      this.ui.updateBusterBombaCount(this.busterBombaBonusCount);
    }
  }

  handleS(burnedCount) {
    this.score = this.score + burnedCount;
    this.stepsCount = --this.stepsCount;

    this.progress = Number((this.score / this.gameOptions.targetScope).toFixed(2));

    if (this.progress <= 1) {
      this.ui.updateProgress(this.progress);
    }

    this.ui.updateScore(this.score);
    this.ui.updateSteps(this.stepsCount);

    if (this.stepsCount === 0) {
      this.ui.showGameFailed();
    }

    if (this.score >= this.gameOptions.targetScope) {
      this.ui.showGameWin();
    }
  }
}
