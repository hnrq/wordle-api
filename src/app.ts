import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { guessWord } from './controllers/wordle.controller';

export const guessHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = await guessWord(event.pathParameters?.word ?? '');
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};

export const findHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const response = await guessWord(event.queryStringParameters?.word ?? '');
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
};
