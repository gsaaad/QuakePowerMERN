const express = require("express");
const dbConnection = require("./config/connection");
const path = require("path");

// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
// authenticate user
const { authMiddleware } = require("./utils/authenticateUser");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
// create new Apollo Server, use schema definitions, query resolvers, context is authorization
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
// app express
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create new instance of apollo sercer
const startApolloServer = async () => {
  await server.start();
  // integrate our apollo server with the express application as middleware
  server.applyMiddleware({ app });
};

// server up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

dbConnection.on("error", console.error.bind(console, "connection error!"));
dbConnection.once("open", () => {
  console.log("DB Connection good!");
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    // log where we can go (test GQL API)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// Call async function to start server
startApolloServer(typeDefs, resolvers);
