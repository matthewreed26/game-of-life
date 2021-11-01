<template>
  <div id="app">
    <GameOfLife />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameOfLife from "./components/game-of-life/GameOfLife.vue";

export default defineComponent({
  name: "App",
  components: {
    GameOfLife
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
