import mongoose from 'mongoose'

export default class Mongo {
  static async connect () {
    try {
      await mongoose.connect(
        `mongodb+srv://cassiocaruzo:${process.env.MONGO_PASSWD}@cluster0.hrjwqmm.mongodb.net/?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      )
      console.log("mongo connection success")
    } catch (error) {
      console.log(error)
    }
  }
}