import express from 'express'
import router from './router'
import cors from 'cors'
import morgan from 'morgan'
import { signup, signin, protect } from './modules/auth'

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.json({message: "Hello World!"});
});

app.use('/signup', signup)
app.use('/signin',signin)
app.use('/api', protect, router)

export default app