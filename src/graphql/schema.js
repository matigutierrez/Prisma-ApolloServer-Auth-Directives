import { gql } from 'apollo-server-express'

const typeDefs = gql`

  directive @auth( requires: [Role] = ADMIN, ) on OBJECT | FIELD_DEFINITION
  directive @isAuth on FIELD_DEFINITION

  enum Role {
    ADMIN
    REVIEWER
    USER
  }

  type Query {
    getUsers: [User] @auth(requires: [USER, ADMIN])
  }

  type Mutation {
    login(email: String!, password: String!): String 
    createUser(email: String!, password: String!, role: Role!): User 
  }

  type User {
    id: ID!
    email: String!
    password: String! @auth(requires: ADMIN)
    role: Role!
  }
`

export default typeDefs