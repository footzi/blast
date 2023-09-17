import { TileController } from './TileController';
import { Application } from 'pixi.js';
import { BACKGROUND_COLOR } from './constants';
import { UI } from './UI';

export class Game {
  constructor() {
    this.app = new Application({ background: BACKGROUND_COLOR, resizeTo: window });
    document.body.appendChild(this.app.view);
    globalThis.__PIXI_APP__ = this.app;

    this.tileController = new TileController(this.app.stage);
    this.ui = new UI(this.app.stage);
  }

  init() {
    this.ui.paint();

    this.ui.onMixingButtonClick(() => {
      this.tileController.mixTiles();
    });

    this.ui.onBusterBombaClick(() => {
      this.tileController.setIsBusterBombaActive();
    });

    this.tileController.generateTiles();
    this.tileController.paintTiles();
  }
}
