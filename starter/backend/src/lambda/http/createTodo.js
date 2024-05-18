import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { createTodo } from '../../businessLogic/todos.mjs'
import { getUserId } from "../utils.mjs";
import { createLogger } from '../../utils/logger.mjs';

const logger = createLogger('createTodo');

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  ).handler(async (event) => {
    const newTodo = JSON.parse(event.body)

    // TODO: Implement creating a new TODO item
    logger.info('creating a new TODO event: ', event);

    const userId = getUserId(event)
    const newItem = await createTodo(newTodo, userId)
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ item: newItem })
    }
  })

