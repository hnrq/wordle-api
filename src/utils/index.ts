interface Result {
  letter: string;
  index: number;
  status: 'present' | 'absent' | 'correct';
}

const statusPriority = {
  absent: 1,
  present: 2,
  correct: 3
};

export type Keyboard = Record<string, Result['status']>;

export const buildKeyboardResponse = (results: Result[]): Keyboard =>
  results?.reduce(
    (acc, result) => ({
      ...acc,
      [result.letter]:
        statusPriority[acc[result.letter]] > statusPriority[result.status]
          ? acc[result.letter]
          : result.status
    }),
    {} as Record<string, Result['status']>
  );

// Thank you @chantastic!
export const getAvailableLettersPool = (
  letterPairs: Array<[string, string]>
): Record<string, number> =>
  letterPairs.reduce(
    (acc, [answerLetter, guessLetter]) =>
      answerLetter === guessLetter
        ? acc
        : {
            ...acc,
            [answerLetter]: (acc[answerLetter] ?? 0) + 1
          },
    {} as Record<string, number>
  );

export const compareWords = (answer: string, guess: string): Result[] => {
  const letterPairs: Array<[string, string]> = Array.from(answer, (_, i) => [
    answer[i],
    guess[i]
  ]);
  const availableLettersPool = getAvailableLettersPool(letterPairs);

  return letterPairs.map(([answerLetter, guessLetter], index) => {
    let status: Result['status'];
    if (answerLetter === guessLetter) status = 'correct';
    else if (
      answer.includes(guessLetter) &&
      availableLettersPool[guessLetter] > 0
    ) {
      availableLettersPool[guessLetter] = availableLettersPool[guessLetter] - 1;
      status = 'present';
    } else status = 'absent';

    return { letter: guessLetter, status, index };
  });
};

export const getDate = () => new Date().toISOString().slice(0, 10);
