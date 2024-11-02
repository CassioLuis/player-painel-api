import jwt from 'jsonwebtoken'

export default class Token {
  static generate (id, expiresIn) {
    return jwt.sign({ id }, process.env.SECRET_JWT, expiresIn)
  }
}