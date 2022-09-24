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
    addEarthquake(
      earthquakeDate: $earthquakeDate
      earthquakeDepth: $earthquakeDepth
      earthquakeMagnitude: $earthquakeMagnitude
      earthquakeLatitude: $earthquakeLatitude
      earthquakeLongitude: $earthquakeLongitude
      earthquakeRegion: $earthquakeRegion
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
  }
`;
export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
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
