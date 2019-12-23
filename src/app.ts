import express from 'express'
import mongo from './mongo'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import loginRouter from './controllers/login'
import registerRouter from './controllers/register'

import errorHandler from './middlewares/errorHandler'
import { authenticate } from './middlewares/authentication'
import homeRouter from './controllers/home'

mongo.connect()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(authenticate)

app.set('views', 'views')
app.set('view engine', 'pug')

app.use('/', homeRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

app.use(errorHandler)

export default app
