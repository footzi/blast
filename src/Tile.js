import { TILE_HEIGHT, TILE_WIDTH } from './constants';
import { Graphics } from 'pixi.js';
import { gsap } from 'gsap';

class Tile {
  static WIDTH = 40;
  static HEIGHT = 40;

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
  graphic = null;

  constructor(gameBlock, options) {
    super(options);

    // @todo подумать как избавиться от gameBlock
    this.gameBlock = gameBlock;
    this.graphic = new Graphics();
    this.graphic.eventMode = 'static';

    // this.fallSpeed = 10;
  }

  paint({ startPositionY } = {}) {
    this.graphic.beginFill(this.color);
    this.graphic.drawRect(0, 0, TILE_WIDTH, TILE_HEIGHT);

    this.graphic.position.x = this.position.x;
    this.graphic.position.y = startPositionY ?? this.position.y;

    this.gameBlock.addChild(this.graphic);
  }

  remove() {
    // @todo реализовать анимацию без gsap
    gsap.to(this.graphic, {
      alpha: 0,
      ease: 'expo.out',
      duration: 0.5,
      onComplete: () => {
        this.gameBlock.removeChild(this.graphic);
      },
    });
  }

  onPointerDown(callback) {
    this.graphic.on('pointerdown', () => callback(this));
  }

  animateSlideDown() {
    gsap.to(this.graphic, {
      y: this.position.y,
      duration: 0.5,
      ease: 'circ.out',
    });
  }
}
