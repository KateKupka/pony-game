import { getUniqueNumbers } from 'utils';

it('should return array of numbers from 1 to 10', () => {
  const array = getUniqueNumbers(1, 10, [], 10);
  expect(array).to.include.members([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

it('should return array of numbers from 5 to 6', () => {
  const array = getUniqueNumbers(5, 6, [], 2);
  expect(array).to.include.members([5, 6]);
});

