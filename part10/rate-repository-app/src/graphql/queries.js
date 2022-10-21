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

export const GET_SINGLE_REPO = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      fullName
      description
      ownerAvatarUrl
      url
      forksCount
      stargazersCount
      ratingAverage
      language
      reviewCount
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
