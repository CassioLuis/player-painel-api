import express from 'express'
import cors from 'cors'
import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'
import paymentsRoute from './src/routes/payments.route.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use('/payments', paymentsRoute)

app.listen(process.env.PORT || port, () => {
  console.log(`Connection success on port ${process.env.PORT || port}`)
})