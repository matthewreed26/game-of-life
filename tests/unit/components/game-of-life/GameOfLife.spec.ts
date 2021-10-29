import { shallowMount, Wrapper } from '@vue/test-utils';
import GameOfLifeVue from '@/components/game-of-life/GameOfLife.vue';
import { empty4By8Grid } from './Grid.fixture';
import Vue from 'vue';

describe('GameOfLife', () => {
  const wrapper: Wrapper<Vue & { [key: string]: any }> = shallowMount(
    GameOfLifeVue
  );
  const component = wrapper.vm;

  it('Should exist with default values', () => {
    expect(wrapper.exists()).toBe(true);
    expect(component.numRows).toBe(4);
    expect(component.numCols).toBe(8);
    expect(component.grid).toEqual(empty4By8Grid);
  });

  it('Should toggle cell life', () => {
    expect(component.toggleCellLife(0));
    expect(component.grid[0][0]).toEqual({ alive: true, id: 0 });
  });

  it('Should correctly count neighbor cells inside grid that are alive', () => {
    component.grid[0][0].alive = true;
    component.grid[0][1].alive = true;
    component.grid[1][0].alive = true;
    component.grid[2][3].alive = true;
    component.grid[3][3].alive = true;
    component.grid[3][2].alive = true;

    expect(component.countNeighborCellsIfInsideGridAndAlive(0, 0)).toBe(2);
    expect(component.countNeighborCellsIfInsideGridAndAlive(3, 3)).toBe(2);
  });

  it('Should check neighbors for next generation', () => {
    expect(
      component.assertNextGenCellLifeBasedOnCurrentNeighborLives(0, 0)
    ).toBe(true);
    expect(
      component.assertNextGenCellLifeBasedOnCurrentNeighborLives(0, 1)
    ).toBe(true);
    expect(
      component.assertNextGenCellLifeBasedOnCurrentNeighborLives(1, 0)
    ).toBe(true);
    expect(
      component.assertNextGenCellLifeBasedOnCurrentNeighborLives(1, 1)
    ).toBe(true);
    expect(
      component.assertNextGenCellLifeBasedOnCurrentNeighborLives(2, 2)
    ).toBe(true);
    expect(
      component.assertNextGenCellLifeBasedOnCurrentNeighborLives(2, 3)
    ).toBe(true);
    expect(
      component.assertNextGenCellLifeBasedOnCurrentNeighborLives(3, 2)
    ).toBe(true);
    expect(
      component.assertNextGenCellLifeBasedOnCurrentNeighborLives(3, 3)
    ).toBe(true);
  });

  it('Should generate beacon oscillator', () => {
    expect(component.generateNextGenerationGrid());
    expect(component.grid[1][1].alive).toBe(true);
    expect(component.grid[2][2].alive).toBe(true);
    expect(component.generateNextGenerationGrid());
    expect(component.grid[1][1].alive).toBe(false);
    expect(component.grid[2][2].alive).toBe(false);
  });
});
