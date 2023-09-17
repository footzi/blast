import { COLUMNS_COUNT, ROWS_COUNT, TILE_COLORS } from './constants';
import { GraphicTile } from './Tile';
import { getRandomValueFromArray, mixArray } from './utils';
import { getTileIdsForBurn, getTilesForBurnBomba } from './tile-deleter';

export class TileController {
  constructor(gameBlock) {
    this.gameBlock = gameBlock;
    this.tiles = [];
    this.isBusterBombaActive = false;
  }

  generateTiles() {
    for (let i = 0; i < COLUMNS_COUNT; i++) {
      const column = [];

      for (let j = 0; j < ROWS_COUNT; j++) {
        // const { color } = MOCK_TITLE2[`${i}_${j}`];
        const color = getRandomValueFromArray(TILE_COLORS);
        const tile = new GraphicTile(this.gameBlock, { row: j, column: i, color });

        column.push(tile);
      }

      this.tiles.push(column);
    }
  }

  // todo МБ сразу рисовать???
  paintTiles() {
    this.tiles.forEach((column) => {
      column.forEach((tile) => {
        // todo в метод
        tile.paint();
        tile.onClick(this.handleClickTile.bind(this));
      });
    });
  }

  handleClickTile(tile) {
    this.removeTiles(tile);

    this.changePositionTiles();
    this.addNewTiles();
    this.animateTiles();
  }

  removeTiles(tile) {
    const ids = this.isBusterBombaActive ? getTilesForBurnBomba(tile, this.tiles) : getTileIdsForBurn(tile, this.tiles);

    this.tiles = this.tiles.map((column) => {
      return column.map((tile) => {
        if (ids.includes(tile?.id)) {
          tile.remove();

          return null;
        }

        return tile;
      });
    });
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
          const color = getRandomValueFromArray(TILE_COLORS);
          const startPositionY = -(rowIndex + 1) * GraphicTile.WIDTH;

          const newTile = new GraphicTile(this.gameBlock, { row, column, color });
          // todo в метод

          newTile.paint({ startPositionY });
          newTile.onClick(this.handleClickTile.bind(this));

          return newTile;
        } else return tile;
      });
    });
  }

  animateTiles() {
    this.tiles.forEach((column) => {
      column.forEach((tile) => {
        if (tile) {
          tile.animateSlideDown();
        }
      });
    });
    // // todo почему то скорость становиться быстрее и быстрее
    // const id = Ticker.shared.add((delta) => {
    //   this.tiles.forEach((column) => {
    //     column.forEach((tile) => {
    //       if (tile) {
    //         tile.animateSlideDown(delta);
    //       }
    //     });
    //   });
    // });
    //
    // id.destroy();

    // this.tiles.forEach((column) => {
    //   column.forEach((tile) => {
    //     if (tile) {
    //       tile.animateSlideDown();
    //     }
    //   });
    // });
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
  }
}
