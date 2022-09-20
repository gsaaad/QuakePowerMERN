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
    $Date: String!
    $Latitude: String!
    $Longitude: String!
    $Depth: String!
    $Magnitude: String!
    $Region: String!
  ) {
    addEarthquake(
      Date: $Date
      Latitude: $Latitude
      Longitude: $Longitude
      Depth: $Depth
      Magnitude: $Magnitude
      Region: $Region
    ) {
      _id
      Date
      Latitude
      Longitide
      Depth
      Magnitude
      Region
      reactionCount
      reaction {
        _id
      }
    }
  }
`;
