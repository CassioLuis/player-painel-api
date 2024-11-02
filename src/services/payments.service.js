import Payment from '../models/Payments.js'

export default class Payments {

  static async create (payment) {
    try {
      await Payment.create(payment)
    } catch (error) {
      console.log(error)
    }
  }

  static async getAllByUser (mysqlUserId) {
    try {
      const response = await Payment.find({ mysqlUserId })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  static async getOrderById (orderId) {
    try {
      const [order] = await Payment.find({ orderId })
      return order
    } catch (error) {
      console.log(error)
    }
  }

  static async updateOrder (order, orderNotification) {
    try {
      Object.assign(order, {
        status: orderNotification.status,
        dateLastUpdated: orderNotification.date_last_updated,
        transactionAmount: orderNotification.transaction_amount
      })
      await order.save()
      return
    } catch (error) {
      console.log(error)
    }
  }
}