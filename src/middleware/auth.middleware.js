import UserService from '../services/user.service.js'
import AuthService from '../services/auth.service.js'

export default class UserMiddleware {

  static async validLogin (req, res, next) {
    const { name, password } = req.body
    if (!name || !password) return res.status(400).send({ message: 'invalid user' })
    try {
      const [user] = await AuthService.login(name, password)
      if (!user) return res.status(404).send({ message: 'user not found' })
      const token = AuthService.token(user.ID)
      req.token = token
      next()
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}