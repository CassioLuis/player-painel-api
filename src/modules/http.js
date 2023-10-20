import axios from 'axios'

const headers = {
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
}

export default class Http {
  static async get (rota) {
    try {
      const { data } = await axios.get(rota, { headers })
      return data
    } catch (error) {
      return { message: error }
    }
  }
  static async post (rota, body) {
    try {
      const { data } = await axios.post(rota, body, { headers })
      return data
    } catch (error) {
      return { message: error }
    }
  }
}