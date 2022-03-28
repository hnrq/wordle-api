import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { guessWord } from './controllers/wordle.controller';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => ({
  statusCode: 200,
  body: JSON.stringify(guessWord(event.pathParameters?.word ?? ''))
});
