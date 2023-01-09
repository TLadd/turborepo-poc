import { generateSubgraphSchema } from "./schema";
import { ApolloServer } from "apollo-server";
import { FooAPI } from "./datasources/FooAPI";
import { PrismaClient } from "prisma-db1";

const prisma = new PrismaClient();

async function main() {
  let schema = generateSubgraphSchema();
  const FooAPI2 = new FooAPI();

  const server = new ApolloServer({
    schema,
    dataSources: () => ({ FooAPI: FooAPI2 }),
    context: ({ req }) => {
      return {
        authorization: req?.headers["authorization"] ?? "",
        prisma,
      };
    },
    // cors: isProduction ? false : { origin: '*' },
  });

  await server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`Subgraph ready at: ${url}`));
}

main();
