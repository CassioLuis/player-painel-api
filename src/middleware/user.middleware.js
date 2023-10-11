import UserService from '../services/user.service.js'
import AuthService from '../services/auth.service.js'
import validEmail from '../utils/validEmail.js'

export default class UserMiddleware {
  static async validNewAccount (req, res, next) {
    const { name, password, trueName, email } = req.body
    if (!name || !password || !trueName || !email) return res.status(400).send({ message: 'invalid form' })
    if (!validEmail(email)) return res.status(400).send({ message: 'invalid email' })
    try {
      let verify = await UserService.getUserByLogin(name)
      if (verify.length) return res.status(400).send({ message: 'user already exists' })
      verify = await UserService.getUserByEmail(email)
      if (verify.length) return res.status(400).send({ message: 'user already exists' })
      next()
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  static async login (req, res, next) {
    const { name, password } = req.body
    if (!name || !password) return res.status(400).send({ message: 'invalid user' })
    try {
      const user = await UserService.login(name, password)
      if (!user) res.status(404).send({ message: 'user not found' })
      next()
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}