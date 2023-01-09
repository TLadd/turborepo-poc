import { buildSubgraphSchema } from "@apollo/subgraph";
import foo from "./foo";
import bar from "./bar";
import user from "./user";

export function generateSubgraphSchema() {
  return buildSubgraphSchema([foo, bar, user]);
}
