import { letterStatus, compareWords, countLetters } from './index';

describe('letterStatus()', () => {
  it("returns 'correct' if target word contains the letter at the given index \
  and letter count is bigger than 0", () => {
    expect(letterStatus('words', 'o', 1, 1)).toBe('correct');
  });

  it("returns 'present' if target word contains the letter but not at the given index \
   and letter count is bigger than 0", () => {
    expect(letterStatus('words', 'o', 2, 1)).toBe('present');
  });

  it("returns 'absent' if target word does not contain the letter", () => {
    expect(letterStatus('words', 'a', 2, 1)).toBe('absent');
  });

  it("returns 'absent' if target word contains the letter but letter count is equals 0", () => {
    expect(letterStatus('words', 'o', 4, 0)).toBe('absent');
  });
});

describe('compareWords()', () => {
  it("Returns 'absent' for letters duplicated at guess but not at target", () => {
    expect(compareWords('aloft', 'atoll').pop()?.status).toBe('absent');
  });
});

describe('countLetters()', () => {
  it('Counts the appearances of letters in a given word', () => {
    expect(countLetters('atoll')).toEqual({
      a: 1,
      t: 1,
      o: 1,
      l: 2
    });
  });
});
