"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/schema/index.ts
var import_subgraph = require("@apollo/subgraph");

// src/schema/foo.ts
var import_graphql_tag = __toESM(require("graphql-tag"));
var typeDefs = import_graphql_tag.default`
  extend type Query {
    foos: [Foo]
  }
  type Foo @key(fields: "id") {
    id: ID!
    name: String
  }
`;
var resolvers = {
  Query: {
    foos(_parent, _args, { dataSources }) {
      return dataSources.FooAPI.getAllFoo();
    }
  },
  Foo: {
    __resolveReference(foo, { dataSources }) {
      return dataSources.FooAPI.getFoo(foo.id);
    }
  }
};
var documentNode = { typeDefs, resolvers };
var foo_default = documentNode;

// src/schema/bar.ts
var import_graphql_tag2 = __toESM(require("graphql-tag"));
var typeDefs2 = import_graphql_tag2.default`
  type Query {
    bar(id: ID!): Bar
  }

  type Bar {
    name: String
    appendedName: String
  }
`;
var resolvers2 = {
  Query: {
    async bar(_parent, { id }, { dataSources }) {
      return { name: "Bar" };
    }
  },
  Bar: {
    appendedName(parent, _args, _context) {
      return `${parent.name} - appended`;
    }
  }
};
var documentNode2 = { typeDefs: typeDefs2, resolvers: resolvers2 };
var bar_default = documentNode2;

// src/schema/user.ts
var import_graphql_tag3 = __toESM(require("graphql-tag"));
var typeDefs3 = import_graphql_tag3.default`
  extend type Query {
    users: [User!]
  }
  type User @key(fields: "id") {
    id: ID!
    name: String
  }
`;
var resolvers3 = {
  Query: {
    users(_parent, _args, { prisma: prisma2 }) {
      return prisma2.user.findMany();
    }
  }
};
var documentNode3 = { typeDefs: typeDefs3, resolvers: resolvers3 };
var user_default = documentNode3;

// src/schema/index.ts
function generateSubgraphSchema() {
  return (0, import_subgraph.buildSubgraphSchema)([foo_default, bar_default, user_default]);
}

// src/index.ts
var import_apollo_server = require("apollo-server");

// src/datasources/FooAPI.ts
var import_apollo_datasource = require("apollo-datasource");
var FooAPI = class extends import_apollo_datasource.DataSource {
  getAllFoo() {
    return foos;
  }
  getFoo(id) {
    return foos.find((f) => f.id === id);
  }
};
var foos = [{ id: "1", name: "Foo" }];

// src/index.ts
var import_prisma_db1 = require("prisma-db1");
var prisma = new import_prisma_db1.PrismaClient();
async function main() {
  let schema = generateSubgraphSchema();
  const FooAPI2 = new FooAPI();
  const server = new import_apollo_server.ApolloServer({
    schema,
    dataSources: () => ({ FooAPI: FooAPI2 }),
    context: ({ req }) => {
      var _a;
      return {
        authorization: (_a = req == null ? void 0 : req.headers["authorization"]) != null ? _a : "",
        prisma
      };
    }
  });
  await server.listen({ port: 4e3 }).then(({ url }) => console.log(`Subgraph ready at: ${url}`));
}
main();
