import resolvers from './graphql/resolvers'
import typeDefs from './graphql/schema'
import { prisma } from './generated/prisma-client'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import AuthDirective from './graphql/directives/AuthDirective'
import IsAuthDirective from './graphql/directives/IsAuthDirective';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
    authorized: AuthDirective,
    authenticated: AuthDirective,
    isAuth: IsAuthDirective,
  },
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    return {
      prisma,
      token
    }
  }
})

const app = express()
app.use(cors())

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
)

