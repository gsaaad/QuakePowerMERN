import { gql } from "@apollo/client";

export const QUERY_EARTHQUAKES = gql`
  query earthquakes($username: String) {
    earthquakes(username: $username) {
      _id
      username
      Date
      Depth
      Magnitude
      Latitude
      Longitude
      Region
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;
