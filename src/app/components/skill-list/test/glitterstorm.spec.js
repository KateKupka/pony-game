import { GlitterStorm } from 'components/skill-list';

const glitterStorm = new GlitterStorm([{ health: 50 }, { health: 0, icon: 'basic' }], 1);

it('getModifiedStats() should decrease health', () => {
  glitterStorm.applyStatChanges();
  expect(glitterStorm.modified_stat_list[0].health).to.not.equal(50);
});
