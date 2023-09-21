import crypto from 'crypto'
import Mysql from '../infra/mysql.js'

export default function toBase64 (password) {
  return Buffer.from(crypto.createHash('md5').update(password).digest('hex'), 'hex').toString('base64')
}

const changePass = async (login, newPass) => {
  const connection = await Mysql.connect()
  try {
    await connection.query('call changePasswd(?, ?)', [login, toBase64(login+newPass)])
    return `password changed successfully - ${toBase64(login+newPass)}`
  } catch (e) {
    throw new Error(e)
  } finally {
    connection.release()
  }
}

// console.log(
//   base64('1')
// )
console.log(
  await changePass('teste2','1')
)
// Y6nw6nu5gFB5a2SehUgYRQ ==
//   xMpCOKC5I4INzFCab3WEmw ==
