import { incrementByLevel } from 'utils';

it('should return 2', () => {
  const value = incrementByLevel(0, 2, 1);
  expect(value).to.equal(2);
});

it('should return number in range between 1 and 9', () => {
  const value = incrementByLevel(0, 3, 3);
  expect(value).to.be.at.least(1);
  expect(value).to.be.at.most(9);
});
