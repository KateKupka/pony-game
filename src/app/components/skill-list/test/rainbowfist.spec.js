import { RainbowFist } from 'components/skill-list';

const rainbowFist = new RainbowFist([{ health: 50 }, { health: 0, icon: 'basic', lvl: 1, damage_mod: 3 }], 1);

it('getModifiedStats() should decrease health', () => {
  rainbowFist.applyStatChanges();
  expect(rainbowFist.modified_stat_list[0].health).to.not.equal(50);
});
