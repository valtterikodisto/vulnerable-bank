import { Router } from 'express'
import User, { IUser } from '../models/user'
import url from 'url'

const registerRouter = Router()

registerRouter.get('/', (request, response, next) => {
  const invalid = Boolean(request.query.invalid)
  response.render('register', { invalid })
})

registerRouter.post('/', (request, response, next) => {
  const user: IUser = { ...request.body, balance: 0 }

  User.create(user)
    .then(savedUser => {
      response.redirect('/login')
    })
    .catch(() => {
      response.redirect(
        url.format({
          pathname: '/register',
          query: {
            invalid: true
          }
        })
      )
    })
})

export default registerRouter
