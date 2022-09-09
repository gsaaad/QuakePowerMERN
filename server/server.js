const express = require("express");
// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const dbConnection = require("./config/connection");
const { authMiddleware } = require("./utils/authenticateUser");

require("dotenv").config();

const PORT = process.env.PORT || 3001;
// create new Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create new instance of apollo sercer
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our apollo server with the express application as middleware
  server.applyMiddleware({ app });
};

// server up statis assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

dbConnection.on("error", console.error.bind(console, "connection error!"));
dbConnection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    // log where we can go (test GQL API)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// Call async function to start server
startApolloServer(typeDefs, resolvers);
