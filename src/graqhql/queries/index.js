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
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @client
  }
`
