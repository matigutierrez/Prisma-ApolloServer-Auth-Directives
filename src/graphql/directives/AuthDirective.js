const { SchemaDirectiveVisitor } = require("apollo-server-express");
import getUser from '../../services/getUser'
import { defaultFieldResolver } from "graphql"

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }
  
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType) {
    
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async function (...args) {
        
        const requiredRole =
          field._requiredAuthRole ||
          objectType._requiredAuthRole;

        if (! requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        const user = await getUser(context.token);
        var auth = false;
        
        requiredRole.forEach(role => {
          
          if ((user.role == role )) {
            auth = true
          }
        })

        if(auth) {

          return resolve.apply(this, args);
        } else {

          throw new Error("not authorized");
        }
      };
    });
  }
}

export default AuthDirective
