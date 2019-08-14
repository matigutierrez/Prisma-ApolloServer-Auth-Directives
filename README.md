# Prisma-ApolloServer-Auth-Directives
Server GraphQl with Apollo Server Express and Prisma

## Getting Started

### Prerequisites

Install NodeJS --> [NodeJS](https://nodejs.org/es/)

Install Docker --> [Docker](https://www.docker.com/)

Install prisma globally
```
npm install -g prisma
```

### Installing

cd in the project directory.

```
docker-compose up -d   // start prisma and database

npm install              // install dependencies

prisma deploy          // run migrations

prisma generate        // generate lib prisma
```

### Run

Start server
```
npm start
```

### Open
Open in [http://localhost:4000/graphql](http://localhost:4000/graphql) and database [http://localhost:4466/_admin](http://localhost:4466/_admin)
```javascript
  // mutation Login
  mutation {
    login(email: "ignacio", password: "1234")
  }

  //mutation create user
  mutation {
    createUser(email: "ignacio", password: "1234", role: USER) {
      id
    }
  }

  //query get users
  query {
    getUsers {
      email
      role
    }
  }

  //validated with user roles
  type Query {
    getUsers: [User] @auth(requires: [USER, ADMIN])
  }
```