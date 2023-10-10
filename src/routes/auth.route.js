import express from 'express'
import AuthController from '../controllers/auth.controller.js'
import AuthMiddleware from '../middleware/auth.middleware.js'

const route = express.Router()

route.post('/', AuthMiddleware.validLogin, AuthController.login)
route.post('/forgot', AuthController.forgotPass)

export default route