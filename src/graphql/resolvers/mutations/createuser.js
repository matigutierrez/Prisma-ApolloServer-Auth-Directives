import bcrypt from 'bcrypt'

async function createUser(root, args, context) {
  
  return context.prisma.createUser({ 
    email: args.email,
    password: await bcrypt.hash(args.password, 12),
    role: args.role
  })
}

export default createUser