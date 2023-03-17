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
    $username: String!
    $earthquakeDate: String!
    $Latitude: String!
    $Longitude: String!
    $Depth: String!
    $Magnitude: String!
    $Region: String!
  ) {
    addEarthquake(
      username: $username
      earthquakeDate: $earthquakeDate
      Depth: $Depth
      Latitude: $Latitude
      Longitude: $Longitude
      Magnitude: $Magnitude
      Region: $Region
    ) {
      _id
      username
      earthquakeDate
      Depth
      Latitude
      Longitude
      Magnitude
      Region
      reactionCount
      reactions {
        _id
      }
    }
  }
`;
export const ADD_REACTION = gql`
  mutation addReaction($earthquakeId: ID!, $reactionBody: String!) {
    addReaction(earthquakeId: $earthquakeId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;
