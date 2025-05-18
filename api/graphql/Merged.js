import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { UserResolver } from "./Resolvers/UserResolver.js";
import { AuthResolver } from "./Resolvers/AuthResolver.js";
import { MessageResolver } from "./Resolvers/MessageResolver.js";

import { AuthTypeDef } from "./TypeDefs/AuthTypeDef.js";
import { UserTypeDef } from "./TypeDefs/UserTypeDef.js";
import { MessageTypeDef } from "./TypeDefs/MessageTypeDef.js";

const typeDefs = [
    UserTypeDef,
    AuthTypeDef,
    MessageTypeDef
];

const resolvers = [
    UserResolver,
    AuthResolver,
    MessageResolver
];

export const mergedTypeDefs = mergeTypeDefs(typeDefs);

export const mergedResolvers = mergeResolvers(resolvers);