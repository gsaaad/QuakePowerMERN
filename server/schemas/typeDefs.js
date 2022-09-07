// import GQL
const { gql } = require("apollo-server-express");

// create our typeDefs

// const typeDefs = gql``;
const typeDefs = gql`
  scalar Date

  type Earthquake {
    username: String
    Date: Date!
    Latitude: Float
    Longitude: Float
    Magnitude: Float
    Depth: Int
    Region: String
    reactionCount: Int
  }

  type Query {
    earthquakes: [Earthquake]
  }
`;

// export typeDefs

module.exports = typeDefs;
