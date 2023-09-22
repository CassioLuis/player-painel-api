import crypto from 'crypto'

export default function toBase64 (password) {
  return Buffer.from(crypto.createHash('md5').update(password).digest('hex'), 'hex').toString('base64')
}
