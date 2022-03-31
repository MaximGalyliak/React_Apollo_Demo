import { ApolloClient, InMemoryCache } from '@apollo/client'
import { currentUserVar, selectedCommentsVar } from './reactive-vars'

/**
 * To customize how the cache interacts with specific types in your schema,
 * you can pass the InMemoryCache constructor an object that maps
 * __typename strings to TypePolicy objects.
 *
 * It looks very similar to a graphql server resolvers for declared types.
 * We pass the InMemoryCache constructor an object that maps
 * __typename strings to TypePolicy objects.
 *
 * To let apollo know not to query local only fields, @client directive is used next to
 * field name in gql string, see src/graphql/queries/index.js
 */

export const cache = new InMemoryCache({
  // Type policy map
  typePolicies: {
    // Field policy map for the Query type
    Query: {
      fields: {
        /**
         * local only fields don't have to be only reactive variables
         * it can be used to retrieve relevant data from local storage, constants etc
         */
        someNewLocalField: {
          read() {
            return 'SOME_VALUE'
          }
        },
        // Field policy for the currentUser field
        currentUser: {
          /**
           * The cache calls read function whenever your client queries for the field.
           * In the query response, the field is populated with the read function's return value, instead of the field's cached value.
           * in this case we just return current value of currentUserVar
           */
          read() {
            return currentUserVar()
          }
        }
      }
    },
    Comment: {
      fields: {
        // Set new local only field isSelected that reads from reactive variable and
        // later is used to run a mutation that removes selected comment.
        isSelected: {
          /**
           *
           * @param {*} _value  - field's currently cached value, if one exists. You can use this to help determine the function's return value.
           * @param {*} readField - Helper function provided by Apollo client for reading other fields within the current object.
           * @returns boolean
           */
          read(_value, { readField }) {
            const commentId = readField('id')
            const isSelected = selectedCommentsVar().find(
              (id) => id === commentId
            )

            return Boolean(isSelected)
          }
        }
      }
    }
  }
})

export const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache,
  connectToDevTools: true
})
