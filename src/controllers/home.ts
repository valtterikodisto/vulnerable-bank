import { Router } from 'express'
import { userOnly } from '../middlewares/authentication'

const homeRouter = Router()

homeRouter.get('/', userOnly, (request, response) => {
  response.send(`Hello ${request.user.username}`)
})

export default homeRouter
