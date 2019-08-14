const getUsers = (root, args, context) => {
  
  return context.prisma.users()
}

export default getUsers