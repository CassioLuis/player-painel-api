import Mysql from '../infra/mysql.js'
import toBase64 from '../utils/passEncode.js'
// import User from './user.service.js'

export default class User {

  static async login (name, password) {
    const connection = await Mysql.connect()
    try {
      const [data] = await connection.query('select * from users where name = ? and passwd = ?', [name, toBase64(name + password)])
      return data
    } catch (error) {
      console.log(error)
    } finally {
      connection.release()
    }
  }
}