import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { guessWord } from './controllers/wordle.controller';

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = await guessWord(event.pathParameters?.word ?? '');
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
