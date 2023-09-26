import UserService from '../services/user.service.js'
import validEmail from '../utils/validEmail.js'

export default class UserMiddleware {
  static async validNewAccount (req, res, next) {
    const { name, password, trueName, email } = req.body
    if (!name || !password || !trueName || !email) return res.status(400).send({ message: 'invalid form' })
    if (!validEmail(email)) return res.status(400).send({ message: 'invalid email' })
    try {
      const hasRegistered = {}
      const userName = await UserService.getUserByLogin(name)
      const userEmail = await UserService.getUserByEmail(email)
      if (userName.length) hasRegistered.name = 'Login em uso.'
      if (userEmail.length) hasRegistered.email = 'E-mail em uso.'
      if (Object.entries(hasRegistered).length) return res.status(400).send(hasRegistered)
      next()
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}