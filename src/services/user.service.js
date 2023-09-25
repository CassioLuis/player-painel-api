import Mysql from '../infra/mysql.js'
import toBase64 from '../utils/passEncode.js'

export default class User {

  static getUsers = async () => {
    const connection = await Mysql.connect()
    try {
      const [data] = await connection.query('select * from users')
      return data
    } catch (error) {
      return { error }
    } finally {
      connection.release()
    }
  }
  
  static getUserByLogin = async (login) => {
    const connection = await Mysql.connect()
    try {
      const [ data ] = await connection.query('select * from users where name = ?', [ login ])
      return data
    } catch (error) {
      return { error }
    } finally {
      connection.release()
    }
  }

  static getUserByEmail = async (email) => {
    const connection = await Mysql.connect()
    try {
      const [data] = await connection.query('select * from users where email = ?', [email])
      return data
    } catch (error) {
      return { error }
    } finally {
      connection.release()
    }
  }

  static addUser = async ({ name, password, trueName, email }) => {
    const connection = await Mysql.connect()
    try {
      await connection.query(`
        call adduser(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `, [name, password, '', '', trueName, '', email, '', '', '', '', '', '', '', '', '', '']
      )
      return 'user successfully registered'
    } catch (error) {
      return { error }
    } finally {
      connection.release()
    }
  }

  static changePass = async (login, newPass) => {
    const connection = await Mysql.connect()
    try {
      await connection.query('call changePasswd(?, ?)', [login, toBase64(login+newPass)])
      return 'password changed successfully'
    } catch (e) {
      throw new Error(e)
    } finally {
      connection.release()
    }
  }
}