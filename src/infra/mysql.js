import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true, // Espera por conexões livres quando a pool está cheia
  connectionLimit: 50, // Número máximo de conexões na pool
  queueLimit: 0 // Limite da fila de conexões pendentes (0 significa ilimitado)
}

const pool = mysql.createPool(connection)

export default class Mysql {

  static async connect () {
    try {
      return await pool.getConnection()
    } catch (error) {
      console.log(error)
    }
  }
}
