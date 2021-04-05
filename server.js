require('dotenv').config();
import {typeDefs, resolvers} from './schema';
import {getUser} from "./users/users.utils";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import logger from "morgan";

const PORT = process.env.PORT;

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const app = express();
// app.use(logger("tiny"));
server.applyMiddleware({ app });
// app.use("/static", express.static("upload"));
app.listen({port : PORT}, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});