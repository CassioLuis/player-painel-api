import mongoose from "mongoose"

const PaymentsSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true,
  },
  mysqlUserId: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  transactionAmount: {
    type: Number,
    required: true
  }
})

const Payment = mongoose.model('Payment', PaymentsSchema) // Correção aqui

export default Payment