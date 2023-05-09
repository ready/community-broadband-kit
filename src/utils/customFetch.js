import { setToken, signOut } from './userState'
import {
  API_URL
} from './constants'

// Create customFetch function for handling re-authorization
// This customFetch (or any fetch you pass to the link) gets uri and options as arguments. We'll use those when we actually execute a fetch.
export default function customFetch (uri, inputOptions) {
  // Fetch options
  const options = {
    ...inputOptions,
    credentials: 'include'
  }

  // This reference to the refreshingPromise will let us check later on if we are executing getting the refresh token.
  let refreshingPromise = null

  // Create initial fetch, this is what would normally be executed in the link without the override
  const initialRequest = fetch(uri, options)

  // The apolloHttpLink expects that whatever fetch function is used, it returns a promise.
  // Here we return the initialRequest promise
  return initialRequest.then((response) => {
    return (response.json())
  }).then((json) => {
    // We should now have th JSON from the response of initialRequest
    // We check that we do and look for errors from the GraphQL server
    // If it has the error 'User is not logged in' (that's our implementation of a 401) we execute the next steps in the re-auth flow
    if (json && json.errors && json.errors[0] && json.errors[0].message === 'Must authenticate') {
      if (!refreshingPromise) {
        // Create the address to grab a new token from
        const address = `${API_URL}/refreshToken`

        // Execute the re-authorization request and set the promise returned to refreshingPromise
        refreshingPromise = fetch(address, { ...options, method: 'POST' })
          .then((refresh_token_repsonse) => {
            if (refresh_token_repsonse.ok) {
              return refresh_token_repsonse.json().then((refreshJSON) => {
                // Return the new access token as a result of the promise
                return refreshJSON.accessToken
              })
            } else {
              // If the re-authorization request fails, handle it here
              // You can log user out, or display some sort of session has ended alert

              signOut()
            }
          })
      }
      return refreshingPromise.then((newAccessToken) => {
        // Now that the refreshing promise has been executed, set it to null
        refreshingPromise = null

        // Set token
        setToken(newAccessToken)

        // Set the authorization header on the original options parameter to the new access token we got
        options.headers.authorization = newAccessToken
        // Return the promise from the new fetch (which should now have used an active access token)
        // If the initialRequest had errors, this fetch that is returned below is the final result.
        return fetch(uri, options)
      })
    }
    // If there were no errors in the initialRequest, we need to repackage the promise and return it as the final result.
    const result = {}
    result.ok = true
    result.json = () => new Promise(function (resolve, reject) {
      resolve(json)
    })
    result.text = () => new Promise((resolve, reject) => resolve(JSON.stringify(json)))
    return result
  })
}
