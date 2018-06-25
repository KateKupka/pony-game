import { Applejack } from 'components/character-list';

const applejack = new Applejack({ lvl: 'random', mode: 'pvp' }, 1);

it('damage_mod should be 3', () => {
  expect(applejack.constructor.config.damage_mod).to.equal(3);
});
