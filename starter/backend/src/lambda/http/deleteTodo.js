import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler';
import { deleteTodo } from '../../businessLogic/todos.mjs';
import { getUserId } from '../utils.mjs';
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('deleteTodo');

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  ).handler(async (event) => {
    const todoId = event.pathParameters.todoId

    // TODO: Remove a TODO item by id
    logger.info('Remove a TODO item by id event: ', event);

    const userId = getUserId(event);
    await deleteTodo(todoId, userId);
    return {
      statusCode: 204,
      body: 'TODO item deleted'
    };
  })

