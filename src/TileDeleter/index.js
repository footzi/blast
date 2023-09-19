export class TileDeleter {
  static getTilesForDelete(targetTile, tiles) {
    const result = [];

    result.push(targetTile.id);

    const check = (data, columnIndex, rowIndex) => {
      const { color } = data;

      const column = tiles[columnIndex];

      if (!column) {
        return;
      }

      const tile = column[rowIndex];

      if (!tile) {
        return;
      }

      if (tile.color === color) {
        const has = result.includes(tile.id);

        if (has) {
          return;
        }

        result.push(tile.id);

        return tile;
      }
    };

    const checkTop = (data) => {
      const { row, column } = data;

      const tile = check(data, column, row - 1);

      if (tile) {
        checkTop(tile);
        checkRight(tile);
        checkLeft(tile);
        checkBottom(tile);
      }
    };

    const checkRight = (data) => {
      const { row, column } = data;

      const tile = check(data, column - 1, row);

      if (tile) {
        checkTop(tile);
        checkRight(tile);
        checkLeft(tile);
        checkBottom(tile);
      }
    };

    const checkLeft = (data) => {
      const { row, column } = data;

      const tile = check(data, column + 1, row);

      if (tile) {
        checkTop(tile);
        checkRight(tile);
        checkLeft(tile);
        checkBottom(tile);
      }
    };

    const checkBottom = (data) => {
      const { row, column } = data;

      const tile = check(data, column, row + 1);

      if (tile) {
        checkTop(tile);
        checkRight(tile);
        checkLeft(tile);
        checkBottom(tile);
      }
    };

    checkTop(targetTile);
    checkRight(targetTile);
    checkLeft(targetTile);
    checkBottom(targetTile);

    if (result.length === 1) {
      return [];
    }

    return result;
  }

  static getTilesForDeleteBusterBomba(targetTile, tiles, busterBombaBonusRadius) {
    const result = [];

    const minColumn = targetTile.column - busterBombaBonusRadius;
    const maxColumn = targetTile.column + busterBombaBonusRadius;

    const minRow = targetTile.row - busterBombaBonusRadius;
    const maxRow = targetTile.row + busterBombaBonusRadius;

    tiles.forEach((column) => {
      column.forEach((tile) => {
        const isOnColumns = tile.column <= maxColumn && tile.column >= minColumn;
        const isOnRows = tile.row <= maxRow && tile.row >= minRow;

        if (isOnColumns && isOnRows) {
          result.push(tile.id);
        }
      });
    });

    return result;
  }
}
