import { AuthenticationError } from "apollo-server-express"
import jwt from 'jsonwebtoken';
var secret = 'btspemfa'
import moment from 'moment'

const getUser = token => {
  
  if (!token) throw new AuthenticationError('Token is not valid');

  const user = jwt.decode(token, secret);

  if(user.exp <= moment().unix()) throw new AuthorizationError('Token Expired');
  
  return user;
}

export default getUser