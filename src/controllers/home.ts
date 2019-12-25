import { Router } from 'express'
import { userOnly } from '../middlewares/authentication'
import User from '../models/user'
import { centToEuro } from '../utils/euroConverter'

const homeRouter = Router()

homeRouter.get('/', userOnly, async (request, response) => {
  const users = await User.find()
  const toRender = {
    username: request.user.username,
    balance: centToEuro(request.user.balance),
    users,
    invalid: Boolean(request.query.invalid)
  }
  response.render('home', toRender)
})

export default homeRouter
