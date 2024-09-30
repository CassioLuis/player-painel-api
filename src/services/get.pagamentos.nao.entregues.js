import Mysql from '../infra/mysql.js'

export default class Cash {

  static add = async (userId, cash) => {
    const connection = await Mysql.connect()
    try {
      await connection.query(`
        call usecash(?,?,?,?,?,?,?,@error);
      `, [userId, 1, 1, 1, 1, cash, 1]
      // userid, zoneid, sn, aid, point, cash, status
      )
    } catch (error) {
      console.log(error)
    } finally {
      connection.release()
    }
  }
}
