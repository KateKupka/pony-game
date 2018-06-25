import Character from 'components/character';

class TestCharacter extends Character {
  static ponyName = 'TestName';

  static config = {
    damage_mod: 3,
    health_mod: 4,
  }
}

global.document.documentElement.innerHTML = `
<div>
  <div id="char-0"></div>
  <div id="char-1"></div>
</div>`;


const test_character = new TestCharacter({
  mode: 'eve',
  lvl: 'random',
}, 0);

const stats = test_character.stat;

it('is_dead should be false', () => {
  expect(stats.is_dead).to.be.false;
});

it('finishRound() should reset promises', () => {
  test_character.finishRound();
  expect(test_character.deffered.promise).to.be.a('promise');
  expect(test_character.view.deffered.promise).to.be.a('promise');
});

it('setActive() should set is_active to false', () => {
  test_character.setActive(false);
  expect(test_character.is_active).to.be.false;
});

it('setActive() should set is_active to false', () => {
  test_character.update({});
  expect(test_character.stat).to.deep.equal({});
});

it('getSkill() should return a promise', () => {
  const promise = test_character.getSkill();
  expect(promise).to.be.a('promise');
});

