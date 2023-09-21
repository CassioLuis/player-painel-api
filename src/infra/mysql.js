// import process from 'node:process'
// import dotenv from 'dotenv'
// dotenv.config()
import mysql from 'mysql2/promise'

const connection = {
  host: '104.251.216.42',
  user: 'player_panel',
  password: 'root',
  database: 'pw'
}

export default class Mysql {
  static async connect () {
    try {
      return await mysql.createPool(connection).getConnection()
    } catch (error) {
      return { error }
    }
  }
}

