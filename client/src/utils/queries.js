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
export const QUERY_EARTHQUAKE = gql`
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
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      earthquakes {
        _id
        username
        Date
        Latitude
        Longitude
        Magnitude
        Depth
        Region
        reactionCount
      }
    }
  }
`;
