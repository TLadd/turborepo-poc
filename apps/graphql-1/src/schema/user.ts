import gql from "graphql-tag";
import { Resolvers } from "../__generated__/resolvers-types";

export const typeDefs = gql`
  extend type Query {
    users: [User!]
  }
  type User @key(fields: "id") {
    id: ID!
    name: String
  }
`;

export const resolvers: Resolvers = {
  Query: {
    users(_parent, _args, { prisma }) {
      return prisma.user.findMany();
    },
  },
};

const documentNode = { typeDefs, resolvers };

export default documentNode;
