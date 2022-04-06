import axios, { AxiosResponse } from 'axios';
import { DynamoDB } from 'aws-sdk';
import { getDate } from '../utils';

const params = {
  api_key: process.env.API_KEY,
  hasDictionaryDef: 'true',
  minLength: '5',
  maxLength: '5',
  includePartOfSpeech: 'verb,noun,noun-plural',
  minCorpusCount: '500',
  minDictionaryCount: '10'
};

const dynamoDB = new DynamoDB({
  region: 'sa-east-1',
  apiVersion: '2012-08-10'
});

interface Word {
  id: number;
  word: string;
}

const saveWord = async (word: string) =>
  dynamoDB
    .putItem({
      TableName: process.env.TABLE_NAME ?? '',
      Item: {
        Date: { S: getDate() },
        Word: { S: word }
      }
    })
    .promise();

const fetchRandomWord = async (): Promise<string> => {
  const response: AxiosResponse<Word> = await axios.get(
    `${process.env.API_HOST}/words.json/randomWord`,
    { params }
  );

  return response.data.word;
};

const getWordByDate = async () =>
  dynamoDB
    .getItem({
      TableName: process.env.TABLE_NAME ?? '',
      Key: { Date: { S: getDate() } }
    })
    .promise();

export const getRandomWord = async (): Promise<string> => {
  const storedWord = await getWordByDate();
  if (storedWord.Item) return storedWord.Item['Word'].S as string;

  const word = await fetchRandomWord();
  await saveWord(word);

  return word;
};

// using scrabble score because searchWord has been deprecated.
export const isWordValid = async (word: string) => {
  const response = await axios.get(
    `${process.env.API_HOST}/word.json/${word}/scrabbleScore`,
    {
      params
    }
  );

  return response.status === 200;
};
