import { SchemaDirectiveVisitor } from 'apollo-server-express'
import {
  GraphQLScalarType,
  GraphQLNonNull,
  isWrappingType,
  isNamedType } from 'graphql'

class ConstraintDirective extends SchemaDirectiveVisitor {
  
  visitInputFieldDefinition(field) {
    this.wrapType(field);
  }

  visitFieldDefinition(field) {
    this.wrapType(field);
  }

  wrapType(field) {

    if ( field.type instanceof GraphQLNonNull && field.type.ofType instanceof GraphQLScalarType ) {

      field.type = new GraphQLNonNull(new ConstraintType(field.type.ofType, this.args));
    } else if (field.type instanceof GraphQLScalarType) {

      field.type = new ConstraintType(field.type, this.args);
    } else {
      
      throw new Error(`Not a scalar type: ${field.type}`);
    }

    const typeMap = this.schema.getTypeMap();
    let type = field.type;

    if (isWrappingType(type)) {
      type = type.ofType;
    }

    if (isNamedType(type) && !typeMap[type.name]) {
      typeMap[type.name] = type;
    }
  }
}

class ConstraintType extends GraphQLScalarType {
  constructor(type, args) {
    super({
      name: `Constraint`,

      serialize(value) {
        value = type.serialize(value);

        validate(args, value)
        return value
      },

      parseValue(value) {

        validate(args, value)

        return type.parseValue(value);
      },

      parseLiteral(ast) {

        const value = type.parseLiteral(ast)

        validate(args, value)

        return value
      },
    });
  }
}

function validate (args, value) {
  const regex = new RegExp(args.pattern)

  if (args.pattern && !regex.test(value)) {
    throw new Error('error formato')
  }
}


export default ConstraintDirective