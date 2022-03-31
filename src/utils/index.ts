interface Result {
  letter: string;
  index: number;
  status: 'present' | 'absent' | 'correct';
}

export type Keyboard = Record<string, Result['status']>;

export const buildKeyboardResponse = (results: Result[]): Keyboard =>
  results?.reduce(
    (acc, result) => ({
      ...acc,
      [result.letter]: result.status
    }),
    {}
  );

export const letterStatus = (
  target: string,
  letter: string,
  index: number,
  letterCount: number = 0
): Result['status'] => {
  if (target.toLowerCase().charAt(index) === letter) return 'correct';
  if (target.toLowerCase().indexOf(letter) !== -1 && letterCount > 0)
    return 'present';
  return 'absent';
};

export const countLetters = (word: string): Record<string, number> =>
  word.split('').reduce(
    (acc, currLetter) => ({
      ...acc,
      [currLetter]: (acc[currLetter] ?? 0) + 1
    }),
    {} as Record<string, number>
  );

export const compareWords = (
  target: string,
  guess: string,
  index: number = 0
): Result[] => {
  const wordCount = countLetters(target);

  return guess.split('').map((letter, index) => {
    const status = letterStatus(target, letter, index, wordCount[letter]);
    if (status !== 'absent') wordCount[letter] -= 1;

    return { status, letter, index };
  });
};

export const getDate = () => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
};
