import Http from '../modules/http.js'
import Payments from '../services/payments.service.js'
import Cash from '../services/cash.service.js'
import Gold from '../utils/gold.js'

export default class PaymentsController {

  static async create (req, res) {
    try {
      const { body, body: { userId } } = req

      delete body.userId
      delete body.userName
      const response = await Http.post(`${process.env.API_MERCADO_PAGO}payments`, body)
      
      if (!response) return res.status(400).json({ message: 'mercado pago nao respondeu' })
      
      const { id, date_created, date_last_updated, payment_method, status, transaction_amount, point_of_interaction } = response

      const payload = {
        orderId: id,
        dateCreated: date_created,
        dateLastUpdated: date_last_updated,
        paymentMethod: payment_method.id,
        mysqlUserId: userId,
        status,
        transactionAmount: transaction_amount,
        goldAmount: Gold.calc(transaction_amount) / 100,
        qrCode: point_of_interaction.transaction_data.qr_code_base64
      }
      await Payments.create(payload)

      res.status(200).json(payload)
    }
    catch (error) {
      console.log(error)
      res.status(500).json({ message: error })
    }
  }

  static async getAllByUser (req, res) {
    try {
      const { userId } = req.body
      const response = await Payments.getAllByUser(userId)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).send(error)
    }
  }

  static async handleUpdateOrder (req, res) {
    try {
      const { order, payment: { status, date_last_updated, transaction_amount } } = req

      await Payments.updateOrder(order, { status, date_last_updated, transaction_amount })

      await Cash.add(order.mysqlUserId, Gold.calc(transaction_amount))

      res.status(200).json({ message: 'payment updated' })
    } catch (error) {
      res.status(500).json({ message: 'Internal error' })
    }
  }
}