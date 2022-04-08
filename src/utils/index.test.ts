import { compareWords, getAvailableLettersPool } from './index';

describe('compareWords()', () => {
  it("Returns 'absent' for letters duplicated at guess but not at target", () => {
    expect(compareWords('aloft', 'atoll').pop()?.status).toBe('absent');
  });
});

describe('getAvailableLettersPool()', () => {
  it('Counts present and absent letters on the guess', () => {
    const answer = 'total';
    const guess = 'atoll';

    const letterPairs: Array<[string, string]> = Array.from(answer, (_, i) => [
      answer[i],
      guess[i]
    ]);
    expect(getAvailableLettersPool(letterPairs)).toEqual({
      a: 1,
      o: 1,
      t: 2
    });
  });
});
