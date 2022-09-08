// import GQL
const { gql } = require("apollo-server-express");
// create our typeDefs

// const typeDefs = gql``;
const typeDefs = gql`
  scalar DateScalar

  type User {
    _id: ID
    username: String
    email: String
    earthquakes: [Earthquake]
  }

  type Earthquake {
    _id: ID
    username: String
    Date: DateScalar
    Latitude: Float
    Longitude: Float
    Magnitude: Float
    Depth: Int
    Region: String
    reactionCount: Int
    reactions: [Reaction]
  }
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    earthquakes(username: String): [Earthquake]
    earthquake(_id: ID!): Earthquake
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

// export typeDefs

module.exports = typeDefs;
