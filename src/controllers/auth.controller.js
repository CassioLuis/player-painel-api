export default class UserController {

  static async login (req, res) {
    try {
      const token = req.token
      return res.status(200).send({ token })
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}