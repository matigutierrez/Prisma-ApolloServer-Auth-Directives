const { SchemaDirectiveVisitor, AuthenticationError } = require("apollo-server-express");
import getUser from '../../services/getUser'
import { defaultFieldResolver } from "graphql"

class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (...args) => {

      const result = await resolve.apply(this, args);
      const context = args[2];

      const user = await getUser(context.token)

      if (!user) {

        throw new Error("not authorized");
      } else {

        return result
      }
      
    };
  }
}

export default IsAuthDirective