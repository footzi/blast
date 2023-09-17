import { Graphics } from 'pixi.js';

export class UI {
  constructor(block) {
    this.block = block;
    this.mixingButton = null;
    this.busterBomba = null;
  }

  paint() {
    this.paintMixingButton();
    this.paintBusterBombaButton();
  }

  paintMixingButton() {
    this.mixingButton = new Graphics();
    this.mixingButton.eventMode = 'static';

    this.mixingButton.beginFill('red');
    this.mixingButton.drawRect(0, 0, 80, 20);

    this.mixingButton.position.x = 500;
    this.mixingButton.position.y = 100;

    this.block.addChild(this.mixingButton);
  }

  onMixingButtonClick(callback) {
    this.mixingButton.on('pointerdown', () => callback(this));
  }

  paintBusterBombaButton() {
    this.busterBomba = new Graphics();
    this.busterBomba.eventMode = 'static';

    this.busterBomba.beginFill('black');
    this.busterBomba.drawRect(0, 0, 80, 20);

    this.busterBomba.position.x = 500;
    this.busterBomba.position.y = 150;

    this.block.addChild(this.busterBomba);
  }

  onBusterBombaClick(callback) {
    this.busterBomba.on('pointerdown', () => callback(this));
  }
}
