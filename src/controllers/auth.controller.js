import User from '../services/user.service.js'
import Token from '../modules/jwt.js'
import { transport, readHtmlTemplate } from '../modules/mailer.js'

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
      if (!user) res.status(404).send({ message: 'user not found' })
      const forgotToken = Token.generate(user.ID, { expiresIn: 10000 })
      // const template = await readHtmlTemplate()
      const destination = {
        to: email,
        from: 'cassiocaruzo@gmail.com',
        template: 'auth/forgot_password',
        // html: template,
        context: { forgotToken }
      }
      transport.sendMail(destination, (error) => {
        console.log(error)
        if (error) return res.status(400).send({ error: 'Cannot send forgot password email' })
        return res.send()
      })
      // res.json(forgotToken)
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}