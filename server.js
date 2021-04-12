require('dotenv').config();
import {typeDefs, resolvers} from './schema';
import {getUser} from "./users/users.utils";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import logger from "morgan";
import {graphqlUploadExpress} from 'graphql-upload';
import PubSub from './pubsub';
import http from "http";

console.log(PubSub)

const PORT = process.env.PORT;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async (ctx) => {
    if(ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    }
    else {
      const {
        connection : {context},
      } = ctx;
      return {
        loggedInUser : context.loggedInUser,
      }
    }
  },
  uploads:false,
  subscriptions : {
    onConnect : async ({token}) => {
      if(!token) {
        throw new Error("You cant listen.")
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser
      }
    }
  },
});

const app = express();
app.use(logger("tiny"));
app.use(graphqlUploadExpress());
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
// app.use("/static", express.static("upload"));
server.installSubscriptionHandlers(httpServer);
httpServer.listen({port : PORT}, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});