import express from 'express'
import Payments from '../controllers/payments.controller.js'
import AuthMiddleware from '../middleware/auth.middleware.js'

const route = express.Router()

route.post('/', AuthMiddleware.validToken, Payments.create)
route.get('/search', AuthMiddleware.validToken, Payments.getAllByUser)
route.post('/notification', Payments.notification)

export default route