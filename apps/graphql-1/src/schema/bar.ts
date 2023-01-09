import gql from "graphql-tag";
import { Resolvers } from "../__generated__/resolvers-types";

export const typeDefs = gql`
  type Query {
    bar(id: ID!): Bar
  }

  type Bar {
    name: String
    appendedName: String
  }
`;

export const resolvers: Resolvers = {
  Query: {
    async bar(_parent, { id }, { dataSources }) {
      return { name: "Bar" };
    },
  },
  Bar: {
    appendedName(parent, _args, _context) {
      return `${parent.name} - appended`;
    },
  },
};

const documentNode = { typeDefs, resolvers };
export default documentNode;
