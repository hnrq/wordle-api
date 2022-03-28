interface Result {
  letter: string;
  index: number;
  status: 'present' | 'absent' | 'correct';
}

enum Alphabet {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z
}

export type Keyboard = {
  [key in keyof typeof Alphabet]?: Result['status'] | 'unused';
};

export const buildKeyboardResponse = (results?: Result[]): Keyboard => ({
  ...Object.values(Alphabet).reduce(
    (acc, letter) => ({ ...acc, [letter]: 'unused' }),
    {}
  ),
  ...results?.reduce(
    (acc, result) => ({
      ...acc,
      [result.letter as keyof typeof Alphabet]: result.status
    }),
    {}
  )
});

const letterStatus = (
  target: string,
  letter: string,
  index: number
): Result['status'] => {
  if (target.charAt(index) === letter) return 'correct';
  if (target.indexOf('letter') !== -1) return 'present';
  return 'absent';
};

export const compareWords = (target: string, guess: string): Result[] =>
  guess.split('').map((letter, index) => ({
    letter,
    index,
    status: letterStatus(target, letter, index)
  }));
