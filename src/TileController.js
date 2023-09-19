import { GraphicTile, Tile } from './Tile';
import { getRandomValueFromArray, mixArray } from './utils';
import { TileDeleter } from './TileDeleter';

export class TileController {
  constructor(field, callbacks, gameOptions) {
    this.field = field;
    this.tiles = [];
    this.isBusterBombaActive = false;
    this.gameFinished = false;
    this.gameOptions = gameOptions;

    this.onStep = callbacks.onStep;
  }

  generateTiles() {
    for (let i = 0; i < this.gameOptions.columnsCount; i++) {
      const column = [];

      for (let j = 0; j < this.gameOptions.rowsCount; j++) {
        const color = getRandomValueFromArray(Tile.COLORS);
        const tile = new GraphicTile(this.field, { row: j, column: i, color });

        tile.paint();
        tile.onClick(this.handleClickTile.bind(this));

        column.push(tile);
      }

      this.tiles.push(column);
    }
  }

  regenerate() {
    this.tiles.forEach((column) => {
      column.forEach((tile) => {
        if (tile) {
          tile.remove();
        }
      });
    });
    this.tiles = [];
    this.generateTiles();
  }

  handleClickTile(tile) {
    if (this.gameFinished) return;

    if (this.isBusterBombaActive) {
      this.stopAnimateFlashingTiles();
    }

    const ids = this.removeTiles(tile);

    if (ids.length) {
      this.changePositionTiles();
      this.addNewTiles();
      this.animateTiles();

      this.onStep(ids.length);
    }

    this.isBusterBombaActive = false;
  }

  removeTiles(tile) {
    const busterBombaBonusRadius = this.gameOptions.busterBombaBonusRadius;

    const ids = this.isBusterBombaActive
      ? TileDeleter.getTilesForDeleteBusterBomba(tile, this.tiles, busterBombaBonusRadius)
      : TileDeleter.getTilesForDelete(tile, this.tiles);

    console.log(tile);
    console.log(this.tiles);

    this.tiles = this.tiles.map((column) => {
      return column.map((tile) => {
        if (ids.includes(tile?.id)) {
          tile.remove();

          return null;
        }

        return tile;
      });
    });

    return ids;
  }

  changePositionTiles() {
    for (let i = 0; i < this.tiles.length; i++) {
      const column = this.tiles[i];
      const newColumn = [];
      let kof = 0;

      for (let j = column.length - 1; j >= 0; j--) {
        const tile = column[j];

        if (!tile) {
          newColumn[kof] = null;
          kof++;
          continue;
        }

        if (tile) {
          const column = tile.column;
          const row = tile.row + kof;

          tile.updatePosition({ column, row });
          newColumn[row] = tile;
        }
      }
      this.tiles[i] = newColumn;
    }
  }

  addNewTiles() {
    this.tiles = this.tiles.map((column, columnIndex) => {
      return column.map((tile, rowIndex) => {
        if (!tile) {
          const row = rowIndex;
          const column = columnIndex;
          const color = getRandomValueFromArray(Tile.COLORS);
          const startPositionY = Tile.NEW_POSITION + Tile.HEIGHT * rowIndex + 1;

          const newTile = new GraphicTile(this.field, { row, column, color });

          newTile.paint({ startPositionY });
          newTile.onClick(this.handleClickTile.bind(this));

          return newTile;
        } else return tile;
      });
    });
  }

  animateTiles() {
    this.tiles.forEach((column) => {
      column.forEach((tile) => tile?.animateSlideDown());
    });
  }

  startAnimateFlashingTiles() {
    this.tiles.forEach((column) => {
      column.forEach((tile) => tile?.animateFlashing());
    });
  }

  stopAnimateFlashingTiles() {
    this.tiles.forEach((column) => {
      column.forEach((tile) => tile?.stopAnimateFlashing());
    });
  }

  mixTiles() {
    this.tiles = mixArray(this.tiles).map((column, columnIndex) => {
      return mixArray(column).map((tile, rowIndex) => {
        const row = rowIndex;
        const column = columnIndex;

        tile.updatePosition({ column, row });
        tile.repaint();

        return tile;
      });
    });
  }

  setIsBusterBombaActive() {
    this.isBusterBombaActive = true;

    this.startAnimateFlashingTiles();
  }

  setGameFinished(value) {
    this.gameFinished = value;
  }
}
