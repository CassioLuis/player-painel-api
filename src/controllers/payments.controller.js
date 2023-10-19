import axios from 'axios'
import PaymentsService from '../services/payments.service.js'

export default class Payments {

  static async create (req, res) {
    try {
      const { body, body: { userId } } = req

      delete body.userId
      delete body.userName

      const response = await axios.post(process.env.API_MERCADO_PAGO, body, {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
      })

      if (response) {
        const { id, date_created, payment_method, status, transaction_amount, point_of_interaction } = response.data

        const payload = {
          orderId: id,
          dateCreated: date_created,
          paymentMethod: payment_method.id,
          mysqlUserId: userId,
          transactionAmount: transaction_amount,
          qrCode: point_of_interaction.transaction_data.qr_code_base64,
          status
        }

        await PaymentsService.create(payload)

        res.status(200).json(payload)
      }
    }
    catch (error) {
      res.status(500).send('erro mercado pago')
    }
  }

  static async getAllByUser (req, res) {
    try {
      const { userId } = req.body
      const response = await PaymentsService.getAllByUser(userId)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}