import getRandomNumber from './get-random-number';

/**
 * return [] of unique numbers
 * @param min - number
 * @param max - number
 * @param numbers - array
 * @param quantity - number
 */
export default function getUniqueNumbers(min, max, numbers, quantity) {
  const number = getRandomNumber(min, max);
  if (numbers.includes(number)) return getUniqueNumbers(min, max, numbers, quantity);
  numbers.push(number);
  if (numbers.length < quantity) return getUniqueNumbers(min, max, numbers, quantity);
  return numbers;
}
