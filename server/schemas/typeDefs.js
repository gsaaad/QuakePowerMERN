// import GQL
const { gql } = require("apollo-server-express");

// create our typeDefs

// const typeDefs = gql``;
const typeDefs = gql`
  type Earthquake {
    username: String
    Date: String
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
