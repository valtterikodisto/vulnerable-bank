import { ErrorRequestHandler } from 'express'
import logger from '../logger/logger'

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error.code === 11000 && request.url === '/register') {
    const errorMessage = 'Username already taken'
    logger.error(errorMessage, error)
    return response.status(409).json({ error: errorMessage })
  } else if (error.name === 'UserAuthorizationError') {
    logger.error(error.message)
    return response.redirect('/login')
  }

  next(error)
}

export default errorHandler
