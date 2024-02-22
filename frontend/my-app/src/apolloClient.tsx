import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the GraphQL API
const httpLink = createHttpLink({
  uri: 'https://graphql.bitquery.io/',
});

// Middleware to attach the authorization token to requests
const authLink = setContext((_, { headers }) => {
  // Replace 'YOUR_API_KEY_HERE' with your actual API key
  const token = 'BQYM480ZGF203wiJhgsK29HQM0atRU44';
  return {
    headers: {
      ...headers,
      //authorization: token ? `Bearer ${token}` : null,
      'X-API-KEY': token,
    }
  };
});

// Apollo Client instance
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the auth link and the http link
  cache: new InMemoryCache(),
});

export default apolloClient;
// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// // The HTTP link is where you define the URI of your GraphQL server.
// const httpLink = createHttpLink({
//   uri: 'https://graphql.bitquery.io/',
// });

// // The auth link injects the API key into the headers of each request.
// const authLink = setContext((_, { headers }) => {
//   // Replace 'YOUR_API_KEY_HERE' with your actual Bitquery API key.
//   const apiKey = 'BQYM480ZGF203wiJhgsK29HQM0atRU44';
//   return {
//     headers: {
//       ...headers,
//       'X-API-KEY': apiKey, // Ensure this header key is what Bitquery expects for API keys.
//     }
//   };
// });

// // Apollo Client setup includes both the auth link and the HTTP link.
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export default client;
