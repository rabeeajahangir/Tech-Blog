const {format_plural, format_dates} = require('../utils/helpers');


test('format_plural() returns a pluralized word', () => {
  const word1 = format_plural('text', 1);
  const word2 = format_plural('post', 2);

  expect(word1).toBe('text');
  expect(word2).toBe('post');
});

test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_dates(date)).toBe('3/20/2020');
});
