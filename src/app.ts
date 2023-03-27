import 'reflect-metadata'
import express from 'express'
/* import 'express-async-error' */
import userRoutes from './routes/userRoutes'
import loginRoute from './routes/loginRoute'
import handleError from './errors/handleError'
import cors from 'cors'

const app = express()
app.use(express.json())

app.use(cors())
app.use('/users', userRoutes)
app.use('/login', loginRoute)

app.use(handleError)

export default app