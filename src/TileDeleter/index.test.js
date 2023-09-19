import { TileDeleter } from './index';

const defaultTiles = [
  [
    {
      color: 'yellow',
      id: '0-0',
      column: 0,
      row: 0,
    },
    {
      color: 'yellow',
      id: '0-1',
      column: 0,
      row: 1,
    },
    {
      color: 'yellow',
      id: '0-2',
      column: 0,
      row: 2,
    },
  ],
  [
    {
      color: 'yellow',
      id: '1-0',
      column: 1,
      row: 0,
    },
    {
      color: 'yellow',
      id: '1-1',
      column: 1,
      row: 1,
    },
    {
      color: 'yellow',
      id: '1-2',
      column: 1,
      row: 2,
    },
  ],
  [
    {
      color: 'yellow',
      id: '2-0',
      column: 2,
      row: 0,
    },
    {
      color: 'yellow',
      id: '2-1',
      column: 2,
      row: 1,
    },
    {
      color: 'yellow',
      id: '2-2',
      column: 2,
      row: 2,
    },
  ],
];

// преобразует строки в моке в колонки для лучшей наглядности
const changeColor = (rows) => {
  const result = [[], [], []];

  rows.forEach((row, rowIndex) => {
    row.forEach((item, index) => {
      const columnIndex = index;
      const itemIndex = rowIndex;
      const defaultEl = { ...defaultTiles[columnIndex][itemIndex] };
      defaultEl.color = item;

      result[columnIndex][itemIndex] = defaultEl;
    });
  });

  return result;
};

const testData = [
  {
    title: 'only 1 tile',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-1',
        column: 1,
        row: 1,
      },
      tiles: changeColor([
        ['red', 'blue', 'red'],
        ['red', 'yellow', 'green'],
        ['red', 'red', 'yellow'],
      ]),
    },
    expect: [],
  },
  {
    title: 'only 1 tile top',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-1',
        column: 1,
        row: 1,
      },
      tiles: changeColor([
        ['red', 'yellow', 'red'],
        ['red', 'yellow', 'green'],
        ['red', 'red', 'yellow'],
      ]),
    },
    expect: ['1-1', '1-0'],
  },
  {
    title: 'only 1 tile right',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-1',
        column: 1,
        row: 1,
      },
      tiles: changeColor([
        ['red', 'blue', 'red'],
        ['blue', 'yellow', 'yellow'],
        ['red', 'red', 'red'],
      ]),
    },
    expect: ['1-1', '2-1'],
  },
  {
    title: 'only 1 tile left',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-1',
        column: 1,
        row: 1,
      },
      tiles: changeColor([
        ['red', 'blue', 'red'],
        ['yellow', 'yellow', 'red'],
        ['red', 'red', 'red'],
      ]),
    },
    expect: ['1-1', '0-1'],
  },
  {
    title: 'only 1 tile bottom',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-1',
        column: 1,
        row: 1,
      },
      tiles: changeColor([
        ['red', 'blue', 'red'],
        ['red', 'yellow', 'red'],
        ['red', 'yellow', 'red'],
      ]),
    },
    expect: ['1-1', '1-2'],
  },
  {
    title: 'double tile top',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-0',
        column: 1,
        row: 0,
      },
      tiles: changeColor([
        ['red', 'yellow', 'red'],
        ['red', 'yellow', 'green'],
        ['red', 'yellow', 'red'],
      ]),
    },
    expect: ['1-0', '1-1', '1-2'],
  },
  {
    title: 'double tile right',
    data: {
      targetTile: {
        color: 'yellow',
        id: '0-1',
        column: 0,
        row: 1,
      },
      tiles: changeColor([
        ['red', 'green', 'red'],
        ['yellow', 'yellow', 'yellow'],
        ['red', 'green', 'red'],
      ]),
    },
    expect: ['0-1', '1-1', '2-1'],
  },
  {
    title: 'double tile left',
    data: {
      targetTile: {
        color: 'yellow',
        id: '2-1',
        column: 2,
        row: 1,
      },
      tiles: changeColor([
        ['red', 'green', 'red'],
        ['yellow', 'yellow', 'yellow'],
        ['red', 'green', 'red'],
      ]),
    },
    expect: ['2-1', '1-1', '0-1'],
  },
  {
    title: 'double tile bottom',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-0',
        column: 1,
        row: 0,
      },
      tiles: changeColor([
        ['red', 'yellow', 'red'],
        ['red', 'yellow', 'red'],
        ['red', 'yellow', 'red'],
      ]),
    },
    expect: ['1-0', '1-1', '1-2'],
  },
  {
    title: 'tile top and right',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-2',
        column: 1,
        row: 2,
      },
      tiles: changeColor([
        ['red', 'yellow', 'yellow'],
        ['red', 'yellow', 'green'],
        ['red', 'yellow', 'red'],
      ]),
    },
    expect: ['1-2', '1-1', '1-0', '2-0'],
  },
  {
    title: 'tile top and left',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-2',
        column: 1,
        row: 2,
      },
      tiles: changeColor([
        ['yellow', 'yellow', 'red'],
        ['red', 'yellow', 'green'],
        ['red', 'yellow', 'red'],
      ]),
    },
    expect: ['1-2', '1-1', '1-0', '0-0'],
  },
  {
    title: 'tile bottom and right and left',
    data: {
      targetTile: {
        color: 'yellow',
        id: '1-0',
        column: 1,
        row: 0,
      },
      tiles: changeColor([
        ['red', 'yellow', 'red'],
        ['red', 'yellow', 'green'],
        ['yellow', 'yellow', 'yellow'],
      ]),
    },
    expect: ['1-0', '1-1', '1-2', '0-2', '2-2'],
  },
  {
    title: 'full',
    data: {
      targetTile: {
        color: 'yellow',
        id: '0-0',
        column: 0,
        row: 0,
      },
      tiles: changeColor([
        ['yellow', 'yellow', 'yellow'],
        ['yellow', 'yellow', 'yellow'],
        ['yellow', 'yellow', 'yellow'],
      ]),
    },
    expect: ['0-0', '1-0', '2-0', '2-1', '1-1', '0-1', '0-2', '1-2', '2-2'],
  },
];

describe('TileDeleter/getTilesForDelete', () => {
  testData.forEach((test) => {
    it(test.title, () => {
      console.log(test.data.tiles);
      expect(TileDeleter.getTilesForDelete(test.data.targetTile, test.data.tiles)).toEqual(test.expect);
    });
  });
});
