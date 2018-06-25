import getRandomNumber from './get-random-number';

/**
 * increment stat based on lvl and modificator
 * @param base - number
 * @param lvl - number
 * @param mod - number
 */
export default function incrementStatByLevel(base, lvl, mod) {
  for (let i = 1; i <= lvl; i++) {
    base += getRandomNumber(1, mod);
  }
  return base;
}
