// npm i apollo-client graphql-server-express express graphql graphql-tools body-parser

import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";

import CustomerSchema from "../imports/api/customers/CustomerTypes.graphql"

import CustomersResolvers from "../imports/api/customers/resolvers";

import merge from "lodash/merge";

// hellooo

const typeDefs = [ CustomerSchema ];

const resolvers = merge( CustomersResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });
