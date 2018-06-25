import BattleController from 'components/battle-controller';
import sinon from 'sinon';
import clone from 'lodash/cloneDeep';

jest.mock('utils', () => ({
  Defer: function() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  },
  wait: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });
  },
}));

global.document.documentElement.innerHTML = `
<div id="content"></div>`;

const data = [
  {
    view: {
      displayCharacter: () => {},
      spinImage: () => {},
    },
    setActive: () => {},
    getSkill: () => {
      return function () { this.getModifiedStats = () => [{ is_dead: true }, { is_dead: false }]; };
    },
    update: () => {},
    finishRound: () => {},
  },
  {
    view: {
      displayCharacter: () => {},
      spinImage: () => {},
    },
    setActive: () => {},
    getSkill: () => {
      return function () { this.getModifiedStats = () => [{ is_dead: true }, { is_dead: false }]; };
    },
    update: () => {},
    finishRound: () => {},
  },
];

const bc = new BattleController(clone(data));

bc.current_player_index = 0;

it('outputs html', () => {
  bc.buildBattleground();
  expect(document.getElementById('content').innerHTML).to.be.a('string');
});

it('Current player index should be 1', () => {
  bc.changePlayer();
  expect(bc.current_player_index).to.equal(1);
});

const bc2 = new BattleController(clone(data));

it('Loser index should be null', async () => {
  bc2.applyChanges([{ is_dead: false }, { is_dead: false }]);
  expect(bc2.loser_index).to.equal(null);
});

it('Should return an object with promise', () => {
  const promise = bc.onFinishGame();
  expect(promise).to.be.a('promise');
});

const bc3 = new BattleController(clone(data));

it('Should return an object with promise', async () => {
  await bc3.finishGame(1);
  expect(bc3.deffered.promise).to.be.a('promise');
});

it('finishRound() should trigger resetSkills()', async () => {
  bc3.resetSkills = sinon.spy();
  bc3.finishRound();
  expect(bc3.current_player_index).to.be.equal(1);
  expect(bc3.resetSkills).to.be.calledOnce;
});
