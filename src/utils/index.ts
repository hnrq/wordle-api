interface Result {
  letter: string;
  index: number;
  status: 'present' | 'absent' | 'correct';
}

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

export type Keyboard = Record<string, Result['status'] | 'unused'>;

export const buildKeyboardResponse = (results?: Result[]): Keyboard => ({
  ...alphabet.reduce((acc, letter) => ({ ...acc, [letter]: 'unused' }), {}),
  ...results?.reduce(
    (acc, result) => ({
      ...acc,
      [result.letter]: result.status
    }),
    {}
  )
});

export const letterStatus = (
  target: string,
  letter: string,
  index: number,
  letterCount: number = 0
): Result['status'] => {
  if (target.toLowerCase().charAt(index) === letter && letterCount > 0)
    return 'correct';
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
