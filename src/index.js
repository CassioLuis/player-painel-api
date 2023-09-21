import express from 'express'
import userRoute from './routes/user.route.js'
const app = express()
const port = 3000


app.use('/user', userRoute)

app.listen(port)