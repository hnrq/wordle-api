import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context
} from 'aws-lambda';
import type { Request, Response } from 'lambda-api';
import { guessWord, isWordValid } from './controllers/wordle.controller';

const api = require('lambda-api')();

api.use((req: Request, res: Response, next: any) => {
  res.cors({});
  next();
});

api.get('/:word/valid', async (req: Request) =>
  isWordValid(req.params['word'] ?? '')
);

api.get('/guess/:word', async (req: Request) =>
  guessWord(req.params['word'] ?? '')
);

export const handler = async (event: APIGatewayProxyEvent, context: Context) =>
  api.run(event, context);
