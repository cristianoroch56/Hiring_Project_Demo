import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import merge from "lodash/merge";

import MessagesSchema from "../../api/messages/Message.graphql";
import MessagesResolvers from "../../api/messages/resolvers";

import UsersSchema from "../../api/users/User.graphql";
import UsersResolvers from "../../api/users/resolvers";

const typeDefs = [MessagesSchema, UsersSchema];

const resolvers = merge(MessagesResolvers, UsersResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  cors: true
});