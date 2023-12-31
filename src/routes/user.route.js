import express from 'express'
import UserController from '../controllers/user.controller.js'
import UserMiddleware from '../middleware/user.middleware.js'
import AuthMiddleware from '../middleware/auth.middleware.js'

const route = express.Router()

route.post('/', UserMiddleware.validNewAccount, UserController.addUser)
route.get('/get', UserController.getUsers)
route.get('/get/login/:login', UserController.getUserByLogin)
route.get('/get/email/:email', UserController.getUserByEmail)
route.put('/changePass', AuthMiddleware.validToken, UserController.changePass)

export default route