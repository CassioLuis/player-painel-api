export default class UserController {

  static async login (req, res) {
    try {
      return res.status(200).send()
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}