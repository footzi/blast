import { Application, Assets } from 'pixi.js';
import FontFaceObserver from 'fontfaceobserver';
import { TileController } from './TileController';
import { UI } from './UI';
import { Field } from './Field';

export class Game {
  static BACKGROUND_COLOR = '#d3d3d3';

  constructor(options) {
    this.gameOptions = options;

    this.app = this.createApp();
    this.field = new Field(this.app.stage, this.gameOptions);
    this.tileController = new TileController(
      this.field.getContainer(),
      {
        onStep: this.handleChangeStep.bind(this),
      },
      this.gameOptions
    );
    this.ui = new UI(this.app.stage);
  }

  createApp() {
    const app = new Application({ background: Game.BACKGROUND_COLOR, resizeTo: window });
    document.body.appendChild(app.view);
    globalThis.__PIXI_APP__ = app;

    return app;
  }

  async init() {
    await this.loadAssets();

    this.field.paint();
    this.ui.paint();

    this.tileController.generateTiles();

    this.ui.onMixBonusClick(this.mixTiles.bind(this));
    this.ui.onBombaBonusClick(this.busterBombaActivate.bind(this));
    this.ui.onClickFailedRetryGame(this.restart.bind(this));
    this.ui.onClickWinRetryGame(this.restart.bind(this));

    this.setDefaultGameValues();
  }

  loadAssets() {
    const assets = Assets.init({ manifest: './assets/manifest.json' });
    const font = new FontFaceObserver('ShantellSans', {}).load();

    return Promise.all([assets, font]);
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

    this.tileController.setGameFinished(false);
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

  handleChangeStep(burnedCount) {
    this.updateScore(burnedCount);
    this.updateProgress();

    this.checkGameFailed();
    this.checkGameWin();
  }

  updateScore(burnedCount) {
    this.score = this.score + burnedCount;
    this.stepsCount = --this.stepsCount;

    this.ui.updateScore(this.score);
    this.ui.updateSteps(this.stepsCount);
  }

  updateProgress() {
    const progressValue = Number((this.score / this.gameOptions.targetScope).toFixed(2));
    this.progress = progressValue <= 1 ? progressValue : 1;
    this.ui.updateProgress(this.progress);
  }

  checkGameFailed() {
    if (this.stepsCount === 0 && this.score < this.gameOptions.targetScope) {
      this.ui.showGameFailed();
      this.finishGame();
    }
  }

  checkGameWin() {
    if (this.score >= this.gameOptions.targetScope) {
      this.ui.showGameWin();
      this.finishGame();
    }
  }

  finishGame() {
    this.tileController.setGameFinished(true);
  }
}
