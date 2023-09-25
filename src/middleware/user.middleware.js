import UserService from '../services/user.service.js'
import validEmail from '../utils/validEmail.js'

export default class UserMiddleware {
  static async validNewAccount (req, res, next) {
    const { name, password, trueName, email } = req.body
    if (!name || !password || !trueName || !email) return res.status(400).send({ message: 'invalid form' })
    if (!validEmail(email)) return res.status(400).send({ message: 'invalid email' })
    try {
      let hasRegistered = {}
      // const user = await UserService.getUserByLogin(name)
      // const email = await UserService.getUserByEmail(email)
      if (await UserService.getUserByLogin(name)) hasRegistered = { ...hasRegistered, name: 'Login em uso.' }
      if (await UserService.getUserByEmail(email)) hasRegistered = { ...hasRegistered, email: 'E-mail em uso.' }
      if (Object.entries(hasRegistered).length) return res.status(400).send(hasRegistered)
      // if (user.length) return res.status(400).send({ field: 'login', message: 'Login em uso.' })
      // user = await UserService.getUserByEmail(email)
      // if (user.length) return res.status(400).send({ field: 'email', message: 'E-mail em uso.' })
      next()
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}