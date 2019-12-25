import { Router } from 'express'
import mongoose from 'mongoose'
import { userOnly } from '../middlewares/authentication'
import User, { IUser } from '../models/user'
import { euroToCent } from '../utils/euroConverter'

const userRouter = Router()

userRouter.post('/transfer/', userOnly, async (request, response, next) => {
  try {
    const from = await User.findById(request.user._id.toString())
    const to = await User.findById(request.body.to)
    const amount = euroToCent(request.body.amount)

    if (from && to && from._id.toString() !== to._id.toString()) {
      await transfer(request.user, to, amount)
      response.redirect('/')
    } else {
      const error = new Error('Unable to perform transaction')
      error.name = 'TransactionError'
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

const transfer = async (from: IUser, to: IUser, amount: number) => {
  from.balance -= amount
  to.balance += amount
  const fromUpdated = await from.save()
  const toUpdated = await to.save()
}

export default userRouter
