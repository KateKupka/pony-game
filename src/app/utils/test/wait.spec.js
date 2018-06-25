import { wait } from 'utils';

it('should return promise', () => {
  const promise = wait(0);
  expect(promise).to.be.a('promise');
});

it('should not timeout', async () => {
  await wait(0);
  expect(true).to.be.equal(true);
});
