// import process from 'node:process'
// import dotenv from 'dotenv'
// dotenv.config()
import mysql from 'mysql2/promise'

const connection = {
  host: '104.251.216.42',
  user: 'player_panel',
  password: 'root',
  database: 'pw',
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
      return { error }
    }
  }
}
