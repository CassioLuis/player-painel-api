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
}