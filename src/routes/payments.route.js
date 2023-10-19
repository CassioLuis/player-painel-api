import express from 'express'
import Payments from '../controllers/payments.controller.js'

const route = express.Router()

route.post('/status', Payments.status)

export default route