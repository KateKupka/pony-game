import { UnicornDust } from 'components/skill-list';

const unicornDust = new UnicornDust(
  [
    { health: 50 },
    { health: 0, icon: 'basic', lvl: 1, total_health: 10, health_mod: 2 },
  ],
  1,
);

it('getModifiedStats() should increase health', () => {
  unicornDust.applyStatChanges();
  expect(unicornDust.modified_stat_list[1].health).to.not.equal(0);
});

