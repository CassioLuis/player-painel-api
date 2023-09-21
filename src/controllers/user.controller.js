import User from '../services/user.service.js'

export default class UserController {

  static addUser = (req, res) => {
    res.send('ola')
  }
  
  static getUsers = async (req, res) => {
    try {
      const data = await User.getUsers()
      if (!data.length) return res.status(404).send({ message: 'record not found' })
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