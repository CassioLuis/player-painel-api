import express from 'express'
import UserController from '../controllers/user.controller.js'

const route = express.Router()

route.post('/add', UserController.addUser)
route.get('/get', UserController.getUsers)
route.get('/get/:login', UserController.getUser)
route.put('/changePass', UserController.changePass)

export default route