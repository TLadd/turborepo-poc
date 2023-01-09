import DirectivePlugin from "@pothos/plugin-directives";
import FederationPlugin from "@pothos/plugin-federation";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "prisma-db2/prisma/pothos-types";
import db from "./db";

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  DefaultFieldNullability: true;
}>({
  // If you are using other plugins, the federation plugin should be listed after plugins like auth that wrap resolvers
  plugins: [DirectivePlugin, PrismaPlugin, RelayPlugin, FederationPlugin],
  defaultFieldNullability: true,
  prisma: {
    client: db,
  },
  relayOptions: {
    clientMutationId: "omit",
    cursorType: "String",
  },
});
