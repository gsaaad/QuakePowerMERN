// import GQL
const { gql } = require("apollo-server-express");

// create our typeDefs
// !basic typeDefs
// const typeDefs = gql``;
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

// export typeDefs

module.exports = typeDefs;
