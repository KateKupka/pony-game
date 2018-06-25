import { Hoofbeat } from 'components/skill-list';

const hoofbeat = new Hoofbeat([{ health: 50 }, { health: 0, icon: 'basic' }], 1);

it('getModifiedStats() should return an array', () => {
  const array = hoofbeat.getModifiedStats();
  expect(array).to.be.an('array');
});
