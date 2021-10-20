import { shallowMount } from '@vue/test-utils';
import GameOfLife from '@/components/game-of-life/GameOfLife';

describe('GameOfLife', () => {
  it('Should exist', () => {
    const wrapper = shallowMount(GameOfLife);
    expect(wrapper.exists()).toBe(true);
  });
});
