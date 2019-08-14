import bcrypt from 'bcrypt'
import jwt from '../../../services/jwt.services';

async function login(root, args, context) {

  const user = await context.prisma.user( { email: args.email } )

  if (!user) {
    throw new Error('No user with that email')
  }

  const valid = await bcrypt.compare(args.password, user.password);

  if (!valid) {
    throw new Error('Incorrect password')
  }

  return jwt(user);
}

export default login