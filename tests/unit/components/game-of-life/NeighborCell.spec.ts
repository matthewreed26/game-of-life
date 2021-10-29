import {
  isNeighborCellAlive,
  isNeighborCellPositionOffGrid,
  NeighborCellPosition,
  neighborCellPositions,
} from '@/components/game-of-life/NeighborCell';
import { empty4By8Grid } from './Grid.fixture';

const gridDimensions = { gridNumRows: 4, gridNumCols: 8 };
const leftTopCornerCell = { rowNum: 0, colNum: 0 };
const leftBottomCornerCell = { rowNum: 3, colNum: 0 };
const rightBottomCornerCell = { rowNum: 3, colNum: 7 };
const rightTopCornerCell = { rowNum: 0, colNum: 7 };

describe('NeighborCell', () => {
  it('Should determine the surrounding boundary cells for left top corner cell', () => {
    const expectations = [true, false, true, false, true, true, true, false];

    neighborCellPositions.forEach((neighborCellPosition, index) => {
      expect(
        isNeighborCellPositionOffGrid(
          neighborCellPosition,
          leftTopCornerCell.rowNum,
          leftTopCornerCell.colNum,
          gridDimensions.gridNumRows,
          gridDimensions.gridNumCols
        )
      ).toBe(expectations[index]);
    });
  });
  it('Should determine the surrounding boundary cells for right bottom corner cell', () => {
    const expectations = [false, true, false, true, false, true, true, true];

    neighborCellPositions.forEach((neighborCellPosition, index) => {
      expect(
        isNeighborCellPositionOffGrid(
          neighborCellPosition,
          rightBottomCornerCell.rowNum,
          rightBottomCornerCell.colNum,
          gridDimensions.gridNumRows,
          gridDimensions.gridNumCols
        )
      ).toBe(expectations[index]);
    });
  });

  it('Should determine if neighbor cell is alive', () => {
    expect(
      isNeighborCellAlive(
        NeighborCellPosition.RIGHT,
        leftTopCornerCell.rowNum,
        leftTopCornerCell.colNum,
        empty4By8Grid
      )
    ).toBe(false);
    expect(
      isNeighborCellAlive(
        NeighborCellPosition.BOTTOM,
        leftTopCornerCell.rowNum,
        leftTopCornerCell.colNum,
        empty4By8Grid
      )
    ).toBe(false);
    expect(
      isNeighborCellAlive(
        NeighborCellPosition.RIGHT_BOTTOM,
        leftTopCornerCell.rowNum,
        leftTopCornerCell.colNum,
        empty4By8Grid
      )
    ).toBe(false);
    expect(
      isNeighborCellAlive(
        NeighborCellPosition.LEFT,
        rightBottomCornerCell.rowNum,
        rightBottomCornerCell.colNum,
        empty4By8Grid
      )
    ).toBe(false);
    expect(
      isNeighborCellAlive(
        NeighborCellPosition.TOP,
        rightBottomCornerCell.rowNum,
        rightBottomCornerCell.colNum,
        empty4By8Grid
      )
    ).toBe(false);
    expect(
      isNeighborCellAlive(
        NeighborCellPosition.LEFT_TOP,
        rightBottomCornerCell.rowNum,
        rightBottomCornerCell.colNum,
        empty4By8Grid
      )
    ).toBe(false);
    expect(
      isNeighborCellAlive(
        NeighborCellPosition.LEFT_BOTTOM,
        rightTopCornerCell.rowNum,
        rightTopCornerCell.colNum,
        empty4By8Grid
      )
    ).toBe(false);
    expect(
      isNeighborCellAlive(
        NeighborCellPosition.RIGHT_TOP,
        leftBottomCornerCell.rowNum,
        leftBottomCornerCell.colNum,
        empty4By8Grid
      )
    ).toBe(false);
  });
});
