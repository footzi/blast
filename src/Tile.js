import { Sprite } from 'pixi.js';
import { gsap } from 'gsap';

class Tile {
  static WIDTH = 41;
  static HEIGHT = 46;

  id = '';
  color = '';
  position = {
    x: 0,
    y: 0,
  };
  row = 0;
  column = 0;

  constructor({ row, column, color }) {
    this.id = `${column}_${row}`;
    this.position = {
      x: column * Tile.WIDTH,
      y: row * Tile.HEIGHT,
    };
    this.row = row;
    this.column = column;
    this.color = color;
  }

  updatePosition({ row, column }) {
    this.id = `${column}_${row}`;
    this.position = {
      x: column * Tile.WIDTH,
      y: row * Tile.HEIGHT,
    };
    this.row = row;
    this.column = column;
  }
}

export class GraphicTile extends Tile {
  constructor(gameBlock, options) {
    super(options);

    this.gameBlock = gameBlock;
  }

  paint({ startPositionY } = {}) {
    this.graphic = Sprite.from(`./assets/tiles/${this.color}.png`);
    this.graphic.width = Tile.WIDTH;
    this.graphic.height = Tile.HEIGHT;

    this.graphic.eventMode = 'static';

    this.graphic.position.x = this.position.x;
    this.graphic.position.y = startPositionY ?? this.position.y;

    this.gameBlock.addChild(this.graphic);
  }

  repaint() {
    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
  }

  remove() {
    // @todo реализовать анимацию без gsap
    gsap.to(this.graphic, {
      alpha: 0,
      ease: 'expo.out',
      duration: 0.6,
      onComplete: () => {
        this.gameBlock.removeChild(this.graphic);
      },
    });
  }

  onClick(callback) {
    this.graphic.on('pointerdown', () => callback(this));
  }

  animateSlideDown() {
    gsap.to(this.graphic, {
      y: this.position.y,
      delay: 0.1,
      duration: 0.5,
      ease: 'circ.out',
    });
  }
}
