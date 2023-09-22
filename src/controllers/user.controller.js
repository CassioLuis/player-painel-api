import User from '../services/user.service.js'
import toBase64 from '../utils/passEncode.js'

export default class UserController {

  static addUser = async (req, res) => {
    try {
      const body = req.body
      const encodedPass = toBase64(body.truename + body.password)
      if (!Object.entries(body).length) return res.status(404).send({ message: 'register invalid' })
      const response = await User.addUser({...body, password: encodedPass})
      return res.status(200).send({ message: response })
    } catch (error) {
      res.json({ error })
    }
  }
  
  static getUsers = async (req, res) => {
    try {
      const data = await User.getUsers()
      if (!data.length) return res.status(404).send({ message: 'records not found' })
      return res.json({ message: data })
    } catch (error) {
      res.json({ error })
    }
  }
  
  static getUser = async (req, res) => {
    try {
      const { login } = req.params
      const data = await User.getUser(login)
      if (!data.length) return res.status(404).send({ message: 'record not found' })
      return res.json({ result: data })
    } catch (error) {
      res.json({ error })
    }
  }

  static changePass = async (req, res) => {
    try {
      const { login, newPass } = req.body
      const data = await User.changePass(login, newPass)
      res.json({ message: data })
    } catch(error) {
      res.json({ error })
    }
  }
}