import User from '../services/user.service.js'
import Token from '../modules/jwt.js'
import { transport } from '../modules/mailer.js'

export default class UserController {

  static async login (req, res) {
    try {
      const { id } = req
      const token = Token.generate(id, { expiresIn: 86400 })
      return res.status(200).send({ token })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }

  static async forgotPass (req, res) {
    const { email } = req.body
    try {
      const [user] = await User.getUserByEmail(email)
      if (!user) return res.status(404).send({ message: 'user not found' })
      const forgotToken = Token.generate(user.ID, { expiresIn: 500 })
      const destination = {
        to: email,
        from: 'pwblackstar@suporte.com',
        template: 'forgot_password',
        context: { forgotToken },
        subject: 'PW Blackstar - Recuperação'
      }
      transport.sendMail(destination, (error) => {
        if (error) return res.status(400).send({ error: 'Cannot send forgot password email' })
        return res.status(200).json({ token: forgotToken })
      })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}