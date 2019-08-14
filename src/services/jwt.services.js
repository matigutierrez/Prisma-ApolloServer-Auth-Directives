import jwt from 'jsonwebtoken';
import moment from 'moment';
var secret = 'btspemfa'

export default async function createToken(user) {
  var payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    iat: await moment().unix(),
    exp: await moment().add(30, 'days').unix()
  }

  return jwt.sign(payload, secret);
}