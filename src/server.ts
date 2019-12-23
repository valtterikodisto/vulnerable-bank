import { PORT } from './config'
import app from './app'
import logger from './logger/logger'

app.listen(3000, error => {
  if (error) {
    logger.error('Something bad happened', error)
  }

  logger.success(`Server running on port ${PORT}`)
})
