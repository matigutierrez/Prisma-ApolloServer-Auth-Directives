import bcrypt from 'bcrypt'

async function createUser(root, args, context) {
  
  return context.prisma.createUser({ 
    email: args.input.email,
    password: await bcrypt.hash(args.input.password, 12),
    role: args.input.role
  })
}

export default createUser