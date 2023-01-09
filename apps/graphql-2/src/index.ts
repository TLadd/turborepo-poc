import { ApolloServer } from "@apollo/server";
import { schema } from "./schema";
import { startStandaloneServer } from "@apollo/server/standalone";

async function start() {
  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

start();
