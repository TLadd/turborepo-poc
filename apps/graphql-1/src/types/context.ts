import { PrismaClient } from "prisma-db1";
import { FooAPI } from "../datasources/FooAPI";

export interface Context {
  authorization?: string;
  dataSources: {
    FooAPI: FooAPI;
  };
  prisma: PrismaClient;
}
