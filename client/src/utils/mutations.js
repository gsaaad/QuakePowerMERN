import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_EARTHQUAKE = gql`
  mutation addEarthquake(
    $earthquakeDate: String!
    $earthquakeDepth: String!
    $earthquakeMagnitude: String!
    $earthquakeLatitude: String!
    $earthquakeLongitude: String!
    $earthquakeRegion: String!
  ) {
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
    }
  }
`;
