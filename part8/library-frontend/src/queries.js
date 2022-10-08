import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

//allBooks($genre: String!, $author: String!)

export const ALL_BOOKS = gql`
  query allBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) {
      title
      genres
      published
      author {
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String!]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      value
    }
  }
`;
