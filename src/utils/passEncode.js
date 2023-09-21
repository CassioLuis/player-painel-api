import cryptoJs from 'crypto-js'
import crypto from 'crypto'
import Mysql from '../infra/mysql.js'

export default function toBase64 (password) {
  return Buffer.from(crypto.createHash('md5').update(password).digest('hex'), 'hex').toString('base64')
}

function base64 (password) {
  const senhaMD5 = cryptoJs.MD5(password).toString();
  const senhaBase64 = btoa(senhaMD5);
  return senhaBase64;

  // const md5Hash = crypto.createHash('md5').update(password).digest('hex');
  // Codificar o MD5 em Base64
  // const senhaBase64 = Buffer.from(md5Hash, 'hex').toString('base64');
  // return senhaBase64;


  // const senhaBase64 = btoa(password);
  // return senhaBase64;
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
