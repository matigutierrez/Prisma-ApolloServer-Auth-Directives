import { gql } from 'apollo-server-express'

const typeDefs = gql`

  directive @auth( requires: [Role] = ADMIN, ) on OBJECT | FIELD_DEFINITION
  directive @isAuth on FIELD_DEFINITION
  directive @constraint(pattern: String, length: Int) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION
  
  enum Role {
    ADMIN
    REVIEWER
    USER
  }

  type Query {
    getUsers: [User] @auth(requires: [USER, ADMIN])
  }

  input Login {
    email: String! @constraint(pattern: "^[0-9a-zA-Z]*$", length:50)
    password: String! 
  }

  type Mutation {
    login(input: Login): String
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