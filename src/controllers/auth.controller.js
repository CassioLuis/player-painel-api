import User from '../services/user.service.js'
import Token from '../modules/jwt.js'
import { transport, image } from '../modules/mailer.js'

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
      const encodedString = forgotToken.replace(/\./g, "%20")
      // const url = `http://localhost:5173/alterar-senha/${encodedString}`
      const url = `https://v-dashboard-ten.vercel.app/alterar-senha/${encodedString}`
      const destination = {
        to: email,
        from: 'pwblackstar@suporte.com',
        template: 'forgot_password-2',
        context: { url },
        subject: 'PW Blackstar - Recuperar Senha',
        attachments: [
          {
            filename: 'image-6.png',
            path: image,
            cid: 'image-6'
          }
        ]
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