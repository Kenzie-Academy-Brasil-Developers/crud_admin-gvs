import express, { Application, json } from 'express'
import { handleErrors } from './middlewares/handleError.middleware'
import { courseRoutes } from './routes/course.routes'
import { userRoutes } from './routes/user.routes'

const app: Application = express()
app.use(express.json())
app.use('/users', userRoutes)
app.use('/courses', courseRoutes)
app.use(handleErrors)
export default app
