"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Difficulty",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Category",
    embedded: false
  },
  {
    name: "IncidenceType",
    embedded: false
  },
  {
    name: "Gravity",
    embedded: false
  },
  {
    name: "City",
    embedded: false
  },
  {
    name: "Street",
    embedded: false
  },
  {
    name: "Incidence",
    embedded: false
  },
  {
    name: "EstablishmentType",
    embedded: false
  },
  {
    name: "Establishment",
    embedded: false
  },
  {
    name: "Assessment",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://192.168.99.100:4466`
});
exports.prisma = new exports.Prisma();
