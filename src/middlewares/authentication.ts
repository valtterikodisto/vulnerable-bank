import { Handler } from 'express'
import User, { IUser } from '../models/user'

declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}

export const authenticate: Handler = (request, response, next) => {
  const userId: string = request.cookies['user_id']
  User.findById(userId)
    .then(user => {
      if (user) {
        request.user = user
      }
      next()
    })
    .catch((error: Error) => next(error))
}

export const userOnly: Handler = (request, response, next) => {
  if (!request.user) {
    const error = new Error('User not authorized')
    error.name = 'UserAuthorizationError'
    next(error)
  } else {
    next()
  }
}
