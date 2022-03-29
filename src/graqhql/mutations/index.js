import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      username
      email
    }
  }
`

export const DELETE_SELECTED_COMMENT = gql`
  mutation DeleteSelectedComments($id: ID!) {
    deleteComment(id: $id)
  }
`
