import User from '../services/user.service.js'
import toBase64 from '../utils/passEncode.js'

export default class UserController {

  static addUser = async (req, res) => {
    try {
      const body = req.body
      const encodedPass = toBase64(body.name + body.password)
      if (!Object.entries(body).length) return res.status(404).send({ message: 'register invalid' })
      await User.addUser({ ...body, password: encodedPass })
      return res.status(200).send({ message: 'user successfully registered' })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  static getUsers = async (req, res) => {
    try {
      const [data] = await User.getUsers()
      if (!data.length) return res.status(404).send({ message: 'records not found' })
      return res.json(data)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  static getUserByLogin = async (req, res) => {
    try {
      const { login } = req.params
      const data = await User.getUserByLogin(login)
      if (!data.length) return res.status(404).send({ message: 'record not found' })
      return res.json(true)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  static getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params
      const data = await User.getUserByEmail(email)
      if (!data.length) return res.status(404).send({ message: 'record not found' })
      return res.json(true)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  static changePass = async (req, res) => {
    try {
      const { newPass, userName } = req.body
      const encodedPass = toBase64(userName + newPass)
      await User.changePass(userName, encodedPass)
      return res.status(200).json({ message: 'password changed successfully' })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}