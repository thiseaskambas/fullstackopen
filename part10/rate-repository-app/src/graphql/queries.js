import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          language
          description
          forksCount
          stargazersCount
          ownerAvatarUrl
          ratingAverage
          reviewCount
          id
        }
      }
    }
  }
`;

export const GET_LOGGED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;