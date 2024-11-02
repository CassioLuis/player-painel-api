import AuthService from '../services/auth.service.js'
import UserService from '../services/user.service.js'
import jwt from 'jsonwebtoken'

export default class AuthMiddleware {
  static async validLogin (req, res, next) {
    const { name, password } = req.body
    if (!name || !password) return res.status(400).send({ message: 'invalid user' })
    try {
      const [user] = await AuthService.login(name, password)
      if (!user) return res.status(404).send({ message: 'user not found' })
      req.id = user.ID
      next()
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }

  static async validToken (req, res, next) {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(401).send({ message: 'Invalid token' })
      const [schema, token] = authorization.split(' ')
      if (!schema || !token) return res.status(401).send({ message: 'Invalid token' })
      if (schema !== 'Bearer') return res.status(401).send({ message: 'Invalid token' })
      const decoded = jwt.verify(token, process.env.SECRET_JWT, (error, decoded) => decoded)
      if (!decoded) return res.status(401).send({ message: 'Invalid token' })
      const [user] = await UserService.getUserById(decoded.id)
      if (!user) return res.status(401).send({ message: 'Invalid token' })
      req.body.userName = user.name
      req.body.userId = user.ID
      next()
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
}