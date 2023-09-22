import UseService from '../services/user.service.js'

export default class UserMiddleware {
  static validBody (req, res, next) {
    const { name, password, truename, email } = req.body
    if (!name || !password || !truename || !email) return res.status().send({ message: 'invalid form' })
    next()
  }
  static validLogin (req, res, next) {
    req
  }
  static validEmail () {

  }
  static passWord () {

  }
}