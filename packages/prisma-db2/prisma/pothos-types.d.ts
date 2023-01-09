/* eslint-disable */
import type { Prisma, CreateCard } from "./client";
export default interface PrismaTypes {
    CreateCard: {
        Name: "CreateCard";
        Shape: CreateCard;
        Include: never;
        Select: Prisma.CreateCardSelect;
        OrderBy: Prisma.CreateCardOrderByWithRelationInput;
        WhereUnique: Prisma.CreateCardWhereUniqueInput;
        Where: Prisma.CreateCardWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}