<template>
  <div>
    <h1>
      Welcome to the
      <a
        href="https://codingdojo.org/kata/GameOfLife/"
        target="_blank"
        rel="noopener"
        >Game of Life</a
      >
    </h1>
    <div>
      <span># of Rows:</span
      ><input
        type="number"
        v-model.number="numRows"
        @change="generateEmptyGrid"
      />
      <span># of Columns:</span
      ><input
        type="number"
        v-model.number="numCols"
        @change="generateEmptyGrid"
      />
    </div>
    <div class="center">
      <span>Toggle starting cells and press play:</span>
      <img
        alt="Vue logo"
        src="../assets/logo.png"
        @click="nextGenerationGrid"
      />
    </div>
    <div v-for="(row, $rowIndex) in grid" :key="$rowIndex">
      <span v-for="(col, $colIndex) in row" :key="$colIndex"
        ><button v-if="col.alive" @click="toggleCell(col.id)">
          *</button
        ><button v-else @click="toggleCell(col.id)">
          .
        </button></span
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GameOfLife',
    data() {
      return {
        grid: [[false]],
        numRows: 4,
        numCols: 8,
      };
    },
    created() {
      this.generateEmptyGrid();
    },
    methods: {
      generateEmptyGrid() {
        const alive = false;
        let idCount = 0;
        this.grid = [];
        for (let rowNum = 0; rowNum < this.numRows; rowNum++) {
          let row = [];
          for (let colNum = 0; colNum < this.numCols; colNum++) {
            row.push({ id: idCount++, alive });
          }
          this.grid.push(row);
        }
      },
      toggleCell(cellId) {
        this.grid.forEach((row) =>
          row.forEach((col) => {
            if (col.id === cellId) {
              col.alive = !col.alive;
            }
          })
        );
      },
      nextGenerationGrid() {
        let idCount = 0;
        let nextGenerationGrid = [];
        for (let rowNum = 0; rowNum < this.numRows; rowNum++) {
          let row = [];
          for (let colNum = 0; colNum < this.numCols; colNum++) {
            row.push({
              id: idCount++,
              alive: this.checkNeighbors(rowNum, colNum),
            });
          }
          nextGenerationGrid.push(row);
        }
        this.grid = nextGenerationGrid;
      },
      checkNeighbors(rowNum, colNum) {
        const leftHorizontalNeighbor =
          rowNum === 0 ? 0 : +this.grid[rowNum - 1][colNum].alive;
        const rightHorizontalNeighbor =
          rowNum === this.numRows - 1
            ? 0
            : +this.grid[rowNum + 1][colNum].alive;
        const topVirticalNeighbor =
          colNum === 0 ? 0 : +this.grid[rowNum][colNum - 1].alive;
        const bottomVirticalNeighbor =
          colNum === this.numCols - 1
            ? 0
            : +this.grid[rowNum][colNum + 1].alive;
        const leftTopNeighbor =
          rowNum === 0 || colNum === 0
            ? 0
            : +this.grid[rowNum - 1][colNum - 1].alive;
        const rightTopNeighbor =
          rowNum === 0 || colNum === this.numCols - 1
            ? 0
            : +this.grid[rowNum - 1][colNum + 1].alive;
        const bottomLeftNeighbor =
          rowNum === this.numRows - 1 || colNum === 0
            ? 0
            : +this.grid[rowNum + 1][colNum - 1].alive;
        const bottomRightNeighbor =
          rowNum === this.numRows - 1 || colNum === this.numCols - 1
            ? 0
            : +this.grid[rowNum + 1][colNum + 1].alive;
        const numLiveNeighbors =
          leftHorizontalNeighbor +
          rightHorizontalNeighbor +
          topVirticalNeighbor +
          bottomVirticalNeighbor +
          leftTopNeighbor +
          rightTopNeighbor +
          bottomLeftNeighbor +
          bottomRightNeighbor;
        if (numLiveNeighbors > 3 || numLiveNeighbors < 2) {
          return false;
        } else if (numLiveNeighbors === 3) {
          return true;
        } else {
          return this.grid[rowNum][colNum].alive;
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #42b983;
  }
  img {
    max-width: 3%;
    height: auto;
    transition: transform 0.7s ease-in-out;
  }
  img:hover {
    transform: rotate(-90deg);
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
