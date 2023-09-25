import express from 'express'
import cors from 'cors'
import userRoute from './routes/user.route.js'
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/user', userRoute)

app.listen(port, () => {
  console.log('Connection success')
})