import { ErrorRequestHandler } from 'express'
import logger from '../logger/logger'
import url from 'url'

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error.code === 11000 && request.url === '/register') {
    const errorMessage = 'Username already taken'
    logger.error(errorMessage, error)
    return response.status(409).json({ error: errorMessage })
  } else if (error.name === 'UserAuthorizationError') {
    logger.error(error.message)
    return response.redirect('/login')
  } else if (error.name === 'TransactionError') {
    logger.error(error.message)
    return response.redirect(url.format({ pathname: '/', query: { invalid: true } }))
  }

  next(error)
}

export default errorHandler
