import { Defer } from 'utils';

it('should return a promise', () => {
  const defer = new Defer();
  expect(defer.promise).to.be.a('promise');
});
