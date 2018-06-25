import { coinFlip } from 'utils';
import { assert } from 'chai';

it('should return true or false', () => {
  const bool = coinFlip();
  assert.isBoolean(bool);
});
