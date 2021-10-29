import { CellGrid } from './GameOfLife.component';

export enum NeighborCellPosition {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT_TOP = 'LEFT_TOP',
  RIGHT_TOP = 'RIGHT_TOP',
  LEFT_BOTTOM = 'LEFT_BOTTOM',
  RIGHT_BOTTOM = 'RIGHT_BOTTOM',
}

export const neighborCellPositions = [
  NeighborCellPosition.LEFT,
  NeighborCellPosition.RIGHT,
  NeighborCellPosition.TOP,
  NeighborCellPosition.BOTTOM,
  NeighborCellPosition.LEFT_TOP,
  NeighborCellPosition.RIGHT_TOP,
  NeighborCellPosition.LEFT_BOTTOM,
  NeighborCellPosition.RIGHT_BOTTOM,
];

export const isNeighborCellPositionOffGrid = (
  neighborCellPosition: NeighborCellPosition,
  rowNum: number,
  colNum: number,
  gridNumRows: number,
  gridNumCols: number
): boolean => {
  switch (neighborCellPosition) {
    case NeighborCellPosition.LEFT:
      return rowNum === 0;
    case NeighborCellPosition.RIGHT:
      return rowNum === gridNumRows - 1;
    case NeighborCellPosition.TOP:
      return colNum === 0;
    case NeighborCellPosition.BOTTOM:
      return colNum === gridNumCols - 1;
    case NeighborCellPosition.LEFT_TOP:
      return rowNum === 0 || colNum === 0;
    case NeighborCellPosition.RIGHT_TOP:
      return rowNum === 0 || colNum === gridNumCols - 1;
    case NeighborCellPosition.LEFT_BOTTOM:
      return rowNum === gridNumRows - 1 || colNum === 0;
    case NeighborCellPosition.RIGHT_BOTTOM:
      return rowNum === gridNumRows - 1 || colNum === gridNumCols - 1;
  }
};

export const isNeighborCellAlive = (
  neighborCellPosition: NeighborCellPosition,
  rowNum: number,
  colNum: number,
  grid: CellGrid
): boolean => {
  switch (neighborCellPosition) {
    case NeighborCellPosition.LEFT:
      return grid[rowNum - 1][colNum].alive;
    case NeighborCellPosition.RIGHT:
      return grid[rowNum + 1][colNum].alive;
    case NeighborCellPosition.TOP:
      return grid[rowNum][colNum - 1].alive;
    case NeighborCellPosition.BOTTOM:
      return grid[rowNum][colNum + 1].alive;
    case NeighborCellPosition.LEFT_TOP:
      return grid[rowNum - 1][colNum - 1].alive;
    case NeighborCellPosition.RIGHT_TOP:
      return grid[rowNum - 1][colNum + 1].alive;
    case NeighborCellPosition.LEFT_BOTTOM:
      return grid[rowNum + 1][colNum - 1].alive;
    case NeighborCellPosition.RIGHT_BOTTOM:
      return grid[rowNum + 1][colNum + 1].alive;
  }
};
