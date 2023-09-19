import { Sprite } from 'pixi.js';
import { gsap } from 'gsap';
import { TILE_HEIGHT, TILE_WIDTH } from './constants';

class Tile {
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
      x: column * TILE_WIDTH,
      y: row * TILE_HEIGHT,
    };
    this.row = row;
    this.column = column;
    this.color = color;
  }

  updatePosition({ row, column }) {
    this.id = `${column}_${row}`;
    this.position = {
      x: column * TILE_WIDTH,
      y: row * TILE_HEIGHT,
    };
    this.row = row;
    this.column = column;
  }
}

export class GraphicTile extends Tile {
  constructor(field, options) {
    super(options);

    this.field = field;
    this.graphic = Sprite.from(`./assets/tiles/${this.color}.png`);
    this.graphic.name = 'tile';
    this.graphic.eventMode = 'static';
    this.graphic.cursor = 'pointer';
  }

  paint({ startPositionY } = {}) {
    this.graphic.width = TILE_WIDTH;
    this.graphic.height = TILE_HEIGHT;

    this.graphic.position.x = this.position.x;
    this.graphic.position.y = startPositionY ?? this.position.y;

    this.field.addChild(this.graphic);
  }

  repaint() {
    this.graphic.position.x = this.position.x;
    this.graphic.position.y = this.position.y;
  }

  remove() {
    gsap.to(this.graphic, {
      alpha: 0,
      ease: 'expo.out',
      duration: 0.6,
      onComplete: () => {
        this.field.removeChild(this.graphic);
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

  animateFlashing() {
    gsap.to(this.graphic, {
      alpha: 0.5,
      duration: 0.3,
    });
  }

  stopAnimateFlashing() {
    gsap.to(this.graphic, {
      alpha: 1,
      duration: 0.3,
    });
  }
}
