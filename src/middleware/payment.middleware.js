import Http from '../modules/http.js'
import Payments from '../services/payments.service.js'

export default class AuthMiddleware {

  static async handleWebHookResponse (req, res, next) {
    const { body: { action, id } } = req
    if (action === 'payment.created') return res.status(400).json({ message: 'payment action created' })

    try {
      const payment = await Http.get(`${process.env.API_MERCADO_PAGO}payments/${id}`)
      if (!payment) return res.status(404).json({ message: 'payment not found' })

      const order = await Payments.getOrderById(payment.id)
      if (!order) return res.status(404).json({ message: 'order not found' })
      if (order.status === 'approved') return res.status(400).json({ message: 'payment already approved' })

      req.order = order
      req.payment = payment
      next()
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  }
}