import { Container, Sprite } from 'pixi.js';
import { COLUMNS_COUNT, ROWS_COUNT, TILE_HEIGHT, TILE_WIDTH } from './constants';

export class Field {
  static MARGIN_TOP = 200;
  static MARGIN_LEFT = 30;
  static PADDING = 10;

  constructor(gameBlock) {
    this.gameBlock = gameBlock;
    this.container = new Container();
    this.tilesContainer = new Container();
    this.sprite = Sprite.from(`./assets/ui/field.png`, {
      width: 100,
      height: 100,
    });
  }

  paint() {
    this.gameBlock.addChild(this.container);

    this.sprite.width = COLUMNS_COUNT * TILE_WIDTH + Field.PADDING * 2;
    this.sprite.height = ROWS_COUNT * TILE_HEIGHT + Field.PADDING * 2;
    this.sprite.name = 'field';

    this.container.setTransform(Field.MARGIN_LEFT, Field.MARGIN_TOP);
    this.tilesContainer.setTransform(Field.PADDING, Field.PADDING);

    this.container.addChild(this.sprite);
    this.container.addChild(this.tilesContainer);
  }

  getContainer() {
    return this.tilesContainer;
  }
}
