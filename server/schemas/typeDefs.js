// import GQL
const { gql } = require("apollo-server-express");
// create our typeDefs

// const typeDefs = gql``;
const typeDefs = gql`
  scalar DateScalar

  type Earthquake {
    username: String
    Date: DateScalar
    Latitude: Float
    Longitude: Float
    Magnitude: Float
    Depth: Int
    Region: String
    reactionCount: Int
  }

  type Query {
    earthquakes(username: String): [Earthquake]
  }
`;

// export typeDefs

module.exports = typeDefs;
