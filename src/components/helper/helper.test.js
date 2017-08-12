import { removeSpaces } from './helper';

it('removes space from strings', () => {
  const foo = 'hello world';
  expect(removeSpaces(foo)).toBe('helloworld');

  const bar = ' h e ll o world     ';
  expect(removeSpaces(bar)).toBe('helloworld');
});
