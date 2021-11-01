import { defineComponent } from "vue";
import {
  isNeighborCellAlive,
  isNeighborCellPositionOffGrid,
  neighborCellPositions,
} from "./NeighborCell";

interface Cell {
  id: number;
  alive: boolean;
}

type CellRow = Cell[];

export type CellGrid = CellRow[];

export default defineComponent({
  name: "GameOfLife",
  data() {
    return {
      grid: [[{ id: -1, alive: false }]] as CellGrid,
      numRows: 4,
      numCols: 8,
    };
  },
  created() {
    this.generateEmptyGrid();
  },
  methods: {
    generateEmptyGrid(): void {
      const alive = false;
      let idCount = 0;
      this.grid = [];
      for (let rowNum = 0; rowNum < this.numRows; rowNum++) {
        const row = [];
        for (let colNum = 0; colNum < this.numCols; colNum++) {
          row.push({ id: idCount++, alive });
        }
        this.grid.push(row);
      }
    },
    toggleCellLife(cellId: number): void {
      this.grid.forEach((row) =>
        row.forEach((col) => {
          if (col.id === cellId) {
            col.alive = !col.alive;
          }
        })
      );
    },
    generateNextGenerationGrid(): void {
      let idCount = 0;
      const nextGenerationGrid = [];
      for (let rowNum = 0; rowNum < this.numRows; rowNum++) {
        const row = [];
        for (let colNum = 0; colNum < this.numCols; colNum++) {
          row.push({
            id: idCount++,
            alive: this.assertNextGenCellLifeBasedOnCurrentNeighborLives(
              rowNum,
              colNum
            ),
          });
        }
        nextGenerationGrid.push(row);
      }
      this.grid = nextGenerationGrid;
    },
    assertNextGenCellLifeBasedOnCurrentNeighborLives(
      rowNum: number,
      colNum: number
    ): boolean {
      const numLiveNeighbors = this.countNeighborCellsIfInsideGridAndAlive(
        rowNum,
        colNum
      );
      if (numLiveNeighbors > 3 || numLiveNeighbors < 2) {
        return false;
      } else if (numLiveNeighbors === 3) {
        return true;
      } else {
        return this.grid[rowNum][colNum].alive;
      }
    },
    countNeighborCellsIfInsideGridAndAlive(
      rowNum: number,
      colNum: number
    ): number {
      let numLiveNeighbors = 0;
      neighborCellPositions.forEach((neighborCellPosition) => {
        numLiveNeighbors =
          numLiveNeighbors +
          (isNeighborCellPositionOffGrid(
            neighborCellPosition,
            rowNum,
            colNum,
            this.numRows,
            this.numCols
          )
            ? 0
            : +isNeighborCellAlive(
                neighborCellPosition,
                rowNum,
                colNum,
                this.grid
              ));
      });
      return numLiveNeighbors;
    },
  },
});
