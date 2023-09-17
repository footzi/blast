export const getTileIdsForBurn = (targetTile, tiles) => {
  const result = [];

  result.push(targetTile.id);

  const checkTop = (data) => {
    const { row: rowIndex, column: columnIndex, color } = data;

    const column = tiles[columnIndex];

    if (!column) {
      return;
    }

    const tile = column[rowIndex - 1];

    if (!tile) {
      return;
    }

    if (tile.color === color) {
      const has = result.includes(tile.id);

      if (has) {
        return;
      }

      result.push(tile.id);

      checkTop(tile);
      checkRight(tile);
      checkLeft(tile);
      checkBottom(tile);
    }
  };

  const checkRight = (data) => {
    const { row: rowIndex, column: columnIndex, color } = data;

    const column = tiles[columnIndex - 1];

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

      checkTop(tile);
      checkRight(tile);
      checkLeft(tile);
      checkBottom(tile);
    }
  };

  const checkLeft = (data) => {
    const { row: rowIndex, column: columnIndex, color } = data;

    const column = tiles[columnIndex + 1];

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

      checkTop(tile);
      checkRight(tile);
      checkLeft(tile);
      checkBottom(tile);
    }
  };

  const checkBottom = (data) => {
    const { row: rowIndex, column: columnIndex, color } = data;

    const column = tiles[columnIndex];

    if (!column) {
      return;
    }

    const tile = column[rowIndex + 1];

    if (!tile) {
      return;
    }

    if (tile.color === color) {
      const has = result.includes(tile.id);

      if (has) {
        return;
      }

      result.push(tile.id);

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
};
