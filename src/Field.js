import { Container, Sprite } from 'pixi.js';
import { Tile } from './Tile';

export class Field {
  static MARGIN_TOP = 150;
  static MARGIN_LEFT = 30;
  static PADDING = 10;

  constructor(gameBlock, gameOptions) {
    this.gameBlock = gameBlock;
    this.gameOptions = gameOptions;
    this.container = new Container();
    this.tilesContainer = new Container();
    this.sprite = Sprite.from('./assets/ui/field.png');
  }

  paint() {
    this.gameBlock.addChild(this.container);

    this.sprite.width = this.gameOptions.columnsCount * Tile.WIDTH + Field.PADDING * 2;
    this.sprite.height = this.gameOptions.rowsCount * Tile.HEIGHT + Field.PADDING * 2;
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
