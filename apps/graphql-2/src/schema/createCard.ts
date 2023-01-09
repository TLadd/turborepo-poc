import { encodeGlobalID, resolveOffsetConnection } from "@pothos/plugin-relay";
import { builder } from "../builder";
import db from "../db";

const RecipeCard = builder.prismaObject("CreateCard", {
  name: "RecipeCard",
  fields: (t) => ({
    id: t.globalID({
      resolve: (parent) => {
        return encodeGlobalID("RecipeCard", parent.id);
      },
    }),
    dbId: t.exposeString("id"),
    name: t.exposeString("name"),
    template: t.exposeString("template"),
    siteId: t.exposeString("siteId"),
  }),
});

builder.asEntity(RecipeCard, {
  key: builder.selection<{ id: string }>("id"),
  resolveReference: ({ id }) => db.createCard.findUnique({ where: { id } }),
});

const CreateRecipeCardInput = builder.inputType("CreateRecipeCardInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    template: t.string({ required: true }),
    siteId: t.globalID({ required: true }),
  }),
});

const RecipeCardEdge = builder.edgeObject({
  name: "RecipeCardEdge",
  type: RecipeCard,
});

builder.mutationField("addCreateCard", (t) => {
  return t.field({
    type: RecipeCardEdge,
    args: {
      data: t.arg({ type: CreateRecipeCardInput, required: true }),
    },
    async resolve(_root, args) {
      const recipeCard = await db.createCard.create({
        data: {
          ...args.data,
          siteId: args.data.siteId.id,
        },
      });
      return {
        cursor: "",
        node: recipeCard,
      };
    },
  });
});

builder.queryField("recipeCards", (t) =>
  t.connection({
    type: RecipeCard,
    resolve: async (_root, args) => {
      return resolveOffsetConnection({ args }, ({ limit, offset }) => {
        return db.createCard.findMany({
          take: limit,
          skip: offset,
          orderBy: { createdAt: "desc" },
        });
      });
    },
  })
);
