import { Router } from 'express'
import User, { IUser } from '../models/user'
import url from 'url'
import Credentials from '../types/Credentials'

const loginRouter = Router()

loginRouter.get('/', (request, response) => {
  const invalid = Boolean(request.query.invalid)
  response.render('login', { invalid })
})

loginRouter.post('/', (request, response, next) => {
  const credentials: Credentials = request.body

  User.findOne(credentials)
    .then(user => {
      if (user) {
        response.cookie('user_id', user._id.toString())
        response.redirect('/')
      } else {
        response.redirect(
          url.format({
            pathname: '/login',
            query: {
              invalid: true
            }
          })
        )
      }
    })
    .catch((error: Error) => next(error))
})

export default loginRouter
