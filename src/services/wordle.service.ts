import axios, { AxiosResponse } from 'axios';

interface Word {
  id: number;
  word: string;
}

export const getRandomWord = async (): Promise<string> => {
  const response: AxiosResponse<Word> = await axios.get(
    `${process.env.API_HOST}/words.json/randomWord`,
    {
      params: {
        api_key: process.env.API_KEY,
        hasDictionaryDef: 'true',
        minLength: '5',
        maxLength: '5'
      }
    }
  );

  return response.data.word;
};
