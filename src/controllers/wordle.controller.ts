import * as services from '../services/wordle.service';
import { compareWords, buildKeyboardResponse } from '../utils';

export const guessWord = async (guess: string) => {
  const randomWord = await services.getRandomWord();
  const result = compareWords(randomWord, guess);
  const keyboard = buildKeyboardResponse(result);

  return { result, keyboard };
};

export const isWordValid = async (word: string) =>
  await services.isWordValid(word);
