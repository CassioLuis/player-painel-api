import Mysql from '../infra/mysql.js'

export default class User {

  static getUsers = async () => {
    const connection = await Mysql.connect()
    try {
      return await connection.query('select * from users')
    } catch (error) {
      console.log(error)
    } finally {
      connection.release()
    }
  }

  static getUserById = async (id) => {
    const connection = await Mysql.connect()
    try {
      const [data] = await connection.query('select * from users where ID = ?', [id])
      return data
    } catch (error) {
      console.log(error)
    } finally {
      connection.release()
    }
  }

  static getUserByLogin = async (login) => {
    const connection = await Mysql.connect()
    try {
      const [data] = await connection.query('select * from users where name = ?', [login])
      return data
    } catch (error) {
      console.log(error)
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
      console.log(error)
    } finally {
      connection.release()
    }
  }

  static addUser = async ({ name, password, trueName, email }) => {
    const connection = await Mysql.connect()
    try {
      await connection.query(`
        call adduser(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      `, [name, password, '', '', trueName, '', email, '', '', '', '', '', '', 0, '', '', '']
      )
      return
    } catch (error) {
      console.log(error)
    } finally {
      connection.release()
    }
  }

  static changePass = async (login, newPass) => {
    const connection = await Mysql.connect()
    try {
      await connection.query('call changePasswd(?, ?)', [login, newPass])
      return
    } catch (error) {
      console.log(error)
    } finally {
      connection.release()
    }
  }
}