import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`

export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!) {
    post(id: $id) {
      id
      title
      body
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      data {
        id
        username
        email
      }
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      name
      company
      username
      email
    }
  }
`
/**
 * @client directory tells Apollo that queried field is
 * local only field. Apollo checks local type policies object,
 * and if match found it will run read function to retrieve its
 * value
 */
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client
  }
`
/**
 * local fields can exist on any type and can be queried
 * along with fields from back end
 */
export const GET_COMMENTS_BY_POST_ID = gql`
  query GetCommentsByPostId($id: ID!) {
    post(id: $id) {
      id
      comments {
        data {
          body
          id
          email
          isSelected @client
        }
      }
    }
  }
`
