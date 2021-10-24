import { shallowMount } from '@vue/test-utils';
import GameOfLife from '@/components/game-of-life/GameOfLife';

const empty4By8Grid = [
  [
    {
      alive: false,
      id: 0,
    },
    {
      alive: false,
      id: 1,
    },
    {
      alive: false,
      id: 2,
    },
    {
      alive: false,
      id: 3,
    },
    {
      alive: false,
      id: 4,
    },
    {
      alive: false,
      id: 5,
    },
    {
      alive: false,
      id: 6,
    },
    {
      alive: false,
      id: 7,
    },
  ],
  [
    {
      alive: false,
      id: 8,
    },
    {
      alive: false,
      id: 9,
    },
    {
      alive: false,
      id: 10,
    },
    {
      alive: false,
      id: 11,
    },
    {
      alive: false,
      id: 12,
    },
    {
      alive: false,
      id: 13,
    },
    {
      alive: false,
      id: 14,
    },
    {
      alive: false,
      id: 15,
    },
  ],
  [
    {
      alive: false,
      id: 16,
    },
    {
      alive: false,
      id: 17,
    },
    {
      alive: false,
      id: 18,
    },
    {
      alive: false,
      id: 19,
    },
    {
      alive: false,
      id: 20,
    },
    {
      alive: false,
      id: 21,
    },
    {
      alive: false,
      id: 22,
    },
    {
      alive: false,
      id: 23,
    },
  ],
  [
    {
      alive: false,
      id: 24,
    },
    {
      alive: false,
      id: 25,
    },
    {
      alive: false,
      id: 26,
    },
    {
      alive: false,
      id: 27,
    },
    {
      alive: false,
      id: 28,
    },
    {
      alive: false,
      id: 29,
    },
    {
      alive: false,
      id: 30,
    },
    {
      alive: false,
      id: 31,
    },
  ],
];

describe('GameOfLife', () => {
  const wrapper = shallowMount(GameOfLife);
  const component = wrapper.vm;

  it('Should exist with default values', () => {
    expect(wrapper.exists()).toBe(true);
    expect(component.numRows).toBe(4);
    expect(component.numCols).toBe(8);
    expect(component.grid).toEqual(empty4By8Grid);
  });

  it('Should toggle a cell', () => {
    expect(component.toggleCell(0));
    expect(component.grid[0][0]).toEqual({ alive: true, id: 0 });
  });

  it('Should check neighbors for next generation', () => {
    component.grid[0][0].alive = true;
    component.grid[0][1].alive = true;
    component.grid[1][0].alive = true;
    component.grid[2][3].alive = true;
    component.grid[3][3].alive = true;
    component.grid[3][2].alive = true;
    expect(component.checkNeighbors(0, 0)).toBe(true);
    expect(component.checkNeighbors(0, 1)).toBe(true);
    expect(component.checkNeighbors(1, 0)).toBe(true);
    expect(component.checkNeighbors(1, 1)).toBe(true);
    expect(component.checkNeighbors(2, 2)).toBe(true);
    expect(component.checkNeighbors(2, 3)).toBe(true);
    expect(component.checkNeighbors(3, 2)).toBe(true);
    expect(component.checkNeighbors(3, 3)).toBe(true);
  });

  it('Should generate beacon oscillator', () => {
    expect(component.nextGenerationGrid());
    expect(component.grid[1][1].alive).toBe(true);
    expect(component.grid[2][2].alive).toBe(true);
    expect(component.nextGenerationGrid());
    expect(component.grid[1][1].alive).toBe(false);
    expect(component.grid[2][2].alive).toBe(false);
  });
});
