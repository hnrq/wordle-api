import axios, { AxiosResponse } from 'axios';
import { DynamoDB } from 'aws-sdk';
import { getDate } from '../utils';

const TABLE_NAME = 'Wordle';

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
      TableName: TABLE_NAME,
      Item: {
        Date: { S: getDate() },
        Word: { S: word }
      }
    })
    .promise();

const fetchRandomWord = async (): Promise<string> => {
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

const getWordByDate = async () =>
  dynamoDB
    .getItem({
      TableName: TABLE_NAME,
      Key: { Date: { S: getDate() } }
    })
    .promise();

export const getRandomWord = async (): Promise<string> => {
  const storedWord = await getWordByDate();
  if (storedWord.Item) return storedWord.Item.toString();

  const word = await fetchRandomWord();
  saveWord(word);

  return word;
};
