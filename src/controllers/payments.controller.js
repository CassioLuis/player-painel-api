export default class Payments {

  static async status (req, res) {
    try {
      res.send(req.body)
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  }
}