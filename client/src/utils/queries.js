import { gql } from "@apollo/client";

export const QUERY_EARTHQUAKES = gql`
  query earthquake($id: ID!) {
    earthquake(_id: $id) {
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
