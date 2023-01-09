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

// src/index.ts
var import_server = require("@apollo/server");

// src/builder.ts
var import_plugin_directives = __toESM(require("@pothos/plugin-directives"));
var import_plugin_federation = __toESM(require("@pothos/plugin-federation"));
var import_core = __toESM(require("@pothos/core"));
var import_plugin_prisma = __toESM(require("@pothos/plugin-prisma"));
var import_plugin_relay = __toESM(require("@pothos/plugin-relay"));

// src/db.ts
var import_prisma_db2 = require("prisma-db2");
var prisma = new import_prisma_db2.PrismaClient();
var db_default = prisma;

// src/builder.ts
var builder = new import_core.default({
  plugins: [import_plugin_directives.default, import_plugin_prisma.default, import_plugin_relay.default, import_plugin_federation.default],
  defaultFieldNullability: true,
  prisma: {
    client: db_default
  },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String"
  }
});

// src/schema/baseTypes.ts
builder.mutationType();
builder.queryType();

// src/schema/createCard.ts
var import_plugin_relay2 = require("@pothos/plugin-relay");
var RecipeCard = builder.prismaObject("CreateCard", {
  name: "RecipeCard",
  fields: (t) => ({
    id: t.globalID({
      resolve: (parent) => {
        return (0, import_plugin_relay2.encodeGlobalID)("RecipeCard", parent.id);
      }
    }),
    dbId: t.exposeString("id"),
    name: t.exposeString("name"),
    template: t.exposeString("template"),
    siteId: t.exposeString("siteId")
  })
});
builder.asEntity(RecipeCard, {
  key: builder.selection("id"),
  resolveReference: ({ id }) => db_default.createCard.findUnique({ where: { id } })
});
var CreateRecipeCardInput = builder.inputType("CreateRecipeCardInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    template: t.string({ required: true }),
    siteId: t.globalID({ required: true })
  })
});
var RecipeCardEdge = builder.edgeObject({
  name: "RecipeCardEdge",
  type: RecipeCard
});
builder.mutationField("addCreateCard", (t) => {
  return t.field({
    type: RecipeCardEdge,
    args: {
      data: t.arg({ type: CreateRecipeCardInput, required: true })
    },
    async resolve(_root, args) {
      const recipeCard = await db_default.createCard.create({
        data: {
          ...args.data,
          siteId: args.data.siteId.id
        }
      });
      return {
        cursor: "",
        node: recipeCard
      };
    }
  });
});
builder.queryField(
  "recipeCards",
  (t) => t.connection({
    type: RecipeCard,
    resolve: async (_root, args) => {
      return (0, import_plugin_relay2.resolveOffsetConnection)({ args }, ({ limit, offset }) => {
        return db_default.createCard.findMany({
          take: limit,
          skip: offset,
          orderBy: { createdAt: "desc" }
        });
      });
    }
  })
);

// src/schema/index.ts
var schema = builder.toSchema();

// src/index.ts
var import_standalone = require("@apollo/server/standalone");
async function start() {
  const server = new import_server.ApolloServer({
    schema
  });
  const { url } = await (0, import_standalone.startStandaloneServer)(server, {
    listen: { port: 4001 }
  });
  console.log(`\u{1F680}  Server ready at: ${url}`);
}
start();
