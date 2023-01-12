
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

import { getToken } from './userState'
import customFetch from './customFetch'
import { GRAPHQL_API_URL } from './constants'

const authLink = setContext((_, { headers, ...context }) => {
  const token = getToken()

  return {
    headers: {
      ...headers,
      'Access-Control-Allow-Origin': '*',
      authorization: token || ''
    },
    ...context
  }
})

const uploadLink = createUploadLink({
  uri: GRAPHQL_API_URL,
  credentials: 'same-origin',
  fetch: customFetch
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    uploadLink
  ]),
  cache: new InMemoryCache()
})
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    // errorLink,
    authLink
    // uploadLink
  ]),
  cache: new InMemoryCache()
})

export default client
