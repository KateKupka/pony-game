import { getRandomNumber } from 'utils';

it('should return random number in range between 10 and 50', () => {
  const number = getRandomNumber(10, 50);
  expect(number).to.be.at.least(10);
  expect(number).to.be.at.most(50);
});
