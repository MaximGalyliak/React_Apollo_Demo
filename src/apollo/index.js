import { ApolloClient, InMemoryCache } from '@apollo/client'
import { currentUserVar } from './reactive-vars'

export const cache = new InMemoryCache({
  typePolicies: {
    // Type policy map
    Query: {
      fields: {
        // Field policy map for the Query type
        currentUser: {
          // Field policy for the currentUser field
          read() {
            //read function, in this case will return reactive variable value
            return currentUserVar()
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
