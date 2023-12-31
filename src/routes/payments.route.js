import express from 'express'
import PaymentsController from '../controllers/payments.controller.js'
import AuthMiddleware from '../middleware/auth.middleware.js'
import PaymentMiddleware from '../middleware/payment.middleware.js'

const route = express.Router()

route.post('/', AuthMiddleware.validToken, PaymentsController.create)
route.get('/search', AuthMiddleware.validToken, PaymentsController.getAllByUser)
route.post('/notification', PaymentMiddleware.handleWebHookResponse, PaymentsController.handleUpdateOrder)

export default route