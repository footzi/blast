import { TileController } from './TileController';
import { Application } from 'pixi.js';
import { BACKGROUND_COLOR } from './constants';

export class Game {
  constructor() {}

  createApp() {
    this.app = new Application({ background: BACKGROUND_COLOR, resizeTo: window });
    document.body.appendChild(this.app);
    globalThis.__PIXI_APP__ = this.app;
  }

  init() {
    this.createApp();
    this.tileController = new TileController(this.app);

    this.tileController.generateTiles();
    this.tileController.paintTiles();
  }
}
